## Description

Quiztify is an interactive web application with multiple-choice questions in various categories. Users can test their knowledge in a fun way. Its design is simple and responsive, making it suitable for all devices.

## This App Using Package :

- NextJS 14
- NextAuth
- Typescript
- react-query
- react-hook-form

## Getting Started

Clone this project :

```bash
git clone git@github.com:dika841/dot-intern-fe-web-quiz.git
```

Install Depedencies :

```bash
pnpm install
```

## Setup your Database

Before setting up Prisma, ensure that you have the following installed:

- [Mysql](https://www.postgresql.org/) (or another database supported by Prisma)
- [Prisma CLI](https://www.prisma.io/docs/getting-started) (installed globally)

Setup your .env file :

```bash
DATABASE_URL= "your database url here"
NEXT_PUBLIC_API_URL = http://localhost:3000/api
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
SECRET_KEY =
```

for example DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME?schema=public"

### Migrate the database

run

```bash
pnpx prisma migrate dev
```

### Generate Prisma Client

run

```bash
pnpx prisma generate
```

### Seed the Database

```bash
npx prisma db seed
```

### Start development server :

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
