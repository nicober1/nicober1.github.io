---
keywords: [HangFire]
---



```csharp
Install-Package Hangfire.Core
Install-Package Hangfire.AspNetCore
Install-Package Hangfire.MemoryStorage.Core

public void ConfigureServices(IServiceCollection services)
{
  services.AddHangfire(c => c.UseMemoryStorage());
  JobStorage.Current = new MemoryStorage();
  services.AddSingleton<IBackgroundClient>(x => new BackgroundJobClient());
}

public void Configure(IApplicationBuilder app)
{
  app.UseHangfireServer();
  app.UseHangfireDashboard();
  endpoints.MapHangfireDashboard();.
}

    [ApiController]
    [Route("[controller]")]
    public class MyController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly IBackgroundClient _backgroundClient;

        public MyController(IRepository repository, IBackgroundClient backgroundClient)
        {
            _repository = repository;
            _backgroundClient = backgroundClient;
        }

        [HttpPost]
        public async Task<IActionResult> EnqueueJob()
        {
            var jobId = _backgroundClient.Create(new Job(async () => await _repository.UpdateDatabaseAsync())).Id;

            return Ok($"Job enqueued with ID: {jobId}.");
        }
    }
```



