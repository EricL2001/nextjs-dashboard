'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { signIn } from 'app/auth';
import { AuthError } from 'next-auth';


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }


const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0'}),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
    // const validatedFields = CreateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });


    // clean data.  prepare data for insertion into DB
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    // Insert into database
    try {
        await sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
      } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
          message: 'Database Error: Failed to Create Invoice.',
        };
      }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }


// export async function createInvoice(prevState: State, formData: FormData) {
//   console.log('Starting createInvoice function');
//   try {
//       // Log the form data we receive
//       console.log('Form data received:', {
//           customerId: formData.get('customerId'),
//           amount: formData.get('amount'),
//           status: formData.get('status'),
//       });

//       const validatedFields = CreateInvoice.parse({
//           customerId: formData.get('customerId'),
//           amount: formData.get('amount'),
//           status: formData.get('status'),
//       });

//       console.log('Validated fields:', validatedFields);

//       const amountInCents = validatedFields.amount * 100;
//       const date = new Date().toISOString().split('T')[0];

//       console.log('Attempting database insertion...');

//       await sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${validatedFields.customerId}, ${amountInCents}, ${validatedFields.status}, ${date})
//       `;

//       console.log('Database insertion successful');
//       console.log('Attempting to revalidate and redirect...');

//       revalidatePath('/dashboard/invoices');
//       redirect('/dashboard/invoices');

//   } catch (error) {
//       console.error('Error in createInvoice:', error);
      
//       if (error instanceof z.ZodError) {
//           console.log('Validation error:', error.flatten().fieldErrors);
//           return {
//               message: 'Form validation error.',
//               errors: error.flatten().fieldErrors
//           };
//       }

//       return {
//           message: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
//           errors: {}
//       };
//   }
// }


  export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
   
    try {
        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.'};
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function deleteInvoice(id: string) {
    try {
      await sql`DELETE FROM invoices WHERE id = ${id}`;
      revalidatePath('/dashboard/invoices');
      return { message: 'Deleted Invoice.' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Invoice.' };
    }
  }