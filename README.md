# Xlug - Short and Manage your Long URLs

Link shortener tool that allows you to create shorter and more manageable versions of long URLs.

## Stack

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app):

- [**Next.js 13 /app directory** + **Typescript**](https://nextjs.org) - The React Framework for the Web.
- [**Tailwind CSS** + **shadcn/ui components**](https://ui.shadcn.com) - Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
- [**Iconoir icons**](https://iconoir.com) - An open-source library with 1300+ unique SVG icons, designed on a 24x24 pixels grid.
- [**React Hook Form**](https://react-hook-form.com) Performant, flexible and extensible forms with easy-to-use validation.
- [**Sonner**](https://sonner.emilkowal.ski) - An opinionated toast component for React.
- [**SWR**](https://swr.vercel.app) - React Hooks for Data Fetching.
- [**Zustand**](https://zustand-demo.pmnd.rs) - A small, fast and scalable bearbones state-management solution using simplified flux principles.

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Create a **.env.local** file in the root folder and paste your variables:

```bash
cp -r .env.example .env.local
```

## How to setup local supabase

### Init supabase config

```bash
cp -r supabase/config.example.toml supabase/config.toml
```

### Get Github OAuth Client ID and Client Secret

- [Click here to create new Github OAuth app](https://github.com/settings/applications/new)
- Set the Application name. Example: `Xlug development`
- Set the Homepage URL to `http://localhost:3000`
- Set the Authorization callback URL to `http://localhost:54321/auth/v1/callback`
- Go to "Client secrets" and generate new client secret
- Copy the Client ID and Client Secret
- Go to `supabase/config.toml` line `66-67` and paste the Client ID and Client Secret

### Run local development

```bash
pnpm supabase start

# Started supabase local development setup.

#          API URL: http://localhost:54321
#           DB URL: postgresql://postgres:postgres@localhost:54322/postgres
#       Studio URL: http://localhost:54323
#     Inbucket URL: http://localhost:54324
#       JWT secret: <jwt-secret>
#         anon key: <anon-key>
# service_role key: <service-role-key>
```

### Start developing

You are all set, now you can run:

```bash
pnpm dev
```

## License

This project is [MIT Licensed](./LICENSE).
