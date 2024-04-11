create table "links" (
  "id" uuid not null default uuid_generate_v4 (),
  "key" text not null,
  "createdAt" timestamp with time zone not null default now(),
  "description" text null,
  "destination" text not null,
  "userId" uuid null,
  constraint "links_pkey" primary key ("id"),
  constraint "links_key_key" unique ("key"),
  constraint "links_userId_fkey" foreign key ("userId") references auth.users ("id")
);

alter table "links" enable row level security;

create policy "Enable read access for all users" on "links"
as permissive for select
to public
using (true);

create policy "Enable insert access for all users" on "links"
as permissive for insert
to public
with check (true);

create policy "Enable update for users based on userId" on "links"
as permissive for update
to authenticated
using ((select auth.uid()) = "userId");

create policy "Enable delete for users based on userId" on "links"
as permissive for delete
to authenticated
using ((select auth.uid()) = "userId");
