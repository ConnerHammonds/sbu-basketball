## Authentication & Persistence Guide

This project currently uses NextAuth with a Credentials provider backed by environment variables for a single admin account. That is convenient for local development but not suitable for production. This document explains how to persist admin (and other) users to a real database and how to generate bcrypt password hashes locally.

Goals of persistence

- Store user accounts in a database (so you can add/remove admins without changing env files).
- Persist sessions (NextAuth adapters manage session storage automatically).
- Allow multiple users and roles (admin, staff, etc.).
- Securely hash passwords with bcrypt (never store plaintext passwords).

Recommended approach (development → production)

1) Use Prisma + SQLite (for local development) or Postgres/MySQL (production).
   - Prisma is developer-friendly and integrates with NextAuth via an official adapter.
2) Add a `User` model and generate Prisma client + migrations.
3) Configure NextAuth to use the Prisma adapter so user/session/account data is persisted.
4) Seed an initial admin user (use bcrypt to hash the password before storing).

High-level steps (Prisma + NextAuth)

1. Install packages

```powershell
node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install prisma @prisma/client @next-auth/prisma-adapter
npx prisma init
```

2. Configure `prisma/schema.prisma` (example SQLite datasource)

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String   @id @default(cuid())
  name          String?
  email         String   @unique
  emailVerified DateTime?
  password      String   // store bcrypt hash here
  role          String   @default("user")
  accounts      Account[]
  sessions      Session[]
}

// Include the rest of the default NextAuth models: Account, Session, VerificationToken
```

3. Run migration and generate client

```powershell
npx prisma migrate dev --name init
npx prisma generate
```

4. Wire NextAuth to use the Prisma adapter

- Install adapter: `npm i @next-auth/prisma-adapter`
- Update `app/api/auth/[...nextauth]/route.ts`:
  - `import { PrismaAdapter } from "@next-auth/prisma-adapter"`
  - `import { prisma } from "../../lib/prisma"` (or wherever your Prisma client is)
  - Add `adapter: PrismaAdapter(prisma)` to `authOptions`.

5. Seed an admin user

- Use a small script to hash a password and create a user using Prisma client. Example `prisma/seed.ts`:

```ts
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'password', 10);
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' },
    update: { password: hash, role: 'admin' },
    create: { email: process.env.ADMIN_EMAIL || 'admin@example.com', password: hash, role: 'admin', name: 'Admin' }
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
```

Run `node prisma/seed.js` (after building/transpiling or use `ts-node`) to create the admin user.

6. Remove plaintext env fallback

- Once users are in DB, remove reliance on `ADMIN_PASSWORD` and `ADMIN_PASSWORD_HASH` env vars. Use the DB + bcrypt verification in NextAuth `authorize`.

Security notes

- Always use `NEXTAUTH_SECRET` and set `NEXTAUTH_URL` in production.
- Use HTTPS in production and set cookie/security options appropriately.
- Prefer managed databases for production (AWS RDS, Neon, etc.).

Generating bcrypt hashes locally

You can quickly generate a bcrypt hash using Node + `bcryptjs` (we have it installed in this project). Run this in PowerShell from the repo root:

```powershell
node -e "console.log(require('bcryptjs').hashSync(process.env.PW || 'password', 10))"

# Example (inline password):
node -e "console.log(require('bcryptjs').hashSync('your-password-here', 10))"
```

Copy the printed value into your `.env.local` as `ADMIN_PASSWORD_HASH=` or use it in a seed script. Example `.env.local` entries:

```
NEXTAUTH_SECRET=replace_with_a_long_random_string
DATABASE_URL=file:./dev.db
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=$2a$10$...
```

If you want, I can scaffold the Prisma integration and a seed script and remove the plaintext fallback. Tell me which database you prefer for development (SQLite is easiest).
