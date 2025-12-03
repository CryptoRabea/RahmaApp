# ServiceHub - Complete Service Marketplace Platform

A modern, full-stack service marketplace application built with Next.js 15, TypeScript, and Prisma.

## 🌟 Features

- **Service Discovery**: Browse and search services with advanced filtering
- **Event Management**: Create and manage events with registration
- **Social Hub**: User-generated content with likes and comments
- **Booking System**: Multi-step booking flow with payment integration
- **Admin Panel**: Payment verification and content moderation
- **User Authentication**: Role-based access (User/Provider/Admin)
- **Payment System**: EGP currency with screenshot verification
- **Responsive Design**: Mobile-first with Tailwind CSS

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **State Management**: Zustand + TanStack Query
- **Authentication**: NextAuth.js v4

### Backend
- **API**: Next.js API Routes
- **Database**: Prisma ORM with SQLite
- **Authentication**: JWT-based with NextAuth
- **File Upload**: Native Next.js handling
- **Validation**: Zod schema validation

### Database
- **ORM**: Prisma
- **Database**: SQLite (client-side)
- **Models**: Users, Services, Events, Bookings, Payments, Social Posts

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone repository**
   ```bash
   git clone <your-repo-url>
   cd servicehub-web-ready
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
servicehub-web-ready/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/           # Authentication routes
│   │   ├── admin/            # Admin panel
│   │   ├── api/               # API routes
│   │   ├── services/          # Service pages
│   │   ├── events/            # Event pages
│   │   ├── social/            # Social hub
│   │   ├── dashboard/         # User dashboard
│   │   ├── book/             # Booking flow
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/             # Reusable components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── auth/             # Auth components
│   │   ├── layout/           # Layout components
│   │   └── forms/            # Form components
│   ├── lib/                  # Utility libraries
│   │   ├── db.ts             # Database client
│   │   ├── auth.ts           # Authentication utilities
│   │   ├── utils.ts          # Helper functions
│   │   └── validations.ts    # Form validations
│   └── types/                # TypeScript definitions
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
├── public/                   # Static assets
│   ├── images/              # Image uploads
│   └── icons/               # App icons
├── package.json              # Dependencies and scripts
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS config
├── tsconfig.json           # TypeScript config
└── README.md               # This file
```

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# App Configuration
NODE_ENV="development"
```

## 📱 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio   # Open Prisma Studio
npx prisma generate  # Generate Prisma client
npx prisma db push  # Push schema to database
npx prisma migrate  # Run migrations
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy

### Other Platforms
- **Netlify**: Works with minimal configuration
- **Railway**: Full-stack deployment
- **DigitalOcean**: Docker deployment
- **AWS**: Amplify or EC2

## 🎨 Customization

### Styling
- Edit `tailwind.config.ts` for theme changes
- Modify `src/app/globals.css` for global styles
- Update shadcn/ui components in `src/components/ui/`

### Features
- Add new pages in `src/app/`
- Extend API routes in `src/app/api/`
- Update database schema in `prisma/schema.prisma`

## 🔐 Authentication

The app supports three user roles:
- **User**: Can book services and events
- **Provider**: Can create and manage services
- **Admin**: Can verify payments and manage content

## 💳 Payment System

Currently supports manual payment verification:
- Users upload payment screenshots
- Admins verify payments in admin panel
- EGP currency support throughout

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create new service
- `GET /api/services/search` - Search services

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking

### Payments
- `POST /api/payments` - Upload payment proof
- `GET /api/payments` - Get payment history

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open-source and available under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Review existing issues
3. Create a new issue with detailed information

---

**Built with ❤️ using Next.js, TypeScript, and Prisma**