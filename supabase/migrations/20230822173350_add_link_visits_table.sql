create table "link_visits" (
  "key" text not null,
  "linkId" uuid not null,
  "id" uuid not null default uuid_generate_v4 (),
  "createdAt" timestamp with time zone not null default now(),
  "browser" text not null default 'unknown'::text,
  "city" text not null default 'unknown'::text,
  "country" text not null default 'unknown'::text,
  "device" text not null default 'desktop'::text,
  "os" text not null default 'unknown'::text,
  "referrer" text not null default 'direct'::text,
  "region" text not null default 'unknown'::text,
  constraint "link_visits_pkey" primary key ("id"),
  constraint "link_visits_linkId_fkey" foreign key ("linkId") references "public"."links" ("id")
);

alter table "link_visits" enable row level security;

create policy "Enable read access for all users" on "link_visits"
as permissive for select
to public
using (true);

create policy "Enable insert access for all users" on "link_visits"
as permissive for insert
to public
with check (true);

create policy "Enable update for users based on links.userId" on "link_visits"
as permissive for update
to authenticated
using ((select auth.uid()) in (select "links"."userId" from "links" where ("links"."id" = "linkId")));

create policy "Enable delete for users based on links.userId" on "link_visits"
as permissive for delete
to authenticated
using ((select auth.uid()) in (select "links"."userId" from "links" where ("links"."id" = "linkId")));
