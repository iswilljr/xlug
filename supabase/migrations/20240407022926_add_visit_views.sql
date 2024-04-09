DROP VIEW IF EXISTS "stats_most_clicked";
DROP VIEW IF EXISTS "stats_clicks";
DROP VIEW IF EXISTS "stats_browser";
DROP VIEW IF EXISTS "stats_city";
DROP VIEW IF EXISTS "stats_country";
DROP VIEW IF EXISTS "stats_device";
DROP VIEW IF EXISTS "stats_os";
DROP VIEW IF EXISTS "stats_referrer";
DROP VIEW IF EXISTS "stats_region";

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

CREATE OR REPLACE VIEW "stats_clicks" AS
SELECT
  "key",
  DATE_TRUNC('day', "createdAt") AS "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
  WHERE "linkId" in (
    SELECT "id" FROM "links" WHERE "userId" = (select auth.uid()) 
  )
GROUP BY
  "name",
  "key";


CREATE OR REPLACE VIEW "stats_browser" AS
SELECT
  "key",
  "browser" as "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
  WHERE "linkId" in (
    SELECT "id" FROM "links" WHERE "userId" = (select auth.uid()) 
  )
GROUP BY
  "name",
  "key";

CREATE OR REPLACE VIEW "stats_city" AS
SELECT
  "key",
  "city" as "name",
  "country",
  COUNT(*) AS "value"
FROM
  "link_visits"
  WHERE "linkId" in (
    SELECT "id" FROM "links" WHERE "userId" = (select auth.uid()) 
  )
GROUP BY
  "name",
  "country",
  "key";

CREATE OR REPLACE VIEW "stats_country" AS
SELECT
  "key",
  "country" as "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
  WHERE "linkId" in (
    SELECT "id" FROM "links" WHERE "userId" = (select auth.uid()) 
  )
GROUP BY
  "name",
  "key";

CREATE OR REPLACE VIEW "stats_device" AS
SELECT
  "key",
  "device" as "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
  WHERE "linkId" in (
    SELECT "id" FROM "links" WHERE "userId" = (select auth.uid()) 
  )
GROUP BY
  "name",
  "key";

CREATE OR REPLACE VIEW "stats_os" AS
SELECT
  "key",
  "os" as "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
  WHERE "linkId" in (
    SELECT "id" FROM "links" WHERE "userId" = (select auth.uid()) 
  )
GROUP BY
  "name",
  "key";


CREATE OR REPLACE VIEW "stats_referrer" AS
SELECT
  "key",
  "referrer" as "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
  WHERE "linkId" in (
    SELECT "id" FROM "links" WHERE "userId" = (select auth.uid()) 
  )
GROUP BY
  "name",
  "key";
