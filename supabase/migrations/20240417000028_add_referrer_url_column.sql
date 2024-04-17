alter table
  link_visits
add
  column "referrerURL" text not null default 'direct';