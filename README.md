# Next.js Dashboard

A modern financial dashboard built with Next.js 15, featuring a complete invoice management system with authentication and responsive design.

## 🚀 Features

- **📊 Dashboard Overview**: Real-time financial metrics and revenue charts
- **🔐 Authentication**: Secure login system with NextAuth.js
- **📋 Invoice Management**: Full CRUD operations for invoices
- **👥 Customer Management**: Customer profiles and data management
- **🔍 Search & Pagination**: Advanced filtering and navigation
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **⚡ Performance**: Optimized with Next.js App Router and Server Components
- **🎨 Modern UI**: Clean interface with Heroicons and custom components

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Vercel Postgres)
- **Authentication**: NextAuth.js 5.0
- **Icons**: Heroicons
- **Package Manager**: pnpm

## 📁 Project Structure

```
nextjs-dashboard/
├── app/                    # App Router directory
│   ├── dashboard/         # Protected dashboard pages
│   │   ├── (overview)/    # Dashboard overview
│   │   ├── customers/     # Customer management
│   │   └── invoices/      # Invoice management
│   ├── lib/               # Utility functions and data
│   ├── ui/                # Reusable UI components
│   ├── login/             # Authentication pages
│   └── seed/              # Database seeding
├── public/                # Static assets
└── ...config files
```

## 📖 Usage

### Authentication
- Navigate to `/login` to access the authentication page
- Use the demo credentials or create new user accounts
- Protected routes automatically redirect unauthenticated users

### Dashboard Features
- **Overview**: View revenue charts, recent invoices, and key metrics
- **Invoices**: Create, read, update, and delete invoices
- **Customers**: Manage customer information and profiles
- **Search**: Real-time search functionality across invoices and customers

## 🏗️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server

## 🎨 UI Components

The project includes a comprehensive set of reusable UI components:

- **Forms**: Invoice creation/editing forms with validation
- **Tables**: Responsive data tables with pagination
- **Navigation**: Dashboard navigation with active states
- **Cards**: Metric display cards and summaries
- **Search**: Debounced search functionality
- **Loading States**: Skeleton loaders and loading indicators

## 🔒 Security Features

- Password hashing with bcrypt
- Protected routes with middleware
- SQL injection prevention with parameterized queries
- Form validation with Zod schemas
- CSRF protection through NextAuth.js

## 📄 License

This project is part of the Next.js learning course and is available for educational purposes.

## 🙏 Acknowledgments

- Built following the [Next.js Learn Course](https://nextjs.org/learn)
- UI inspiration from modern dashboard designs
- Icons provided by [Heroicons](https://heroicons.com/)