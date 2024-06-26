# CapSnap
## CapSnap: Retail Self-checkout System using Computational Intelligence Techniques (261492 Final ProjectCapSnap)
This is the source code of our website application for store selling management, which is a part our CapSnap project.
You can visit our website with example data via https://capsnap.vercel.app/ 
using Username: admin3@gmail.com
      Password: 111111

Majority of Computer Engineering, Faculty of Engineering @ Chiang Mai University 

By Pongsakorn Rattanapan 630610749 & 
   Suparida Silpasith 630610765

   Section: 042

Professor: Sansanee Auephanwiriyakul

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Setting up Supabase
To connect to the Supabase database, you need to set up a .env.local file in the root of your project and provide the Supabase URL and anonymous key. Here's how you can do it:

Create a .env.local file in the root directory of your project.
Add the following environment variables to the .env.local file:

NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>

Replace <your_supabase_url> and <your_supabase_anon_key> with your actual Supabase URL and anonymous key. You can find these credentials in your Supabase project settings.
## If you want to connect to our Supabase database instance, please contact us via capsnap.cpe@gmail.com

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
