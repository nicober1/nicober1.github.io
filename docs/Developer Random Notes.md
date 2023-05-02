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


///


using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;


public class AzureStorageService : IAzureStorageService
{
    private readonly BlobServiceClient _blobServiceClient;

    public AzureStorageService(BlobServiceClient blobServiceClient)
    {
        _blobServiceClient = blobServiceClient;
    }

    public string GetFileUrl(string filename, string? containerName)
    {
        var blobContainerClient = _blobServiceClient.GetBlobContainerClient(containerName);
        var blob = blobContainerClient.GetBlobClient(filename);
        return blob.Uri.ToString();
    }

    public string GetFileUrlWithSasToken(string filename, string containerName, string? storedPolicyName = null)
    {
        var container = _blobServiceClient.GetBlobContainerClient(containerName);
        var blobClient = container.GetBlobClient(filename);
        var userDelegationKey = _blobServiceClient.GetUserDelegationKey(DateTimeOffset.UtcNow.AddHours(-1),
            DateTimeOffset.UtcNow.AddDays(7));
        var sasBuilder = new BlobSasBuilder
        {
            BlobContainerName = container.Name,
            BlobName = filename,
            Resource = "b",
        };
        if (storedPolicyName == null)
        {
            sasBuilder.StartsOn = DateTimeOffset.UtcNow.AddHours(-1);
            sasBuilder.ExpiresOn = DateTimeOffset.UtcNow.AddDays(36500);
            sasBuilder.SetPermissions(BlobContainerSasPermissions.Read);
        }
        else
        {
            sasBuilder.Identifier = storedPolicyName;
        }

        var blobUriBuilder = new BlobUriBuilder(blobClient.Uri)
        {
            Sas = sasBuilder.ToSasQueryParameters(userDelegationKey, _blobServiceClient.AccountName)
        };
        return blobUriBuilder.ToUri().ToString();
    }

    public async Task CreateStoredAccessPolicyAsync(string containerName, string? policyName)
    {
        var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
        var currentAccessPolicy = (await containerClient.GetAccessPolicyAsync()).Value;
        if (currentAccessPolicy.SignedIdentifiers.Any(x => x.AccessPolicy.Permissions == "r"))
        {
            return;
        }

        var signedIdentifiers = new List<BlobSignedIdentifier>
        {
            new()
            {
                Id = policyName,
                AccessPolicy = new BlobAccessPolicy
                {
                    StartsOn = DateTimeOffset.UtcNow.AddHours(-1),
                    ExpiresOn = DateTimeOffset.UtcNow.AddYears(100),
                    Permissions = "r"
                }
            }
        };
        await containerClient.SetAccessPolicyAsync(permissions: signedIdentifiers);
    }

    public async Task<(string blobSasUrl, DateTimeOffset CreatedOn, string ContentType)>
        SaveFormFileAsBlobWithTagsAsync(IFormFile file,
            string containerName, Dictionary<string, string?> tagDictionary, string? policy = null)
    {
        var uniqueId = tagDictionary["uniqueid"];
        var fileName = uniqueId + file.FileName.Replace(" ", "_");
        var contentType = file.ContentType;
        using var fileStream = new MemoryStream();
        await file.CopyToAsync(fileStream);
        fileStream.Seek(0, SeekOrigin.Begin);
        var container = _blobServiceClient.GetBlobContainerClient(containerName);
        await container.CreateIfNotExistsAsync();
        var blob = container.GetBlobClient(fileName);
        var blobHttpHeader = new BlobHttpHeaders { ContentType = contentType };
        var options = new BlobUploadOptions { Tags = tagDictionary, Metadata = tagDictionary, HttpHeaders = blobHttpHeader };
        await blob.UploadAsync(fileStream, options);
        var properties = await blob.GetPropertiesAsync();
        //var blobSasUrl = GetFileUrlWithSasToken(fileName, containerName, policy);
        return (blob.Uri.ToString(), properties.Value.CreatedOn, properties.Value.ContentType);
    }

    public async Task DeleteFile(string filename, string containerName)
    {
        var container = _blobServiceClient.GetBlobContainerClient(containerName);
        var blob = container.GetBlobClient(filename);
        await blob.DeleteAsync();
    }

    public async Task<bool> FileExistsAsync(string filename, string containerName)
    {
        var container = _blobServiceClient.GetBlobContainerClient(containerName);
        var blob = container.GetBlobClient(filename);
        return await blob.ExistsAsync();
    }

    public async Task SaveFileAsync(string filename, byte[] file, string? containerName)
    {
        var container = _blobServiceClient.GetBlobContainerClient(containerName);
        await container.CreateIfNotExistsAsync();
        var blob = container.GetBlobClient(filename);
        await blob.UploadAsync(new MemoryStream(file), true);
    }

    public async Task<string> SaveFileAsync(string filename, Stream fileStream, string containerName)
    {
        var container = _blobServiceClient.GetBlobContainerClient(containerName);
        await container.CreateIfNotExistsAsync();
        var blob = container.GetBlobClient(filename);
        await blob.UploadAsync(fileStream, true);
        return blob.Uri.ToString();
    }

    public async Task<Stream> GetFileAsStreamAsync(string fileName, string containerName)
    {
        var container = _blobServiceClient.GetBlobContainerClient(containerName);
        var blob = container.GetBlobClient(fileName);
        var ms = new MemoryStream();
        await blob.DownloadToAsync(ms);
        return ms;
    }

    public async Task<Stream> ReadFileAsStream(string fileName, string containerName)
    {
        var container = _blobServiceClient.GetBlobContainerClient(containerName);
        var blob = container.GetBlobClient(fileName);
        var blobStream = await blob.OpenReadAsync();
        return blobStream;
    }

    public async Task<bool> CreateContainerAsync(string containerName)
    {
        var container = _blobServiceClient.GetBlobContainerClient(containerName);
        await container.CreateIfNotExistsAsync();
        return await container.ExistsAsync();
    }

    public async Task<List<TaggedBlobItem>> FindBlobsbyTagsAsync(string query)
    {
        //Sample Query
        //var queryString = @"@container = 'animals' AND ""name"" = 'Rambo'";
        // string query = @"""Date"" >= '2020-04-20' AND ""Date"" <= '2020-04-30'";

        var blobs = new List<TaggedBlobItem>();
        await foreach (var taggedBlobItem in _blobServiceClient.FindBlobsByTagsAsync(query))
        {
            blobs.Add(taggedBlobItem);
        }

        return blobs;
    }
}

//


public class AzureTokenService : IAzureTokenService
{
    public IAppCache? _cache;

    public AzureTokenService(IAppCache? cache)
    {
        _cache = cache;
    }

    public async Task<string?> GetAccessTokenForAzureDatabaseDefaultScope()
    {
        try
        {
            return (await new ChainedTokenCredential(new ManagedIdentityCredential(), new VisualStudioCredential(),
                new VisualStudioCodeCredential()).GetTokenAsync(
                new TokenRequestContext(new[] { "https://database.windows.net/.default" }))).Token;
        }
        catch (Exception)
        {
            return null;
        }
    }

    public async Task<string?> GetCachedAccessTokenForAzureDatabaseDefaultScope()
    {
        async Task<string?> GetAccessTokenForAzureDatabaseDefaultScopeLocalFunction()
        {
            try
            {
                return (await new ChainedTokenCredential(new ManagedIdentityCredential(), new VisualStudioCredential(),
                    new VisualStudioCodeCredential()).GetTokenAsync(
                    new TokenRequestContext(new[] { "https://database.windows.net/.default" }))).Token;
            }
            catch (Exception)
            {
                return null;
            }
        }

        return await _cache?.GetOrAddAsync("AccessTokenForAzureDatabaseDefaultScope", async entry =>
            {
                var record = await GetAccessTokenForAzureDatabaseDefaultScopeLocalFunction();
                entry.AbsoluteExpiration = record == null ? DateTimeOffset.UtcNow.AddMinutes(-1) : DateTimeOffset.UtcNow.AddMinutes(5);
                return record;
            }
        )!;
    }

    public async Task<string?> GetAccessTokenForAzureResourceDefaultScopeUsingClientSecretCredential(string tenantId, string clientId, string secret, string resource)
    {
        try
        {
            var azureCredential =
                new ClientSecretCredential(tenantId, clientId, secret);
            var context = new TokenRequestContext(new[]
                { $"{resource}/.default" });
            var token = await azureCredential.GetTokenAsync(context, CancellationToken.None);
            return "Bearer " + token.Token;
        }
        catch (Exception)
        {
            return null;
        }
    }

    public async Task<string?> GetCachedAccessTokenForAzureResourceDefaultScopeUsingClientSecretCredential(string? tenantId, string? clientId, string? secret, string? resource)
    {
        async Task<string?> GetTokenLocalFunction()
        {
            try
            {
                var azureCredential =
                    new ClientSecretCredential(tenantId, clientId, secret);
                var context = new TokenRequestContext(new[]
                    { $"{resource}/.default" });
                var token = await azureCredential.GetTokenAsync(context, CancellationToken.None);
                return "Bearer " + token.Token;
            }
            catch (Exception)
            {
                return null;
            }
        }

        return await _cache?.GetOrAddAsync($"AccessToken{resource}", async entry =>
            {
                var record = await GetTokenLocalFunction();
                entry.AbsoluteExpiration = record == null ? DateTimeOffset.UtcNow.AddMinutes(-1) : DateTimeOffset.UtcNow.AddMinutes(5);
                return record;
            }
        )!;
    }
}

//


[TransientRegistration]
public class MemoryCacheService : IMemoryCacheService
{
    private readonly IMemoryCache _cache;
    private static readonly SemaphoreSlim semaphore = new(1, 1);

    public MemoryCacheService(IMemoryCache cache)
    {
        _cache = cache;
    }

    public bool TryToFetchItemFromCache<TItem>(object key, out TItem? value)
    {
        if (_cache.TryGetValue(key, out var result))
        {
            switch (result)
            {
                case null:
                    value = default;
                    return true;

                case TItem item:
                    value = item;
                    return true;
            }
        }

        value = default;
        return false;
    }

    public async Task<TItem> SetItemToCache<TItem>(object key, TItem value, MemoryCacheEntryOptions? options = null)
    {
        try
        {
            await semaphore.WaitAsync();
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromHours(1))
                .SetAbsoluteExpiration(TimeSpan.FromHours(2)).SetPriority(CacheItemPriority.Normal).SetSize(1024);
            using var entry = _cache.CreateEntry(key);
            entry.SetOptions(options ?? cacheEntryOptions);
            entry.Value = value;
            return value;
        }
        finally
        {
            semaphore.Release();
        }
    }
}

//


 public static async Task<string> ReadBody(this HttpRequest request)
    {
        request.EnableBuffering();
        var body = new MemoryStream();
        await request.Body.CopyToAsync(body);
        request.Body.Seek(0, SeekOrigin.Begin);
        body.Seek(0, SeekOrigin.Begin);
        var buffer = new byte[Convert.ToInt32(request.ContentLength)];
        var unused = await body.ReadAsync(buffer, 0, buffer.Length);
        var content = Encoding.UTF8.GetString(buffer);
        return content;
    }


    ///


    public static class JsonExtensions
{
    public static string BeautifyJson(this string rawJson)
    {
        try
        {
            var purifiedJson = rawJson.Purify();
            dynamic parsedJson = JsonConvert.DeserializeObject(purifiedJson)!;
            var indentedJson = (string)JsonConvert.SerializeObject(parsedJson, Formatting.Indented);
            var jsonWithoutSlash = indentedJson.Replace(@"\", "");
            var editedJson = jsonWithoutSlash.Replace(@"""{", "{");
            var finalJson = editedJson.Replace(@"}""", "}");
            return finalJson;
        }
        catch (Exception)
        {
            return rawJson;
        }
    }

    public static string Purify(this string json) =>
        Regex.Replace(json,
            "\\s+(?=((\\\\[\\\\\"]|[^\\\\\"])*\"(\\\\[\\\\\"]|[^\\\\\"])*\")*(\\\\[\\\\\"]|[^\\\\\"])*$)", "");
}

//

[assembly: WebJobsStartup(typeof(DbMigration), "DbMigration")]


public class DbMigration : IWebJobsStartup
{
    public void Configure(IWebJobsBuilder builder)
    {
        builder.AddExtension<DbSeedConfigProvider>();
    }

    internal class DbSeedConfigProvider : IExtensionConfigProvider
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public DbSeedConfigProvider(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        public void Initialize(ExtensionConfigContext context)
        {
            using var scope = _scopeFactory.CreateScope();
            var dbContext = scope.ServiceProvider.GetService<DBDbContext>();

            var migrator = dbContext?.Database.GetService<IMigrator>();
            migrator?.Migrate();
        }
    }
}

//


public static class ErrorResponseMapper
{
    public class ErrorObjectResult : ObjectResult
    {
        public ErrorObjectResult(ProblemDetails value) : base(value)
        {
            StatusCode = value.Status;
        }
    }

    private static ObjectResult CreateResponse(
        HttpStatusCode statusCode,
        string type,
        string title = "",
        string detail = "",
        string instance = "")
    {
        var problem = new ProblemDetails
        {
            Status = (int)statusCode,
            Type = type,
            Title = title,
            Instance = instance,
            Detail = detail
        };

        return new ErrorObjectResult(problem);
    }

    public static ObjectResult BadRequest(
        string type = "",
        string title = "",
        string detail = "",
        string instance = "") =>
        CreateResponse(HttpStatusCode.BadRequest, type, title, detail, instance);

    public static ObjectResult InternalServerError(
        string type = "",
        string title = "Unexpected Error",
        string detail = "",
        string instance = "") =>
        CreateResponse(HttpStatusCode.InternalServerError, type, title, detail, instance);

    public static ObjectResult NotFound(
        string type = "",
        string title = "",
        string detail = "",
        string instance = "") =>
        CreateResponse(HttpStatusCode.NotFound, type, title, detail, instance);

    public static ObjectResult RequestTimeout(string detail = "") => CreateResponse(HttpStatusCode.RequestTimeout, "", "Timeout", detail);
}

//



public class IgnorePropertiesResolver : DefaultContractResolver
{
    private readonly HashSet<string?> _propsToIgnore;

    public IgnorePropertiesResolver(IEnumerable<string> propNamesToIgnore)
    {
        _propsToIgnore = new HashSet<string?>(propNamesToIgnore);
    }

    protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
    {
        var property = base.CreateProperty(member, memberSerialization);

        if (_propsToIgnore.Contains(property.PropertyName))
        {
            property.ShouldSerialize = _ => false;
        }

        property.PropertyName = property.PropertyName.ToCamelCase();

        return property;
    }
}

public static class StringExtensions
{
    public static string? ToCamelCase(this string? input)
    {
        if (string.IsNullOrEmpty(input) || !char.IsUpper(input[0]))
            return input;

        var camelCase = char.ToLower(input[0]) + input[1..];
        return camelCase;
    }
}



public class OpenApiConfigurationOptions : DefaultOpenApiConfigurationOptions
{
    public override OpenApiVersionType OpenApiVersion { get; set; } = OpenApiVersionType.V3;

    public override OpenApiInfo Info { get; set; } = new()
    {
        Version = "1.0.0",
        Title = "",
        Description =
            ""
    };

    public override List<OpenApiServer> Servers { get; set; } = new();
}

public class ImplicitAuthFlow : OpenApiOAuthSecurityFlows
{
    private const string AuthorisationUrl = "https://login.microsoftonline.com/{0}/oauth2/v2.0/authorize";
    private const string RefreshUrl = "https://login.microsoftonline.com/{0}/oauth2/v2.0/token";
    private const string TokenUrl = "https://login.microsoftonline.com/{0}/oauth2/v2.0/token";

    public ImplicitAuthFlow()
    {
        var tenantId =
            Environment.GetEnvironmentVariable(AZURE_TENANT_ID,
                EnvironmentVariableTarget.Process);
        Implicit = new OpenApiOAuthFlow
        {
            AuthorizationUrl = new Uri(string.Format(AuthorisationUrl, tenantId)),
            TokenUrl = new Uri(string.Format(TokenUrl, tenantId)),
            RefreshUrl = new Uri(string.Format(RefreshUrl, tenantId)),
            Scopes = { { $"{Environment.GetEnvironmentVariable("AZURE_AUDIENCE")}/.default", " Scope" } }
        };
    }
}

public class AuthCodeAuthFlow : OpenApiOAuthSecurityFlows
{
    private const string AuthorisationUrl = "https://login.microsoftonline.com/{0}/oauth2/v2.0/authorize";
    private const string TokenUrl = "https://login.microsoftonline.com/{0}/oauth2/v2.0/token";
    private const string RefreshUrl = "https://login.microsoftonline.com/{0}/oauth2/v2.0/token";

    public AuthCodeAuthFlow()
    {
        var tenantId =
            Environment.GetEnvironmentVariable(AZURE_TENANT_ID,
                EnvironmentVariableTarget.Process);
        AuthorizationCode = new OpenApiOAuthFlow
        {
            AuthorizationUrl = new Uri(string.Format(AuthorisationUrl, tenantId)),
            TokenUrl = new Uri(string.Format(TokenUrl, tenantId)),
            RefreshUrl = new Uri(string.Format(RefreshUrl, tenantId)),
            Scopes = { { $"{Environment.GetEnvironmentVariable("AZURE_AUDIENCE")}/.default", " Scope" } }
        };
    }
}

public class ClientCredAuthFlow : OpenApiOAuthSecurityFlows
{
    private const string AuthorisationUrl = "https://login.microsoftonline.com/{0}/oauth2/v2.0/authorize";
    private const string RefreshUrl = "https://login.microsoftonline.com/{0}/oauth2/v2.0/token";
    private const string TokenUrl = "https://login.microsoftonline.com/{0}/oauth2/v2.0/token";
    public const string SchemeName = "ClientCredAuthFlow";

    public ClientCredAuthFlow()
    {
        var tenantId =
            Environment.GetEnvironmentVariable(IdentityConfiguration.AZURE_TENANT_ID,
                EnvironmentVariableTarget.Process);
        ClientCredentials = new OpenApiOAuthFlow
        {
            AuthorizationUrl = new Uri(string.Format(AuthorisationUrl, tenantId)),
            TokenUrl = new Uri(string.Format(TokenUrl, tenantId)),
            RefreshUrl = new Uri(string.Format(RefreshUrl, tenantId)),
            Scopes = { { $"{Environment.GetEnvironmentVariable("AZURE_AUDIENCE")}/.default", " Scope" } }
        };
    }
}

//


public partial class MicrosoftGraphRepository
{
    public async Task<List<User>?> GetGraphGroupMembers(string? group)
    {
        var graphClient = await MsGraphClient();
        if (Guid.TryParse(group, out _))
        {
            return await GetGraphGroupMembersUsingGroupId(group);
        }

        var iGraphServiceGroupsCollectionPage = await graphClient?.Groups
            .Request(new Option[] { new QueryOption("$count", "true") })
            .Header("ConsistencyLevel", "eventual")
            .Filter($"displayName eq '{group}'")
            .Select("id,displayName,members")
            .GetAsync()!;

        return await GetGraphGroupMembersUsingGroupId(iGraphServiceGroupsCollectionPage.FirstOrDefault()?.Id, group);
    }

    public async Task<List<User>?> GetGraphGroupMembersUsingGroupId(string? groupId, string? groupName = null)
    {
        var list = new List<User>();

        if (groupId != null)
        {
            var graphClient = await MsGraphClient();

            var members = await graphClient?.Groups[groupId].Members
                .Request(new Option[] { new QueryOption("$count", "true") })
                .Header("ConsistencyLevel", "eventual")
                .GetAsync()!;

            while (members.Count > 0)
            {
                list.AddRange(members.Select(x => x as User)!);
                if (members.NextPageRequest != null)
                    members = await members.NextPageRequest.GetAsync();
                else
                    break;
            }
        }
        else
        {
            var members = await _Service.GetMembersForOnPremGroup("gh", groupName);
            if (!members.Any())
                return list;

            list.AddRange(members.Select(mail => new User { Mail = mail?.ToLower() }));
        }

        return list;
    }
}

//


public partial class MicrosoftGraphRepository
{
    public async Task<GraphServiceClient?> MsGraphClient()
    {
        async Task<GraphServiceClient?> GraphClientFunc()
        {
            try
            {
                Environment.SetEnvironmentVariable(AZURE_CLIENT_SECRET,
                    _config[CLIENTSECRET_IDENTIFIER]);
                var credential = new ChainedTokenCredential(new EnvironmentCredential(), new ManagedIdentityCredential());
                var token = await credential.GetTokenAsync(
                    requestContext: new TokenRequestContext(new[] { "https://graph.microsoft.com/.default" }));

                var graphServiceClient = new GraphServiceClient(new DelegateAuthenticationProvider(requestMessage =>
                {
                    requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.Token);

                    return Task.CompletedTask;
                }));

                return graphServiceClient;
            }
            catch (Exception)
            {
                return null;
            }
        }

        return await _cache.GetOrAddAsync("GraphClient", entry =>
        {
            var record = GraphClientFunc();
            entry.AbsoluteExpiration = record.Result == null ? DateTimeOffset.UtcNow.AddMinutes(-1) : DateTimeOffset.UtcNow.AddMinutes(5);
            return record;
        });
    }
}

using AppRoleAssignment = Microsoft.Graph.AppRoleAssignment;
using Group = Microsoft.Graph.Group;


public partial class MicrosoftGraphRepository
{
    public async Task<User?> GetGraphUser(string? email)
    {
        var graphClient = await MsGraphClient();

        return await graphClient?.Users[email].Request().GetAsync()!;
    }

    public async Task<(User user, string? profilePictureBase64Encoded)> GetDetailedGraphUser(string? email)
    {
        var graphClient = await MsGraphClient();

        var user = await graphClient?.Users[email].Request().GetAsync()!;
        Stream? photoStream = null;
        try
        {
            photoStream = await graphClient.Users[email].Photo.Content.Request().GetAsync()!;
        }
        catch (Exception)
        {
            // ignored
        }

        string? profilePictureBase64Encoded = null;
        if (photoStream == null) return (user, profilePictureBase64Encoded);
        using var ms = new MemoryStream();
        await photoStream.CopyToAsync(ms);
        profilePictureBase64Encoded = $"data:image/png;base64,{Convert.ToBase64String(ms.ToArray())}";

        return (user, profilePictureBase64Encoded);
    }

    public async Task<bool> IsGraphUserPresent(string? email)
    {
        var graphClient = await MsGraphClient();
        try
        {
            return (await graphClient?.Users[email].Request().GetAsync()!).DisplayName != null;
        }
        catch (Exception)
        {
            return false;
        }
    }

    public async Task<string?> GetGraphUserManager(string? email)
    {
        var graphClient = await MsGraphClient();
        try
        {
            var manager = await graphClient?.Users[email].Manager.Request().Select("displayName").GetAsync()! as User;
            return manager?.DisplayName;
        }
        catch (Exception)
        {
            return null;
        }
    }

    public async Task<Stream?> GetGraphUserProfilePhoto(string? email)
    {
        var graphClient = await MsGraphClient();
        try
        {
            return await graphClient?.Users[email].Photo.Content.Request().GetAsync()!;
        }
        catch (Exception)
        {
            return null;
        }
    }

    public async Task<string?> GetGraphUserAppRoleAssignmentsList(string? email)
    {
        var graphClient = await MsGraphClient();
        try
        {
            var appRoleAssignmentsCollectionPage = await graphClient?.Users[email].AppRoleAssignments
                .Request(new Option[] { new QueryOption("$count", "true") })
                .Header("ConsistencyLevel", "eventual")
                .Select(x => new { x.PrincipalDisplayName, x.CreatedDateTime, x.PrincipalType, x.ResourceDisplayName })
                .GetAsync()!;
            var list = new List<AppRoleAssignment>();
            while (appRoleAssignmentsCollectionPage.Count > 0)
            {
                list.AddRange(appRoleAssignmentsCollectionPage.Select(role => role));
                if (appRoleAssignmentsCollectionPage.NextPageRequest != null)
                    appRoleAssignmentsCollectionPage =
                        await appRoleAssignmentsCollectionPage.NextPageRequest.GetAsync();
                else
                    break;
            }

            return JsonConvert.SerializeObject(list,
                new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore,
                    Formatting = Formatting.Indented,
                    ContractResolver = new IgnorePropertiesResolver(new[] { "ODataType" })
                });
        }
        catch (Exception)
        {
            return null;
        }
    }

    public async Task<string?> GetGraphUserMemberOfGroupsList(string? email)
    {
        var graphClient = await MsGraphClient();
        try
        {
            var memberOfCollectionWithReferencesPage = await graphClient?.Users[email].MemberOf
                .Request(new Option[] { new QueryOption("$count", "true") })
                .Header("ConsistencyLevel", "eventual")
                .Select("id,displayName")
                .GetAsync()!;
            var list = new List<Group?>();
            while (memberOfCollectionWithReferencesPage.Count > 0)
            {
                list.AddRange(memberOfCollectionWithReferencesPage.Select(x => x as Group));
                if (memberOfCollectionWithReferencesPage.NextPageRequest != null)
                    memberOfCollectionWithReferencesPage =
                        await memberOfCollectionWithReferencesPage.NextPageRequest.GetAsync();
                else
                    break;
            }

            var groupList = list.Where(g => g != null).SelectMany(g => new[] { g?.DisplayName });

            return JsonConvert.SerializeObject(groupList,
                new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore,
                    Formatting = Formatting.Indented,
                    ContractResolver = new IgnorePropertiesResolver(new[] { "ODataType" })
                });
        }
        catch (Exception)
        {
            return null;
        }
    }

    public async Task<string?> GetGraphUserTransitiveMemberOfGroupsList(string? email)
    {
        var graphClient = await MsGraphClient();
        try
        {
            var memberOfCollectionWithReferencesPage = await graphClient?.Users[email].TransitiveMemberOf
                .Request(new Option[] { new QueryOption("$count", "true") })
                .Header("ConsistencyLevel", "eventual")
                .Select("id,displayName")
                .GetAsync()!;
            var list = new List<Group?>();
            while (memberOfCollectionWithReferencesPage.Count > 0)
            {
                list.AddRange(memberOfCollectionWithReferencesPage.Select(x => x as Group));
                if (memberOfCollectionWithReferencesPage.NextPageRequest != null)
                    memberOfCollectionWithReferencesPage =
                        await memberOfCollectionWithReferencesPage.NextPageRequest.GetAsync();
                else
                    break;
            }

            return JsonConvert.SerializeObject(list,
                new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore,
                    Formatting = Formatting.Indented,
                    ContractResolver = new IgnorePropertiesResolver(new[] { "ODataType" })
                });
        }
        catch (Exception)
        {
            return null;
        }
    }
}


public class StorageRepository : IStorageRepository
{
    private readonly TelemetryClient _telemetryClient;
    private readonly BlobServiceClient _blobServiceClient;
    public IConfiguration _config;

    public StorageRepository(TelemetryClient telemetryClient, BlobServiceClient blobServiceClient, IConfiguration config)
    {
        _telemetryClient = telemetryClient;
        _blobServiceClient = blobServiceClient;
        _config = config;
    }

    public async Task<Response<BlobContentInfo>> UploadProfilePictureAsBlob(string? blobName, Stream? photoStream)
    {
        var blobContainerClient = _blobServiceClient.GetBlobContainerClient(_config[CONTAINER_PROFILE_PICTURE]);
        var blobClient = blobContainerClient.GetBlobClient(blobName?.ToLower());
        return await blobClient.UploadAsync(photoStream, true);
    }

    public async Task<MemoryStream?> GetProfilePictureMemoryStreamFromBlob(string? blobName)
    {
        var blobContainerClient = _blobServiceClient.GetBlobContainerClient(_config[CONTAINER_PROFILE_PICTURE]);
        var blobClient = blobContainerClient.GetBlobClient(blobName?.ToLower());
        if (!await blobClient.ExistsAsync()) return null;
        var stream = await blobClient.OpenReadAsync();
        var memoryStream = new MemoryStream();
        await stream.CopyToAsync(memoryStream);
        return memoryStream;
    }



public sealed class ddDbContext : DbContext, IddDbContext
{
    public IAppCache? _cache;
    public IConfiguration? _config;

    public ddDbContext(DbContextOptions<ddDbContext> options, IAppCache? cache, IConfiguration? config) : base(options)
    {
        _cache = cache;
        _config = config;
        if (!Database.IsRelational()) return;
        var connection = (SqlConnection)Database.GetDbConnection();

        string? GetAzureDatabaseAccessToken()
        {
            try
            {
                return new ManagedIdentityCredential().GetToken(
                    new TokenRequestContext(new[] { "https://database.windows.net/.default" })).Token;
            }
            catch (Exception)
            {
                return null;
            }
        }

        if (_cache != null)

            connection.AccessToken = _cache.GetOrAdd("AzureDatabaseAccessToken", entry =>
            {
                var record = GetAzureDatabaseAccessToken();
                entry.AbsoluteExpiration = record == null ? DateTimeOffset.UtcNow.AddMinutes(-1) : DateTimeOffset.UtcNow.AddMinutes(5);
                return record;
            });
    }

    public DbSet<UserGraph>? UsersGraph { get; set; }
    public DbSet<UserApp>? UsersApp { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserGraph>().Navigation(g => g.UserApp).AutoInclude();
        modelBuilder.Entity<UserGraph>().HasAlternateKey(c => c.Mail);
        modelBuilder.Entity<UserApp>().HasAlternateKey(c => c.Mail);
        modelBuilder.Entity<UserGraph>()
            .HasOne(g => g.UserApp).WithOne(u => u.UserGraph).HasForeignKey<UserApp>(u => u.Id);
    }

    public async Task<int> CustomSaveChangesAsync()
    {
        return await SaveChangesAsync(CancellationToken.None);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var entries = ChangeTracker
            .Entries()
            .Where(e => e.Entity is BaseEntity && e.State is EntityState.Added or EntityState.Modified);

        foreach (var entityEntry in entries)
        {
            ((BaseEntity)entityEntry.Entity).Updated = DateTime.Now;

            if (entityEntry.State == EntityState.Added)
            {
                ((BaseEntity)entityEntry.Entity).Created = DateTime.Now;
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}
}


public class DbContextDesignHelper
{
    private class ddDbContextFactory : IDesignTimeDbContextFactory<ddDbContext>
    {
        public ddDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ddDbContext>();
            optionsBuilder.UseSqlServer(GetDBConnection());
            return new ddDbContext(optionsBuilder.Options, null, null!);
        }
    }

    private static SqlConnection GetDBConnection()
    {
        IConfiguration config = new ConfigurationBuilder().SetBasePath(Path.Combine(Directory.GetCurrentDirectory()))
            .AddJsonFile("local.settings.json").Build();
        var token = new ManagedIdentityCredential().GetToken(
            new TokenRequestContext(new[] { "https://database.windows.net/.default" }));
        var conn = new SqlConnection
        {
            ConnectionString = config.GetSection("Values").GetValue<string>("conn"),
            AccessToken = token.Token
        };
        return conn;
    }
}
```

```sql
SELECT * FROM sys.database_principals
```
