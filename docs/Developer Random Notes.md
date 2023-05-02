---
keywords: [Notes]
---

Sql script to Add Managed Identity of Application to Database

```sql
DECLARE @dbName VARCHAR(100) = (SELECT DB_NAME())
DECLARE @environment CHAR(4) =	CASE
									WHEN (@dbName) LIKE '%dev%' THEN 'dev'
									END;

DECLARE @AppName VARCHAR(100) = 'func-' + @environment + '-latex-01';
IF EXISTS (SELECT * FROM sys.sysusers WHERE [name] = @AppName)
BEGIN
	EXECUTE ('DROP USER ['+ @AppName + ']')
END
EXECUTE ('CREATE USER ['+ @AppName + '] FROM EXTERNAL PROVIDER;')
EXECUTE ('ALTER ROLE db_datareader ADD MEMBER ['+ @AppName + '];')
EXECUTE ('ALTER ROLE db_datawriter ADD MEMBER ['+ @AppName + '];')
EXECUTE ('ALTER ROLE db_owner ADD MEMBER ['+ @AppName + '];')
GO
```
