DROP VIEW IF EXISTS "stats_most_clicked";
DROP FUNCTION IF EXISTS "stats_clicks";
DROP FUNCTION IF EXISTS "stats_browser";
DROP FUNCTION IF EXISTS "stats_city";
DROP FUNCTION IF EXISTS "stats_country";
DROP FUNCTION IF EXISTS "stats_device";
DROP FUNCTION IF EXISTS "stats_os";
DROP FUNCTION IF EXISTS "stats_referrer";
DROP FUNCTION IF EXISTS "stats_region";

CREATE OR REPLACE VIEW "stats_most_clicked" AS
SELECT
  "key",
  COUNT(*) AS "value"
FROM
  "link_visits"
  WHERE "linkId" in (
    SELECT "id" FROM "links" WHERE "userId" = (select auth.uid()) 
  )
GROUP BY
  "key";

CREATE
OR REPLACE FUNCTION stats_clicks(time_zone_param text, date_trunc_param text, key_param text, created_at_param timestamp with time zone) RETURNS TABLE("key" text, "name" timestamp without time zone, "value" bigint) AS $$ BEGIN RETURN QUERY
SELECT
  "link_visits"."key",
  DATE_TRUNC(date_trunc_param, "link_visits"."createdAt" at time zone time_zone_param) AS "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
WHERE
  "link_visits"."key" = key_param
  AND "link_visits"."createdAt" > created_at_param
GROUP BY
  "link_visits"."key",
  "name"
ORDER BY "name";

END;

$$ LANGUAGE plpgsql;

CREATE
OR REPLACE FUNCTION stats_browser(key_param text, created_at_param timestamp with time zone) RETURNS TABLE("key" text, "name" text, "value" bigint) AS $$ BEGIN RETURN QUERY
SELECT
  "link_visits"."key",
  "link_visits"."browser" as "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
WHERE
  "link_visits"."key" = key_param
  AND "link_visits"."createdAt" > created_at_param
GROUP BY
  "link_visits"."key",
  "name";

END;

$$ LANGUAGE plpgsql;

CREATE
OR REPLACE FUNCTION stats_city(key_param text, created_at_param timestamp with time zone) RETURNS TABLE("key" text, "name" text, "country" text, "value" bigint) AS $$ BEGIN RETURN QUERY
SELECT
  "link_visits"."key",
  "link_visits"."city" as "name",
  "link_visits"."country",
  COUNT(*) AS "value"
FROM
  "link_visits"
WHERE
  "link_visits"."key" = key_param
  AND "link_visits"."createdAt" > created_at_param
GROUP BY
  "link_visits"."key",
  "link_visits"."country",
  "name";

END;

$$ LANGUAGE plpgsql;

CREATE
OR REPLACE FUNCTION stats_country(key_param text, created_at_param timestamp with time zone) RETURNS TABLE("key" text, "name" text, "value" bigint) AS $$ BEGIN RETURN QUERY
SELECT
  "link_visits"."key",
  "link_visits"."country" as "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
WHERE
  "link_visits"."key" = key_param
  AND "link_visits"."createdAt" > created_at_param
GROUP BY
  "link_visits"."key",
  "name";

END;

$$ LANGUAGE plpgsql;

CREATE
OR REPLACE FUNCTION stats_device(key_param text, created_at_param timestamp with time zone) RETURNS TABLE("key" text, "name" text, "value" bigint) AS $$ BEGIN RETURN QUERY
SELECT
  "link_visits"."key",
  "link_visits"."device" as "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
WHERE
  "link_visits"."key" = key_param
  AND "link_visits"."createdAt" > created_at_param
GROUP BY
  "link_visits"."key",
  "name";

END;

$$ LANGUAGE plpgsql;

CREATE
OR REPLACE FUNCTION stats_os(key_param text, created_at_param timestamp with time zone) RETURNS TABLE("key" text, "name" text, "value" bigint) AS $$ BEGIN RETURN QUERY
SELECT
  "link_visits"."key",
  "link_visits"."os" as "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
WHERE
  "link_visits"."key" = key_param
  AND "link_visits"."createdAt" > created_at_param
GROUP BY
  "link_visits"."key",
  "name";

END;

$$ LANGUAGE plpgsql;

CREATE
OR REPLACE FUNCTION stats_referrer(key_param text, created_at_param timestamp with time zone) RETURNS TABLE("key" text, "name" text, "value" bigint) AS $$ BEGIN RETURN QUERY
SELECT
  "link_visits"."key",
  "link_visits"."referrer" as "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
WHERE
  "link_visits"."key" = key_param
  AND "link_visits"."createdAt" > created_at_param
GROUP BY
  "link_visits"."key",
  "name";

END;

$$ LANGUAGE plpgsql;