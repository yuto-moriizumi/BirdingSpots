-- Correct Yahoo! heatstroke page slugs for spots 878 and 447.
UPDATE "Spot"
SET "heatIndexId" = CASE "id"
  WHEN '878' THEN '3/10/10521'
  WHEN '447' THEN '3/14/14402'
END
WHERE "id" IN ('878', '447');
