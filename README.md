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

1. Create a **.env** file in the root folder and paste your variables:

```bash
cp -r .env.example .env
```

## How to get Github OAuth Client ID and Client Secret

- [Click here to create new Github OAuth app](https://github.com/settings/applications/new)
- Set the Application name. Example: `Xlug development`
- Set the Homepage URL to `http://localhost:3000`
- Set the Authorization callback URL to `http://localhost:54321/auth/v1/callback`
- Go to "Client secrets" and generate new client secret
- Copy the Client ID and Client Secret, go to `.env` and paste them into `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`

## How to setup local supabase instance

```bash
pnpm db:start

# Started supabase local development setup.

#          API URL: http://localhost:54321
#           DB URL: postgresql://postgres:postgres@localhost:54322/postgres
#       Studio URL: http://localhost:54323
#     Inbucket URL: http://localhost:54324
#       JWT secret: <jwt-secret>
#         anon key: <anon-key>
# service_role key: <service-role-key>
```

## How to link to a supabase project

### Setup supabase project

- [Click here to create a new Supabase Project](https://supabase.com/dashboard/new/_)
- Enter a password or generate one, copy the password and then go to `.env` file and paste it to `SUPABASE_PASSWORD`
- Go to [project general settings](https://supabase.com/dashboard/project/_/settings/general), copy the project reference ID and then go to `.env` file and paste it to `SUPABASE_PROJECT_REF`
- Go to [project api settings](https://supabase.com/dashboard/project/_/settings/api), copy and paste the api url and the anon public key into `.env` file
- Go to [auth providers](https://supabase.com/dashboard/project/_/auth/providers), setup the github provider by inserting the Github Client ID and Client Secret that are into the `.env` file. ([How to get Client ID and Client Secret](#how-to-get-github-oauth-client-id-and-client-secret))

### Setup database

Finally, if you followed all the previous steps your `.env` file should look like this:

```bash
# The supabase api url and anon key
NEXT_PUBLIC_SUPABASE_URL="<URL>"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<ANON-KEY>"

# Supabase project
SUPABASE_PASSWORD="<PASSWORD>"
SUPABASE_PROJECT_REF="<REF-ID>"

# Github OAuth
GITHUB_CLIENT_ID="<CLIENT-ID>"
GITHUB_CLIENT_SECRET="<CLIENT-SECRET>"
```

then run the following command to setup the supabase project database:

```bash
# If not logged in run $ pnpm supabase login
pnpm db:link && pnpm db:push
```

## Start developing

You are all set, now you can run:

```bash
pnpm dev
```

## License

This project is [MIT Licensed](./LICENSE).
