---
keywords: [ASP.NET Core Web API Middleware]
---

```csharp

public class LoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<LoggingMiddleware> _logger;

    public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        // Check if the request should be logged based on a flag
        bool shouldLog = !context.Request.Headers.ContainsKey("X-Bypass-Logging");

        // Log the request
        if (shouldLog)
        {
            _logger.LogInformation($"Request: {context.Request.Method} {context.Request.Path}");
            _logger.LogInformation($"Request Headers: {context.Request.Headers}");
            _logger.LogInformation($"Request Body: {await GetRequestBody(context.Request)}");
        }

        // Call the next middleware in the pipeline
        await _next(context);

        // Log the response
        if (shouldLog)
        {
            _logger.LogInformation($"Response: {context.Response.StatusCode}");
            _logger.LogInformation($"Response Headers: {context.Response.Headers}");
            _logger.LogInformation($"Response Body: {await GetResponseBody(context.Response)}");
        }
    }

    private async Task<string> GetRequestBody(HttpRequest request)
    {
        request.EnableBuffering();
        using var reader = new StreamReader(request.Body, Encoding.UTF8, true, 1024, true);
        var body = await reader.ReadToEndAsync();
        request.Body.Position = 0;
        return body;
    }

    private async Task<string> GetResponseBody(HttpResponse response)
    {
        response.Body.Seek(0, SeekOrigin.Begin);
        var body = await new StreamReader(response.Body).ReadToEndAsync();
        response.Body.Seek(0, SeekOrigin.Begin);
        return body;
    }
}

//

  app.UseMiddleware<LoggingMiddleware>();


  //


using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Threading.Tasks;

public class LoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<LoggingMiddleware> _logger;

    public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Query.ContainsKey("skipLogging"))
        {
            await _next(context);
            return;
        }

        // Log request
        _logger.LogInformation($"Request {context.Request.Method} {context.Request.Path}");
        if (context.Request.Headers != null && context.Request.Headers.Count > 0)
        {
            _logger.LogInformation($"Headers: {string.Join(",", context.Request.Headers)}");
        }
        if (context.Request.ContentLength.HasValue && context.Request.ContentLength > 0)
        {
            context.Request.EnableBuffering();
            var body = await new StreamReader(context.Request.Body).ReadToEndAsync();
            _logger.LogInformation($"Body: {body}");
            context.Request.Body.Position = 0;
        }

        // Call the next middleware
        await _next(context);

        // Log response
        _logger.LogInformation($"Response {context.Response.StatusCode}");
        if (context.Response.Headers != null && context.Response.Headers.Count > 0)
        {
            _logger.LogInformation($"Headers: {string.Join(",", context.Response.Headers)}");
        }
        if (context.Response.ContentLength.HasValue && context.Response.ContentLength > 0)
        {
            context.Response.Body.Seek(0, SeekOrigin.Begin);
            var body = await new StreamReader(context.Response.Body).ReadToEndAsync();
            _logger.LogInformation($"Body: {body}");
            context.Response.Body.Seek(0, SeekOrigin.Begin);
        }
    }
}


```
