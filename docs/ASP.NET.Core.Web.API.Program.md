---
keywords: [ASP.NET.Core.Web.API.Startup]
---

```csharp

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPI", Version = "v1" });
    c.EnableTryItOutByDefault();
    c.EnableAutoRealty();
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI v1");
    c.RoutePrefix = string.Empty;
    //relative path in wwwroot
    c.InjectStylesheet("/swagger-ui/custom.css");
});

app.UseHttpsRedirection();
app.UseStaticFiles();
app.MapControllers();





app.Run();
```
