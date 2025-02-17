# StudentDevForum - Inspired by Dev.to

A full-stack web application I built using modern Next.js stack to learn type-safe programming and development practices. This project takes inspiration from Dev.to's community features while implementing them with current web technologies.

## What I Built

My forum includes core features I wanted to learn:
- Type safety across the entire application to catch errors early
- Server rendering combined with live updates for better user experience
- User authentication to handle accounts and permissions
- Automatic API routes to simplify backend development
- Database management using schemas
- Form handling with built-in validation

## Technologies I Used

Through this project, I learned these modern web development tools:

For the Frontend:
- Next.js - Learned server-side rendering and routing
- TailwindCSS - Practiced modern CSS approaches
- React Query - Managed server state
- React Hook Form - Built type-safe forms

For the Backend:
- TypeScript - Implemented type safety throughout
- Prisma - Worked with a type-safe database ORM
- NextAuth.js - Added authentication
- tRPC - Created type-safe APIs

Development Tools I Learned:
- ESLint - Improved code quality
- Prettier - Maintained consistent formatting
- Zod - Added runtime type checks
- TypeScript - Practiced static typing

## Project Setup

1. Get the code:
```bash
git clone https://github.com/mahou-anisphia/student-devforum.git
```

2. Install what you need:
```bash
pnpm install
```

3. Set up environment:
```bash
cp .env.example .env
```

4. Set up database:
```bash
pnpm prisma db push
```

5. Start development:
```bash
pnpm dev
```

## Environment Setup

You'll need these variables:
```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-auth-secret"
NEXTAUTH_URL="http://localhost:4000"
```

## How to Contribute

If you'd like to help me improve this learning project:
1. Fork it
2. Create a feature branch (`git checkout -b feature/your-idea`)
3. Make your changes (`git commit -m 'Added this feature'`)
4. Push your changes (`git push origin feature/your-idea`)
5. Open a Pull Request

## License

This learning project uses the MIT License - see [LICENSE](LICENSE) for details.

## Thanks To

I learned a lot from:
- Dev.to for community features inspiration
- Web development communities and tutorials
- TypeScript documentation and guides
- Full-stack development resources
- Database design materials
- Type-safety learning resources

---

Built as a learning project to understand modern web development
