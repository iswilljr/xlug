# Url Shortener

This is a free tool to shorten URLs that uses Supabase.

## Introduction

A simple free tool to shorten your long urls. It saves your shortened urls on localStorage, if you sign up it will saves them on your account, so you will be able to view them wherever you want.

## Installation

```bash
git clone https://github.com/iswilljr/url-shortener.git
cd url-shortener
yarn
```

### Env Variables

`SUPABASE_URL` and `SUPABASE_ANON_KEY` are required to shorten, display and redirect urls.

You can get the supabase url and supabase anon key on <https://app.supabase.com>

run:

```bash
mv .env.template .env.local
```

then copy and paste the supabase url and anon key into `.env.local`.

## License

This project is [MIT licensed](./LICENSE)
