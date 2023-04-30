---
keywords: [ASP.NET.Core.Web.API.Notes]
---

```csharp

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

```
