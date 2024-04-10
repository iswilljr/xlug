CREATE OR REPLACE VIEW "public_stats_most_clicked" AS
SELECT
  "key",
  COUNT(*) AS "value"
FROM
  "link_visits"
  WHERE "key" = 'github'
GROUP BY
  "key";
  
CREATE OR REPLACE VIEW "public_stats_clicks" AS
SELECT
  "key",
  DATE_TRUNC('day', "createdAt") AS "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
  WHERE "key" = 'github'
GROUP BY
  "name",
  "key";


CREATE OR REPLACE VIEW "public_stats_browser" AS
SELECT
  "key",
  "browser" as "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
  WHERE "key" = 'github'
GROUP BY
  "name",
  "key";

CREATE OR REPLACE VIEW "public_stats_city" AS
SELECT
  "key",
  "city" as "name",
  "country",
  COUNT(*) AS "value"
FROM
  "link_visits"
    WHERE "key" = 'github'
GROUP BY
  "name",
  "country",
  "key";

CREATE OR REPLACE VIEW "public_stats_country" AS
SELECT
  "key",
  "country" as "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
    WHERE "key" = 'github'
GROUP BY
  "name",
  "key";

CREATE OR REPLACE VIEW "public_stats_device" AS
SELECT
  "key",
  "device" as "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
    WHERE "key" = 'github'
GROUP BY
  "name",
  "key";

CREATE OR REPLACE VIEW "public_stats_os" AS
SELECT
  "key",
  "os" as "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
    WHERE "key" = 'github'
GROUP BY
  "name",
  "key";


CREATE OR REPLACE VIEW "public_stats_referrer" AS
SELECT
  "key",
  "referrer" as "name",
  COUNT(*) AS "value"
FROM
  "link_visits"
    WHERE "key" = 'github'
GROUP BY
  "name",
  "key";
