# Xlug - URL Shortener

## Technologies used

- ✅ **Frameworks**: [Nextjs 13](https://nextjs.org)
- ✅ **Database and Auth**: [Supabase](https://supabase.com)
- ✅ **Styling**: [Mantine](https://mantine.dev).
- ✅ **Typescript Schema Validation**: [Zod](https://github.com/colinhacks/zod).

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Create a **.env.local** file in the root folder and paste your variables:

```bash
cp -r .env.template .env.local
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

Copy the API URL and ANON KEY and paste them to `.env.local` file

### Start developing

Now you can run:

```bash
pnpm dev
```

## License

This project is [MIT Licensed](./LICENSE).
