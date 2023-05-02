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

 public class HttpLoggingMiddleware : IMiddleware
    {
        private readonly IuserService _userService;

        public HttpLoggingMiddleware(IuserService userService)
        {
            _userService = userService;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (!await ShouldSkipLogging(context))
            {
                await _userService.CreateuserEvent(JsonConvert.SerializeObject(new
                {
                    user = context.User.Identity?.Name,

                }));
            }

[]            await next(context);

            if (!await ShouldSkipLogging(context))
            {
                await _userService.CreateuserEvent(JsonConvert.SerializeObject(new
                {
                    user = context.User.Identity?.Name,

                }));
            }
        }

 private static Task<bool> ShouldSkipLogging(HttpContext context)
        {
            return Task.FromResult(context.GetEndpoint()?.Metadata.GetMetadata<IAllowAnonymous>() != null
                                   || context.Request.Headers.ContainsKey("X-Bypass-Logging")
                                   || context.Request.Headers.ContainsKey("x-bypass-logging")
                                   || context.Request.Query.ContainsKey("skiplogging")
                                   || context.Request.Query.ContainsKey("SkipLogging")
                                   || context.Request.Path.StartsWithSegments("/swagger", StringComparison.OrdinalIgnoreCase)
                                   || context.Request.Path.StartsWithSegments("/log", StringComparison.OrdinalIgnoreCase)
                                   || context.Request.Path.StartsWithSegments("/signin-oidc", StringComparison.OrdinalIgnoreCase)
                                   || context.Request.Path.StartsWithSegments("/api/backgroundjobs", StringComparison.OrdinalIgnoreCase)
                                   || context.Request.Path.StartsWithSegments("/hangfire", StringComparison.OrdinalIgnoreCase)
            );
        }

        /////////////////////////



public class AzureSqlTokenDbConnectionInterceptor : DbConnectionInterceptor
{
    private readonly IAzureSqlTokenProvider _tokenProvider;

    public AzureSqlTokenDbConnectionInterceptor(IAzureSqlTokenProvider tokenProvider)
    {
        _tokenProvider = tokenProvider;
    }

    public override InterceptionResult ConnectionOpening(DbConnection connection, ConnectionEventData eventData,
        InterceptionResult result)
    {
        var sqlConnection = (SqlConnection)connection;
        if (!ConnectionNeedsAccessToken(sqlConnection)) return base.ConnectionOpening(connection, eventData, result);
        var (token, _) = _tokenProvider.GetAccessToken();
        sqlConnection.AccessToken = token;
        return base.ConnectionOpening(connection, eventData, result);
    }

    public override async ValueTask<InterceptionResult> ConnectionOpeningAsync(DbConnection connection,
        ConnectionEventData eventData, InterceptionResult result, CancellationToken cancellationToken = default)
    {
        var sqlConnection = (SqlConnection)connection;
        if (!ConnectionNeedsAccessToken(sqlConnection))
            return await base.ConnectionOpeningAsync(connection, eventData, result, cancellationToken);
        var (token, _) = await _tokenProvider.GetAccessTokenAsync(cancellationToken);
        sqlConnection.AccessToken = token;
        return await base.ConnectionOpeningAsync(connection, eventData, result, cancellationToken);
    }

    private static bool ConnectionNeedsAccessToken(IDbConnection connection)
    {
        var connectionStringBuilder = new SqlConnectionStringBuilder(connection.ConnectionString);
        return
            connectionStringBuilder.DataSource.Contains("database.windows.net", StringComparison.OrdinalIgnoreCase) &&
            !connectionStringBuilder.DataSource.Contains("SqlExpress", StringComparison.OrdinalIgnoreCase) &&
            string.IsNullOrEmpty(connectionStringBuilder.UserID);
    }
}

// Simple interface that represents a token acquisition abstraction
public interface IAzureSqlTokenProvider
{
    Task<(string AccessToken, DateTimeOffset ExpiresOn)> GetAccessTokenAsync(
        CancellationToken cancellationToken = default);

    (string AccessToken, DateTimeOffset ExpiresOn) GetAccessToken();
}

// Core implementation that performs token acquisition with Azure Identity
public class AzureSqlTokenProvider : IAzureSqlTokenProvider
{
    private static readonly string[] _azureSqlScopes = new[] { "https://database.windows.net//.default" };

    public async Task<(string AccessToken, DateTimeOffset ExpiresOn)> GetAccessTokenAsync(
        CancellationToken cancellationToken = default)
    {
        var tokenRequestContext = new TokenRequestContext(_azureSqlScopes);
        var token = await new ChainedTokenCredential(new ManagedIdentityCredential(), new VisualStudioCredential(),
            new VisualStudioCodeCredential()).GetTokenAsync(tokenRequestContext, cancellationToken);
        return (token.Token, token.ExpiresOn);
    }

    public (string AccessToken, DateTimeOffset ExpiresOn) GetAccessToken()
    {
        var tokenRequestContext = new TokenRequestContext(_azureSqlScopes);
        var token = new ChainedTokenCredential(new ManagedIdentityCredential(), new VisualStudioCredential(),
            new VisualStudioCodeCredential()).GetToken(tokenRequestContext);
        return (token.Token, token.ExpiresOn);
    }
}

// Decorator that caches tokens in the in-memory cache
public class CacheAzureSqlTokenProvider : IAzureSqlTokenProvider
{
    private const string _cacheKey = nameof(CacheAzureSqlTokenProvider);
    private readonly IAzureSqlTokenProvider _inner;
    private readonly IMemoryCache _cache;

    public CacheAzureSqlTokenProvider(IAzureSqlTokenProvider inner, IMemoryCache cache)
    {
        _inner = inner;
        _cache = cache;
    }

    public async Task<(string AccessToken, DateTimeOffset ExpiresOn)> GetAccessTokenAsync(
        CancellationToken cancellationToken = default)
    {
        return await _cache.GetOrCreateAsync(_cacheKey, async cacheEntry =>
        {
            var (token, expiresOn) = await _inner.GetAccessTokenAsync(cancellationToken);

            // AAD access tokens have a default lifetime of 1 hour, so we take a small safety margin
            cacheEntry.SetAbsoluteExpiration(expiresOn.AddMinutes(-10));
            return (token, expiresOn);
        });
    }

    public (string AccessToken, DateTimeOffset ExpiresOn) GetAccessToken()
    {
        return _cache.GetOrCreate(_cacheKey, cacheEntry =>
        {
            var (token, expiresOn) = _inner.GetAccessToken();

            // AAD access tokens have a default lifetime of 1 hour, so we take a small safety margin
            cacheEntry.SetAbsoluteExpiration(expiresOn.AddMinutes(-10));
            return (token, expiresOn);
        });
    }

    ///






public class FilterService : IFilterService
{
    private readonly HttpClient _client;
    private readonly IAzureTokenService _azureTokenService;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IConfiguration _configuration;
    private readonly IContextService _contextService;
    private readonly ITokenAcquisition _tokenAcquisition;

    public FilterService(HttpClient client, IAzureTokenService azureTokenService, IConfiguration configuration,
        IHttpContextAccessor httpContextAccessor, IContextService contextService, ITokenAcquisition tokenAcquisition)
    {
        _client = client;
        _azureTokenService = azureTokenService;
        _configuration = configuration;
        _httpContextAccessor = httpContextAccessor;
        _contextService = contextService;
        _tokenAcquisition = tokenAcquisition;
    }

    private async Task BuildClient()
    {
        _client.BaseAddress = new Uri(_configuration["FilterServiceBaseUri"] ??
                                      throw new InvalidOperationException(
                                          "FilterServiceBaseUri not set in configuration"));
        if (_contextService.IsCientApp() || _contextService.IsQualifiedForAppAuthentication())
        {
            var accessToken =
                await _azureTokenService.GetCachedAccessTokenForAzureResourceDefaultScopeUsingClientSecretCredential(
                    _configuration["TenantId"], _configuration["ClientId"], _configuration["ISecret"],
                    _configuration["FilterServiceAppIdUri"]);
            _client.DefaultRequestHeaders.Add("Authorization", accessToken);
        }
        else
        {
            var userToken =
                await _tokenAcquisition.GetAccessTokenForUserAsync(new[]
                {
                    $"{_configuration["FilterServiceAppIdUri"]}/.default"
                });
            _client.DefaultRequestHeaders.Add("Authorization", $"Bearer {userToken}");
        }
    }

    public async Task<string> FetchAllFilterEvents()
    {
        if (!_client.DefaultRequestHeaders.Contains("Authorization"))
            await BuildClient();
        var response = await _client.GetAsync("/api/v1/event");
        var responseJson = await response.Content.ReadAsStringAsync();
        return responseJson;
    }

    public async Task<string> FetchFilterEvent(string? FilterEvent)
    {
        if (!_client.DefaultRequestHeaders.Contains("Authorization"))
            await BuildClient();
        var response = await _client.GetAsync($"/api/v1/event?event={FilterEvent}");
        var responseJson = await response.Content.ReadAsStringAsync();
        return responseJson;
    }

    public async Task<string> CreateFilterEvent(string? payload)
    {
        if (!_client.DefaultRequestHeaders.Contains("Authorization"))
            await BuildClient();
        var httpContent = new StringContent(payload!, Encoding.UTF8, "application/json");
        var response = await _client.PostAsync("/api/v1/event/create", httpContent);
        var responseJson = await response.Content.ReadAsStringAsync();
        return responseJson;
    }

    public async Task<string> CreateFilterEvent(FilterEventCreationDto payload)
    {
        if (!_client.DefaultRequestHeaders.Contains("Authorization"))
            await BuildClient();
        var content = JsonConvert.SerializeObject(new
        {
            user = payload.User,
            application = payload.Application,
            eventName = payload.EventName,
            description = payload.Description,
        });
        var httpContent = new StringContent(content, Encoding.UTF8, "application/json");
        var response = await _client.PostAsync("/api/v1/event/create", httpContent);
        var responseJson = await response.Content.ReadAsStringAsync();
        return responseJson;
    }

    public async Task<string> CreateFilterEventForEntityUpdate(string appName, ChangeTracker changeTracker)
    {
        try
        {
            var entitiesToTrack = changeTracker.Entries().Where(e =>
                e.State != EntityState.Detached && e.State != EntityState.Unchanged && e.State != EntityState.Added);
            foreach (var entity in entitiesToTrack)
            {
                var tableName = entity.Metadata.GetTableName();
                var userName = _httpContextAccessor?.HttpContext?.User?.Identity?.Name;
                var endPoint =
                    $"{_httpContextAccessor?.HttpContext?.Request.Method} {_httpContextAccessor?.HttpContext?.Request.Path.Value}";
                var keys = entity.State != EntityState.Added
                    ? entity.Properties.FirstOrDefault(p => p.Metadata.IsPrimaryKey())?.CurrentValue?.ToString()
                    : null;
                switch (entity.State)
                {
                    case EntityState.Modified:
                        {
                            var FilterData = JsonConvert.SerializeObject(new
                            {
                                newValue = JsonConvert.SerializeObject(
                                    entity.Properties.ToDictionary(prop => prop.Metadata.Name,
                                        prop => prop.CurrentValue)),
                                oldValue = JsonConvert.SerializeObject(
                                    entity.Properties.ToDictionary(prop => prop.Metadata.Name,
                                        prop => prop.OriginalValue))
                            });
                            var content = JsonConvert.SerializeObject(new
                            {
                                user = userName,
                                application = appName,
                                endPoint,
                                eventName = EventType.DATA_MODIFIED.ToString(),
                                tableName,
                                description = FilterData,
                                keys
                            });
                            await CreateFilterEvent(content);
                            foreach (var prop in entity.Properties)
                            {
                                if (prop.OriginalValue?.ToString() == prop.CurrentValue?.ToString()) continue;
                                if (prop.Metadata.Name.ToLower() == "modifiedat" ||
                                    prop.Metadata.Name.ToLower() == "modified" ||
                                    prop.Metadata.Name.ToLower() == "createdat" ||
                                    prop.Metadata.Name.ToLower() == "created") continue;
                                var fieldName = prop.Metadata.Name;
                                FilterData = JsonConvert.SerializeObject(new
                                {
                                    fieldName,
                                    oldValue = prop.OriginalValue,
                                    newValue = prop.CurrentValue,
                                });
                                content = JsonConvert.SerializeObject(new
                                {
                                    user = userName,
                                    application = appName,
                                    endPoint,
                                    eventName = EventType.DATA_MODIFIED.ToString(),
                                    tableName,
                                    description = FilterData,
                                    keys
                                });
                                await CreateFilterEvent(content);
                            }

                            break;
                        }
                    case EntityState.Deleted:
                        {
                            var FilterData = JsonConvert.SerializeObject(new
                            {
                                oldValue = JsonConvert.SerializeObject(
                                    entity.Properties.ToDictionary(prop => prop.Metadata.Name,
                                        prop => prop.OriginalValue))
                            });
                            var content = JsonConvert.SerializeObject(new
                            {
                                user = userName,
                                application = appName,
                                endPoint,
                                eventName = EventType.DATA_DELETED.ToString(),
                                tableName,
                                description = FilterData,
                                keys
                            });
                            await CreateFilterEvent(content);
                            break;
                        }
                    case EntityState.Added:
                        {
                            var FilterData = JsonConvert.SerializeObject(new
                            {
                                newValue = JsonConvert.SerializeObject(
                                    entity.Properties.ToDictionary(prop => prop.Metadata.Name,
                                        prop => prop.CurrentValue)),
                            });
                            var content = JsonConvert.SerializeObject(new
                            {
                                user = userName,
                                application = appName,
                                endPoint,
                                eventName = EventType.DATA_ADDED.ToString(),
                                tableName,
                                description = FilterData,
                                keys
                            });
                            await CreateFilterEvent(content);
                            break;
                        }
                }
            }

            return "Filter Data Logged Successfully";
        }
        catch (Exception)
        {
            return "Filter Data Logging Failed";
        }
    }

    public async Task<string> CreateFilterEventForEntityAdded(string appName, IEnumerable<EntityEntry> entities)
    {
        try
        {
            foreach (var entity in entities.ToList())
            {
                var tableName = entity.Metadata.GetTableName();
                var userName = _httpContextAccessor?.HttpContext?.User?.Identity?.Name;
                var endPoint =
                    $"{_httpContextAccessor?.HttpContext?.Request.Method} {_httpContextAccessor?.HttpContext?.Request.Path.Value}";
                var keys = entity.Properties.FirstOrDefault(p => p.Metadata.IsPrimaryKey())?.CurrentValue?.ToString();
                var FilterData = JsonConvert.SerializeObject(new
                {
                    newValue = JsonConvert.SerializeObject(
                        entity.Properties.ToDictionary(prop => prop.Metadata.Name, prop => prop.CurrentValue)),
                });
                var content = JsonConvert.SerializeObject(new
                {
                    user = userName,
                    application = appName,
                    endPoint,
                    eventName = EventType.DATA_ADDED.ToString(),
                    tableName,
                    description = FilterData,
                    keys
                });
                await CreateFilterEvent(content);
            }

            return "Filter Data Logged Successfully";
        }
        catch (Exception)
        {
            return "Filter Data Logging Failed";
        }
    }
}
}
```

```sql
SELECT * FROM sys.database_principals
```
