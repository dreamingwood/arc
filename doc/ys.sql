create table ST_FL_ALL_YS as

--delete from ST_FL_ALL;

--insert into ST_FL_ALL
SELECT
  'a' sfl,
	substr(t.SMATLCODE, 1, 1) fl,
	m.SMATLCATENAME mc,
	round(sum(t.NPURSUM) / 10000, 0) npursum,
	count(*) djcount,
	count(DISTINCT t.SMATLCODE) wzcount
FROM
	ST_IN_STUFF_ZDALL_TOTAL t,
	RMSTAT_MATLCATEDT m
WHERE
	t.NY LIKE '15%' and t.SUNITECODE = '2ZZ026005I'
AND substr(t.SMATLCODE, 1, 1) = m.SMATLCATECODE
GROUP BY
	substr(t.SMATLCODE, 1, 1)
ORDER BY
	fl,
	m.SMATLCATECODE;



insert into ST_FL_ALL_YS
SELECT
  substr(t.SMATLCODE, 1, 1) sfl,
	substr(t.SMATLCODE, 1, 2) fl,
	m.SMATLCATENAME mc,
	round(sum(t.NPURSUM) / 10000, 0) npursum,
	count(*) djcount,
	count(DISTINCT t.SMATLCODE) wzcount
FROM
	ST_IN_STUFF_ZDALL_TOTAL t,
	RMSTAT_MATLCATEDT m
WHERE
	t.NY LIKE '15%' and t.SUNITECODE = '2ZZ026005I'
AND substr(t.SMATLCODE, 1, 2) = m.SMATLCATECODE
GROUP BY
	substr(t.SMATLCODE, 1, 2)
ORDER BY
	fl,
	m.SMATLCATECODE;


insert into ST_FL_ALL_YS
SELECT
  substr(t.SMATLCODE, 1, 2) sfl,
	substr(t.SMATLCODE, 1, 3) fl,
	m.SMATLCATENAME mc,
	round(sum(t.NPURSUM) / 10000, 0) npursum,
	count(*) djcount,
	count(DISTINCT t.SMATLCODE) wzcount
FROM
	ST_IN_STUFF_ZDALL_TOTAL t,
	RMSTAT_MATLCATEDT m
WHERE
	t.NY LIKE '15%' and t.SUNITECODE = '2ZZ026005I'
AND substr(t.SMATLCODE, 1, 3) = m.SMATLCATECODE
GROUP BY
	substr(t.SMATLCODE, 1, 3)
ORDER BY
	fl,
	m.SMATLCATECODE;


insert into ST_FL_ALL_YS
SELECT
  substr(t.SMATLCODE, 1, 3) sfl,
	substr(t.SMATLCODE, 1, 4) fl,
	m.SMATLCATENAME mc,
	round(sum(t.NPURSUM) / 10000, 0) npursum,
	count(*) djcount,
	count(DISTINCT t.SMATLCODE) wzcount
FROM
	ST_IN_STUFF_ZDALL_TOTAL t,
	RMSTAT_MATLCATEDT m
WHERE
	t.NY LIKE '15%' and t.SUNITECODE = '2ZZ026005I'
AND substr(t.SMATLCODE, 1, 4) = m.SMATLCATECODE
GROUP BY
	substr(t.SMATLCODE, 1, 4)
ORDER BY
	fl,
	m.SMATLCATECODE;


insert into ST_FL_ALL_YS
SELECT
  substr(t.SMATLCODE, 1, 4) sfl,
	substr(t.SMATLCODE, 1, 5) fl,
	m.SMATLCATENAME mc,
	round(sum(t.NPURSUM) / 10000, 0) npursum,
	count(*) djcount,
	count(DISTINCT t.SMATLCODE) wzcount
FROM
	ST_IN_STUFF_ZDALL_TOTAL t,
	RMSTAT_MATLCATEDT m
WHERE
	t.NY LIKE '15%' and t.SUNITECODE = '2ZZ026005I'
AND substr(t.SMATLCODE, 1, 5) = m.SMATLCATECODE
GROUP BY
	substr(t.SMATLCODE, 1, 5)
ORDER BY
	fl,
	m.SMATLCATECODE;


