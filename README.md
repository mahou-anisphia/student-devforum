# DevTo Clone

A modern, type-safe web application that brings together the best of full-stack development.

## 🌟 Features

- End-to-end type safety from database to frontend
- Server-side rendering with real-time client updates
- Secure authentication and authorization
- Automatic API route generation
- Schema-driven database management
- Built-in form validation and error handling

## 🛠 Tech Stack

Our carefully selected technology stack ensures maximum developer productivity while maintaining enterprise-grade reliability:

### Frontend

- Next.js for server-side rendering and optimal page routing
- TailwindCSS for utility-first styling
- React Query for seamless server state management
- React Hook Form for type-safe form handling

### Backend

- TypeScript for end-to-end type safety
- Prisma as our type-safe ORM
- NextAuth.js for secure authentication
- tRPC for type-safe API development

### Development Tools

- ESLint for code quality
- Prettier for consistent formatting
- Zod for runtime type validation
- TypeScript for static type checking

## 🚀 Getting Started

1. Clone the repository

```bash
git clone https://github.com/mahou-anisphia/devto-clone.git
```

2. Install dependencies

```bash
pnpm install
```

3. Set up your environment variables

```bash
cp .env.example .env
```

4. Initialize the database

```bash
pnpm prisma db push
```

5. Start the development server

```bash
pnpm dev
```

## 🔒 Environment Variables

Required environment variables:

```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-auth-secret"
NEXTAUTH_URL="http://localhost:4000"
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- The amazing modern web development community
- Type-safety evangelists
- Full-stack TypeScript pioneers
- Schema-first database designers
- End-to-end type generation enthusiasts

---

Built with ❤️ using modern web technologies
