DROP VIEW IF EXISTS "public_stats_most_clicked";

CREATE OR REPLACE VIEW "public_stats_most_clicked" AS
SELECT
  "key",
  COUNT(*) AS "value"
FROM
  "link_visits"
  WHERE "key" = 'github'
GROUP BY
  "key";
