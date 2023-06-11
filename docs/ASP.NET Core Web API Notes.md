---
keywords: [ASP.NET.Core.Web.API.Notes]
---

```csharp


[ApiExplorerSettings(IgnoreApi = true)]


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient();

private readonly IHttpClientFactory _httpClientFactory;

public BasicModel(IHttpClientFactory httpClientFactory) => _httpClientFactory = httpClientFactory;


var httpClient = _httpClientFactory.CreateClient();
var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);

        if (httpResponseMessage.IsSuccessStatusCode)
        {
            using var contentStream =
                await httpResponseMessage.Content.ReadAsStreamAsync();
        }


        builder.Services.AddHttpClient("GitHub", httpClient =>
{
    httpClient.BaseAddress = new Uri("https://api.github.com/");


  httpClient.DefaultRequestHeaders.Add(
        HeaderNames.Accept, "application/vnd.github.v3+json");
    httpClient.DefaultRequestHeaders.Add(
        HeaderNames.UserAgent, "HttpRequestsSample");
});

  var httpClient = _httpClientFactory.CreateClient("GitHub");

  //

  [HttpPost]
[ProducesResponseType(StatusCodes.Status201Created)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
[Produces("application/json")]
public async Task<IActionResult> Create(TodoItem item)


[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[Produces(MediaTypeNames.Application.Json)]
public class BaseController : ControllerBase
{
    protected string? GetUserClaim(string claimType)
    {
        return User.Claims.FirstOrDefault(x => x.Type == claimType)?.Value;
    }

    protected string? GetUserName()
    {
        return User.Identity?.Name;
    }

    protected string? GetUserEmail()
    {
        return User.FindFirst(ClaimTypes.Upn)?.Value;
    }
}

//


public class TodoItem
{
    public long Id { get; set; }

    [Required]
    public string Name { get; set; } = null!;

    [DefaultValue(false)]
    public bool IsComplete { get; set; }
}


//


    [HttpGet("{Numerator}/{Denominator}")]
    public IActionResult Divide(double Numerator, double Denominator)
    {
        if (Denominator == 0)
        {
            var errorType = new MathErrorFeature
            {
                MathError = MathErrorType.DivisionByZeroError
            };
            HttpContext.Features.Set(errorType);
            return BadRequest();
        }

        return Ok(Numerator / Denominator);
    }


//


public static class Migration
{
    public static IHost MigrateDatabase<TContext>(this IHost host) where TContext : DbContext
    {
        using var scope = host.Services.CreateScope();
        var services = scope.ServiceProvider;
        var logger = services.GetRequiredService<ILogger<TContext>>();
        var context = services.GetService<TContext>();

        try
        {
            logger.LogInformation("Migrating database associated with context {DbContextName}", typeof(TContext).Name);

            var retry = Policy.Handle<SqlException>()
                .WaitAndRetry(
                    retryCount: 2,
                    sleepDurationProvider: retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                    onRetry: (exception, retryCount, ctx) =>
                    {
                        logger.LogError($"Retry {retryCount} of {ctx.PolicyKey} at {ctx.OperationKey}, due to: {exception}.");
                    });

            retry.Execute(() => context?.Database.Migrate());

            logger.LogInformation("Migrated database associated with context {DbContextName}", typeof(TContext).Name);
        }
        catch (SqlException ex)
        {
            logger.LogError(ex, "An error occurred while migrating the database used on context {DbContextName}", typeof(TContext).Name);
        }

        return host;
    }
}

//

public static class ExceptionMiddlewareExtensions
{
    public static void ConfigureExceptionHandler(this IApplicationBuilder app, ILogger logger)
    {
        app.UseExceptionHandler(appError =>
        {
            appError.Run(async context =>
            {
                context.Response.ContentType = "application/json";

                var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                if (contextFeature != null)
                {
                    context.Response.StatusCode = contextFeature.Error switch
                    {
                        _ => StatusCodes.Status500InternalServerError
                    };

                    logger.LogError($"Something went wrong: {contextFeature.Error}");

                    await context.Response.WriteAsync(new ErrorDetails
                    {
                        StatusCode = context.Response.StatusCode,
                        Message = contextFeature.Error.Message,
                    }.ToString());
                }
            });
        });
    }
}

public class ErrorDetails
{
    public int StatusCode { get; set; }
    public string? Message { get; set; }

    public override string ToString() => JsonSerializer.Serialize(this);
}

//

public class EnumSchemaFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        if (context.Type.IsEnum)
        {
            schema.Enum.Clear();
            Enum.GetNames(context.Type)
                .ToList()
                .ForEach(name => schema.Enum.Add(new OpenApiString($"{Convert.ToInt64(Enum.Parse(context.Type, name))} = {name}")));
        }
    }
}

//

public class ResponseFilterAttribute : ActionFilterAttribute
{
    public override void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.Result is ObjectResult { Value: IResponse result })
            context.Result = result.Status switch
            {
                ResponseStatus.Success => new OkObjectResult(result.GetData()),
                ResponseStatus.Error => new BadRequestObjectResult(result.ErrorReason),
                ResponseStatus.NotFound => new NotFoundObjectResult(result.ErrorReason),
                ResponseStatus.Unprocessable => new UnprocessableEntityObjectResult(result.ErrorReason),
                ResponseStatus.Forbidden => new StatusCodeResult(StatusCodes.Status403Forbidden),
                _ => new StatusCodeResult(StatusCodes.Status500InternalServerError)
            };
        base.OnActionExecuted(context);
    }
}

//

public class ValidationFilterAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var action = context.RouteData.Values["action"];
        var controller = context.RouteData.Values["controller"];

        var param = context.ActionArguments
            .SingleOrDefault(x => x.Value.ToString().Contains("Dto")).Value;
        if (param is null)
        {
            context.Result = new BadRequestObjectResult($"Object is null. Controller: {controller}, action: {action}");
            return;
        }

        if (!context.ModelState.IsValid)
            context.Result = new UnprocessableEntityObjectResult(context.ModelState);
    }

    public override void OnActionExecuted(ActionExecutedContext context)
    { }
}


//

{
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:40344",
      "sslPort": 44360
    }
  },
  "profiles": {
    "Development": {
      "commandName": "Project",
      "launchBrowser": true,
      "launchUrl": "hangfire",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      },
      "dotnetRunMessages": true,
      "applicationUrl": "https://localhost:5001;http://localhost:5000"
    }
  }
}

//

dotnet ef --startup-project ../API migrations add Migration1

//

 modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

 //

 var entitiesToAdd = ChangeTracker.Entries().Where(e => e.State is EntityState.Added).ToList();
 var saveResult = await base.SaveChangesAsync(cancellationToken); //save to capture autogenerated keys in entitiesToAdd



 public static class SwaggerDocumentationExtensions
    {
        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "v1", Version = "v1" });
                c.AddServer(new OpenApiServer { Url = $"url" });
                c.AddServer(new OpenApiServer { Url = $"purl" });
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
                c.EnableAnnotations();

                c.AddSecurityDefinition("oauth2",
                    new OpenApiSecurityScheme
                    {
                        Type = SecuritySchemeType.OAuth2,
                        Flows = new OpenApiOAuthFlows
                        {
                            Implicit = new OpenApiOAuthFlow
                            {
                                AuthorizationUrl =
                                    new Uri(
                                        $"{configuration["AzureAd:Instance"]}/{configuration["AzureAd:TenantId"]}/oauth2/v2.0/authorize"),
                                TokenUrl =
                                    new Uri(
                                        $"{configuration["AzureAd:Instance"]}/{configuration["AzureAd:TenantId"]}/oauth2/v2.0/token"),
                                Scopes =
                                {
                                    {
                                        $"{configuration["AppIdUri"]}/.default",
                                        "API Access using default scope"
                                    }
                                }
                            }
                        }
                    });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "oauth2" },
                            Scheme = "oauth2",
                            Name = "oauth2",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
                });

                c.AddSecurityDefinition(name: "Bearer",
                    securityScheme: new OpenApiSecurityScheme
                    {
                        Name = "Authorization",
                        Description =
                            "Enter the Bearer Authorization string as following: `Bearer Generated-JWT-Token`",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.ApiKey,
                        Scheme = "Bearer"
                    });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                            Reference = new OpenApiReference { Id = "Bearer", Type = ReferenceType.SecurityScheme }
                        },
                        new List<string>()
                    }
                });
            });

            return services;
        }

        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
                c.InjectStylesheet("/swagger-ui/swagger.css");
                c.OAuthUseBasicAuthenticationWithAccessCodeGrant();
                c.DocExpansion(DocExpansion.List);
                c.EnableTryItOutByDefault();
                c.EnablePersistAuthorization();
            });

            return app;
        }
    }
}

```
