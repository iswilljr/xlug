create table
  xlugs (
    id uuid not null default uuid_generate_v4 (),
    created_at timestamp with time zone not null default now(),
    xlug character varying not null,
    destination character varying not null,
    description text null,
    user_id uuid null,
    constraint xlugs_pkey primary key (id),
    constraint xlugs_xlug_key unique (xlug),
    constraint xlugs_user_id_fkey foreign key (user_id) references auth.users (id)
  ) tablespace pg_default;

alter table xlugs enable row level security;

create policy "Enable read access for all users" on xlugs
as permissive for select
to public
using (true);

create policy "Enable insert access for all users" on xlugs
as permissive for insert
to public
with check (true);

create policy "Enable update for users based on user_id" on xlugs
as permissive for update
to authenticated
using (auth.uid() = user_id);

create policy "Enable delete for users based on user_id" on xlugs
as permissive for delete
to authenticated
using (auth.uid() = user_id);
