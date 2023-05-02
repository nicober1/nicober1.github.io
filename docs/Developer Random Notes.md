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

```csharp
 public static string GetHtmlTableFromDataTable(DataTable dt)
        {
            var sb = new StringBuilder();
            sb.Append("<div style=\"overflow-x:auto;\">");
            //Table start.
            sb.Append(@"<table class='GeneratedTable'>");
            //Adding HeaderRow.
            sb.Append("<tr>");
            foreach (DataColumn column in dt.Columns)
            {
                sb.Append("<th>" + column.ColumnName + "</th>");
            }
            sb.Append("</tr>");
            //Adding DataRow.
            foreach (DataRow row in dt.Rows)
            {
                sb.Append("<tr>");
                foreach (DataColumn column in dt.Columns)
                {
                    sb.Append("<td>" + row[column.ColumnName] + "</td>");
                }
                sb.Append("</tr>");
            }
            //Table end.
            sb.Append("</table>");
            sb.Append("</div>");

            return sb.ToString();
        }

        ///////////////////////////////////

        [AttributeUsage(AttributeTargets.All)]
public class ScopedRegistrationAttribute : Attribute
{
}

[AttributeUsage(AttributeTargets.All)]
public class ScopedPriorityRegistrationAttribute : Attribute
{
}

[AttributeUsage(AttributeTargets.All)]
public class SingletonRegistrationAttribute : Attribute
{
}

[AttributeUsage(AttributeTargets.All)]
public class TransientRegistrationAttribute : Attribute
{
}

[AttributeUsage(AttributeTargets.All)]
public class TransientPriorityRegistrationAttribute : Attribute
{
}

public static class RegisterServicesUsingAttributeExtensions
{
    public static void RegisterServicesUsingAttribute(this IServiceCollection services)
    {
        // Define types that need matching
        var scopedRegistration = typeof(ScopedRegistrationAttribute);
        var scopedPriorityRegistration = typeof(ScopedPriorityRegistrationAttribute);
        var singletonRegistration = typeof(SingletonRegistrationAttribute);
        var transientRegistration = typeof(TransientRegistrationAttribute);
        var transientPriorityRegistration = typeof(TransientPriorityRegistrationAttribute);
        var types = AppDomain.CurrentDomain.GetAssemblies()
            .SelectMany(s => s.GetTypes())
            .Where(p => (p.IsDefined(scopedRegistration, true) || p.IsDefined(transientRegistration, true) ||
                         p.IsDefined(singletonRegistration, true) || p.IsDefined(scopedPriorityRegistration, true) ||
                         p.IsDefined(transientPriorityRegistration, true)) && !p.IsInterface)
            .Select(s => new { Service = s.GetInterface($"I{s.Name}"), Implementation = s })
            .Where(x => x.Service != null);
        var typesList = types.ToList();
        var scopedPriorityTypes = typesList
            .Where(type => type.Implementation.IsDefined(scopedPriorityRegistration, false))
            .ToList();
        foreach (var type in scopedPriorityTypes)
        {
            services.AddScoped(type.Service ?? throw new InvalidOperationException(), type.Implementation);
        }

        var transientPriorityTypes = typesList
            .Where(type => type.Implementation.IsDefined(transientPriorityRegistration, false))
            .ToList();
        foreach (var type in transientPriorityTypes)
        {
            services.AddTransient(type.Service ?? throw new InvalidOperationException(), type.Implementation);
        }

        foreach (var type in typesList)
        {
            if (type.Implementation.IsDefined(scopedRegistration, false))
            {
                services.AddScoped(type.Service ?? throw new InvalidOperationException(), type.Implementation);
            }

            if (type.Implementation.IsDefined(transientRegistration, false))
            {
                services.AddTransient(type.Service ?? throw new InvalidOperationException(), type.Implementation);
            }

            if (type.Implementation.IsDefined(singletonRegistration, false))
            {
                services.AddSingleton(type.Service ?? throw new InvalidOperationException(), type.Implementation);
            }
        }
    }
}

///////////////

public class BaseQueryDto
{
    public int? PageSize { get; set; }
    public bool First { get; set; }

    public string? Before { get; set; }

    public string? After { get; set; }

    public bool Last { get; set; }
    public int? Page { get; set; }

    public string? Search { get; set; }
}

 [HttpGet]
    [Route("first")]
    public async Task<ActionResult<KeysetPaginationResult<IdNameDto>>> GetFunds([FromQuery] BaseQueryDto baseQueryDto)
    {
        var list = await _cqQueryService.GetFundsAsync(baseQueryDto);

        return Ok(list);
    }

    public async Task<KeysetPaginationResult<IdNameDto>> GetFundsAsync(BaseQueryDto baseQueryDto)
    {
        return await _cqRepositoryManager.cqQuery.GetFundsAsync(baseQueryDto);
    }

  using LinqKit;


public class cqQueryRepository : RepositoryBase<cqContext, pgp>, IcqQueryRepository
{
    private readonly IPaginationService _paginationService;
    private readonly cqContext _cqContext;
    private static readonly int CurrentDateAsInt = int.Parse(DateTime.Now.ToString("yyyyMMdd"));

    public cqQueryRepository(cqContext cqContext, IPaginationService paginationService) : base(cqContext)
    {
        _cqContext = cqContext;
        _paginationService = paginationService;
    }

    public async Task<KeysetPaginationResult<IdNameDto>> GetigosAsync(BaseQueryDto baseQueryDto)
    {
        var query = from o in _cqContext.qgos
                    join oi in _cqContext.qgoidps on o.qgoKey equals oi.qgoKey into g1
                    from ooi in g1.AsQueryable()
                        .Where(x => x.qgoidpTypeCode == qgoidpType.idp.ToString()).DefaultIfEmpty()
                    select new { Id = ooi.qgoidpValue ?? o.qgoId, Name = o.qgoName };
        if (!string.IsNullOrWhiteSpace(baseQueryDto.Search))
        {
            query = query.Where(e => (e.Id + e.Name).Trim().ToLower().Contains(baseQueryDto.Search.Trim().ToLower()));
        }

        return await _paginationService.KeysetPaginateAsync(query.AsNoTracking(), b => b.Ascending(x => x.Id),
            async id => await query.AsNoTracking().FirstAsync(x => x.Id == id),
            q => q.Select(x => new IdNameDto { Id = x.Id, Name = x.Name }));
    }

    public async Task<KeysetPaginationResult<IdNameDto>> GetFundsAsync(BaseQueryDto baseQueryDto)
    {
        var predicate = PredicateBuilder.New<pgpidp>();
        predicate = predicate.And(p => p.ValidFromDateKey <= CurrentDateAsInt);
        predicate = predicate.And(p => p.ValidToDateKey >= CurrentDateAsInt);
        predicate = predicate.And(p => p.pgpidpType == pgpidpTypeEnum.idp_ID.ToString());
        var query = from p in _cqContext.pgps.AsExpandable()
                    join pf in _cqContext.pgpFunds.AsExpandable() on p.pgpKey equals pf.pgpKey into g1
                    from ppf in g1
                    join pi in _cqContext.pgpidps.AsExpandable() on ppf.pgpKey equals pi.pgpKey into
                        g2
                    from ppfpi in g2.AsQueryable().Where(predicate).DefaultIfEmpty()
                    where p.InceptionDateKey <= CurrentDateAsInt && p.TerminationDateKey >= CurrentDateAsInt &&
                          p.pgpName != string.Empty
                    select new { Id = ppfpi.pgpidpValue ?? p.pgpID, Name = p.pgpName };
        if (!string.IsNullOrWhiteSpace(baseQueryDto.Search))
        {
            query = query.Where(e => (e.Id + e.Name).Trim().ToLower().Contains(baseQueryDto.Search.Trim().ToLower()));
        }

        return await _paginationService.KeysetPaginateAsync(query.AsNoTracking(), b => b.Ascending(x => x.Id),
            async id => await query.AsNoTracking().FirstAsync(x => x.Id == id),
            q => q.Select(x => new IdNameDto { Id = x.Id, Name = x.Name }));
    }

    public async Task<KeysetPaginationResult<IdNameDto>> GetbjpAsync(BaseQueryDto baseQueryDto)
    {
        var predicate = PredicateBuilder.New<pgpidp>();
        predicate = predicate.And(p => p.ValidFromDateKey <= CurrentDateAsInt);
        predicate = predicate.And(p => p.ValidToDateKey >= CurrentDateAsInt);
        predicate = predicate.And(p => p.pgpidpType == pgpidpTypeEnum.idp_ID.ToString());
        var query = from p in _cqContext.pgps
                    join b in _cqContext.bjp on p.pgpKey equals b.pgpKey into g1
                    from pb in g1
                    join pi in _cqContext.pgpidps on pb.pgpKey equals pi.pgpKey into g2
                    from pbpi in g2.AsQueryable().Where(predicate).DefaultIfEmpty()
                    where p.InceptionDateKey <= CurrentDateAsInt && p.TerminationDateKey >= CurrentDateAsInt &&
                          p.pgpName != string.Empty
                    select new { Id = pbpi.pgpidpValue ?? p.pgpID, Name = p.pgpName };
        if (!string.IsNullOrWhiteSpace(baseQueryDto.Search))
        {
            query = query.Where(e => (e.Id + e.Name).Trim().ToLower().Contains(baseQueryDto.Search.Trim().ToLower()));
        }

        return await _paginationService.KeysetPaginateAsync(query.AsNoTracking(), b => b.Ascending(x => x.Id),
            async id => await query.AsNoTracking().FirstAsync(x => x.Id == id),
            q => q.Select(x => new IdNameDto { Id = x.Id, Name = x.Name }));
    }
}
```

```sql
SELECT * FROM sys.database_principals
```
