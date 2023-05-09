---
keywords: [ASP.NET.Core.Web.API.Startup]
---

```csharp

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

config.AddAzureKeyVault(new SecretClient(new Uri(config["KeyVaultUri"]), new ManagedIdentityCredential()),
    new AzureKeyVaultConfigurationOptions { ReloadInterval = TimeSpan.FromSeconds(600) });

var startup = new Startup(config);

startup.ConfigureServices(builder.Services);
var app = builder.Build();
var logger = new LoggerFactory().CreateLogger<Startup>();

startup.Configure(app, app.Environment, logger);

app.MigrateDatabase<DatabaseDbContext>().Run();


builder.Services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));
builder.Services.AddAzureClients(client =>
        {
            client.AddBlobServiceClient(new Uri(Configuration["StorageAccountUri"]));
            client.AddTableServiceClient(new Uri(configuration["StorageTableAccountUri"]));
            client.UseCredential(new ManagedIdentityCredential());
        });
builder.Services.AddControllers();
builder.Services.AddTransient<ProblemDetailsFactory, SampleProblemDetailsFactory>();
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
	options.SuppressModelStateInvalidFilter = true;
        options.SuppressMapClientErrors = true;
         options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            "https://httpstatuses.com/404";

});

builder.Services.AddProblemDetails(options =>
        options.CustomizeProblemDetails = (context) =>
        {

            var mathErrorFeature = context.HttpContext.Features
                                                       .Get<MathErrorFeature>();
            if (mathErrorFeature is not null)
            {
                (string Detail, string Type) details = mathErrorFeature.MathError switch
                {
                    MathErrorType.DivisionByZeroError =>
                    ("Divison by zero is not defined.",
                                          "https://wikipedia.org/wiki/Division_by_zero"),
                    _ => ("Negative or complex numbers are not valid input.",
                                          "https://wikipedia.org/wiki/Square_root")
                };

                context.ProblemDetails.Type = details.Type;
                context.ProblemDetails.Title = "Bad Input";
                context.ProblemDetails.Detail = details.Detail;
            }
        }
    );
builder.Services.AddHttpClient();
builder.Services.AddEndpointsApiExplorer();

builder.Services.Configure<RouteOptions>(options =>
{ options.LowercaseUrls = true; options.LowercaseQueryStrings = true; });

services.AddMemoryCache();

 services.AddHangfire(c =>
            {
                c.SetDataCompatibilityLevel(CompatibilityLevel.Version_180);
                c.UseSimpleAssemblyNameTypeSerializer();
                c.UseRecommendedSerializerSettings();
                c.UseColouredConsoleLogProvider();
                c.UseMemoryStorage();
            }
        );
        JobStorage.Current = new MemoryStorage();
        services.AddSingleton<IBackgroundJobClient>(x => new BackgroundJobClient());
        services.AddHangfireServer();
        services.AddSingleton<IAzureSqlTokenProvider, AzureSqlTokenProvider>();

        services.Decorate<IAzureSqlTokenProvider, CacheAzureSqlTokenProvider>();

        services.AddSingleton<AzureSqlTokenDbConnectionInterceptor>();

        services.AddDbContext<DatabaseDbContext>((provider, options) =>
        {
            options.UseSqlServer(Configuration.GetConnectionString("ConnectionStringDatabase"),
                sqlServerOptions =>
                {
                    sqlServerOptions.MigrationsAssembly("Repository.Project");
                    sqlServerOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
                });
            options.AddInterceptors(provider.GetRequiredService<AzureSqlTokenDbConnectionInterceptor>());
        });

services.AddApplicationInsightsTelemetry();
services.AddHttpContextAccessor();
        services.AddLazyCache();

                services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApi(Configuration.GetSection("AzureAd"))
            .EnableTokenAcquisitionToCallDownstreamApi()
            .AddInMemoryTokenCaches();

              services.AddMicrosoftIdentityWebApiAuthentication(Configuration);

                 services.AddMicrosoftIdentityWebApiAuthentication(Configuration, "AzureAdB2C");

        services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApp(Configuration.GetSection("AzureAd"))
            .EnableTokenAcquisitionToCallDownstreamApi()
            .AddInMemoryTokenCaches();

        services.Configure<MicrosoftIdentityOptions>(options =>
        {
            options.ClientSecret = Configuration["Secret"];
        });

services.Configure<ConfidentialClientApplicationOptions>(OpenIdConnectDefault.AuthenticationScheme, options =>
{
 options.ClientSecret = Configuration["Secret"];
});

 services.Configure<ConfidentialClientApplicationOptions>(JwtBearerDefaults.AuthenticationScheme, options =>
{
 options.ClientSecret = Configuration["Secret"];
});


 services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(microsoftIdentityOptions=>
    {
      Configuration.Bind("AzureAd", microsoftIdentityOptions);
      microsoftIdentityOptions.ClientCredentials = new CredentialDescription[] {
        CertificateDescription.FromKeyVault("https://msidentitywebsamples.vault.azure.net",
                                            "MicrosoftIdentitySamplesCert")};
    })
  .EnableTokenAcquisitionToCallDownstreamApi(confidentialClientApplicationOptions=>
    {
    Configuration.Bind("AzureAd", confidentialClientApplicationOptions);
    })
  .AddInMemoryTokenCaches();


  services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
   .AddMicrosoftIdentityWebApi(
     configureJwtBearerOptions =>
     {
      Configuration.Bind("AzureAd", configureJwtBearerOptions);
     }, microsoftIdentityOptions=>
     {
      Configuration.Bind("AzureAd", microsoftIdentityOptions);
      microsoftIdentityOptions.TokenDecryptionCertificates = new CertificateDescription[] {
         CertificateDescription.FromKeyVault("https://msidentitywebsamples.vault.azure.net",
                                             "MicrosoftIdentitySamplesDecryptCert")};
     })
   .EnableTokenAcquisitionToCallDownstreamApi(
     confidentialClientApplicationOptions=>
     {
      Configuration.Bind("AzureAd", confidentialClientApplicationOptions);
     })
   .AddInMemoryTokenCaches();

   services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
              .AddMicrosoftIdentityWebApp(Configuration.GetSection("AzureAd"))
                  .EnableTokenAcquisitionToCallDownstreamApi(initialScopes)
                      .AddMicrosoftGraph(Configuration.GetSection("DownstreamApi"))
                      .AddInMemoryTokenCaches();

  services.AddAuthentication()
            .AddMicrosoftIdentityWebApi(Configuration.GetSection("AzureAd"),
                                        JwtBearerDefaults.AuthenticationScheme)
            .EnableTokenAcquisitionToCallDownstreamApi();

        services.AddAuthorization(options =>
            options.AddPolicy("Admin",
                policy => policy.RequireRole("admin-role"))
        );



        services.AddAuthorization(options =>
        {
            options.AddPolicy("AzureAdPolicy", policy =>
            {
                policy.AddAuthenticationSchemes(OpenIdConnectDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser();
            });
        });

        services.AddControllers().AddNewtonsoftJson((options) =>
        {
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        });

        services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                policy =>
                {
                    policy.WithOrigins(Configuration["AllowedOrigins"].Split(","))
                        .SetIsOriginAllowedToAllowWildcardSubdomains().AllowAnyHeader()
                        .AllowAnyMethod().AllowCredentials().SetPreflightMaxAge(TimeSpan.FromSeconds(90)).Build();
                });
        });
 services.AddPagination(o =>
        {
            o.CanChangeSizeFromQuery = true;
            o.DefaultSize = 100;
            o.MaxSize = 1000;
            o.AfterQueryParameterName = "after";
            o.BeforeQueryParameterName = "before";
            o.FirstQueryParameterName = "first";
            o.LastQueryParameterName = "last";
            o.PageSizeQueryParameterName = "pagesize";
            o.PageQueryParameterName = "page";
        });
           services.AddAutoMapper(typeof(AutoMapperProfile));

        services.AddSwaggerGenNewtonsoftSupport();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPI", Version = "v1" });
    c.SwaggerDoc("v2", new OpenApiInfo { Title = "My API", Version = "v2" });
    c.EnableTryItOutByDefault();
    c.EnableAutoGeneratedEnumDescriptions();
    c.IgnoreObsoleteActions();
    c.IgnoreObsoleteProperties();
    c.IgnoreNonPublicMethods();
    c.IgnoreNonPublicProperties();
    c.IgnoreMapAttributeProperties();
     c.EnableAnnotations();
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
     c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.OAuth2,
                Flows = new OpenApiOAuthFlows
                {
                    Implicit = new OpenApiOAuthFlow
                    {
                        AuthorizationUrl = new Uri($"{Configuration["AzureAd:Instance"]}/{Configuration["AzureAd:TenantId"]}/oauth2/v2.0/authorize"),
                        TokenUrl = new Uri($"{Configuration["AzureAd:Instance"]}/{Configuration["AzureAd:TenantId"]}/oauth2/v2.0/token"),
                        Scopes = { { $"api://{Configuration["AzureAd:ClientId"]}/.deafult", "API Access" } }
                    }
                }
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "oauth2"
                        },
                        Scheme ="oauth2",
                        Name ="oauth2",
                        In = ParameterLocation.Header
                    }, new List<string>()
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

            c.SchemaFilter<EnumSchemaFilter>();
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

 builder.Services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
                options.KnownNetworks.Clear();
                options.KnownProxies.Clear();
            });

            var app = builder.Build();

            app.UseForwardedHeaders();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI v1");
    c.DocumentTitle = "My API Documentation";
    c.RoutePrefix = string.Empty;
    //relative path in wwwroot
    c.InjectStylesheet("/swagger-ui/custom.css");
     c.InjectStylesheet("/swagger-ui/SwaggerDark.css");
    c.EnablePersistAuthorization();
    c.EnableTryItOutByDefault();
     c.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
     c.OAuthUseBasicAuthenticationWithAccessCodeGrant();
            c.DocExpansion(DocExpansion.List);
            c.EnableTryItOutByDefault();
            c.EnablePersistAuthorization();
});
app.UseDeveloperExceptionPage();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.MapControllers();

app.UseExceptionHandler();
app.UseStatusCodePages();
app.UseRouting();

        app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
app.UseAuthorization();
app.UseAuthorization();
        app.UseMiddleware<LoggingMiddleware>();
        app.UseAuthentication();
app.AddAuthentication();

app.MapControllers();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
	ForwardedHeaders = ForwardedHeaders.All
});

app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapHangfireDashboard("/hangfire", new DashboardOptions
            {
                Authorization = new List<IDashboardAuthorizationFilter>(),
                AppPath = "/hangfire",
                DashboardTitle = "Hangfire Dashboard",
            }).RequireAuthorization("AzureAdPolicy");
        });
 var config = app.ApplicationServices.GetService(typeof(IConfiguration)) as IConfiguration;
        var enableSwagger = bool.Parse(config.GetValue<string>("EnableSwagger") ?? "false");
app.Run();
```
