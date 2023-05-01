---
keywords: [ASP.NET Core Web API – Repository Pattern, Repository Pattern]
---

```csharp
using Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace Repository
{
    public abstract class RepositoryBase<TContext, T> : IRepositoryBase<T> where T : class where TContext : DbContext
    {
        protected TContext _context;

        public RepositoryBase(TContext context) => this._context = context;

        public IQueryable<T> FindAll(bool trackChanges) =>
            !trackChanges ?
                _context.Set<T>()
                .AsNoTracking() :
                _context.Set<T>();

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression,
        bool trackChanges) =>
            !trackChanges ?
                _context.Set<T>()
                .Where(expression)
                .AsNoTracking() :
                _context.Set<T>()
                .Where(expression);

        public void Create(T entity) => _context.Set<T>().Add(entity);

        public void Update(T entity) => _context.Set<T>().Update(entity);

        public void Delete(T entity) => _context.Set<T>().Remove(entity);
    }
}


//


using Contracts;
using Entities;
using Entities.Models;
using System.Collections.Generic;
using System.Linq;

namespace Repository
{
    public class ClientRepository : RepositoryBase<ExternalClientContext, Client>, IClientRepository
    {
        public ClientRepository(ExternalClientContext clientContext)
            :base(clientContext)
        {
        }

        public IEnumerable<Client> GetAllClients(bool trackChanges) =>
            FindAll(trackChanges)
            .ToList();
    }
}

//

using Contracts;
using Entities;

namespace Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private RepositoryContext _repositoryContext;
        private ExternalClientContext _externalClientContext;

        private ICompanyRepository _companyRepository;
        private IEmployeeRepository _employeeRepository;

        private IClientRepository _clientRepository;

        public RepositoryManager(RepositoryContext repositoryContext, ExternalClientContext externalClientContext)
        {
            _repositoryContext = repositoryContext;
            _externalClientContext = externalClientContext;
        }

        public ICompanyRepository Company
        {
            get
            {
                if (_companyRepository is null)
                    _companyRepository = new CompanyRepository(_repositoryContext);

                return _companyRepository;
            }
        }

        public IEmployeeRepository Employee
        {
            get
            {
                if (_employeeRepository is null)
                    _employeeRepository = new EmployeeRepository(_repositoryContext);

                return _employeeRepository;
            }
        }

        public IClientRepository Client
        {
            get
            {
                if (_clientRepository is null)
                    _clientRepository = new ClientRepository(_externalClientContext);

                return _clientRepository;
            }
        }

        public void Save() => _repositoryContext.SaveChanges();
    }
}


//


using Entities.Configuration;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Entities
{
    public class ExternalClientContext : DbContext
    {
        public ExternalClientContext(DbContextOptions<ExternalClientContext> options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ClientConfiguration());
        }

        public DbSet<Client> Clients { get; set; }
    }
}


//



using AutoMapper;
using Contracts;
using Entities.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CompanyEmployees.Controllers
{
    [Route("api/companies")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;

        public CompaniesController(IRepositoryManager repository, ILoggerManager logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetCompanies()
        {
            var companies = _repository.Company.GetAllCompanies(trackChanges: false);

            var companiesDto = _mapper.Map<IEnumerable<CompanyDto>>(companies);

            return Ok(companiesDto);
        }

        [HttpGet("clients")]
        public IActionResult GetTests()
        {
            var tests = _repository.Client.GetAllClients(trackChanges: false);

            return Ok(tests);
        }
    }
}


//


  public static void ConfigureRepositoryManager(this IServiceCollection services) =>
           services.AddScoped<IRepositoryManager, RepositoryManager>();

//

builder.Services.ConfigureRepositoryManager();

//

using AutoMapper;
using Contracts;
using Entities.ConfigurationModels;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Service.Contracts;

namespace Service;

public sealed class ServiceManager : IServiceManager
{
	private readonly Lazy<ICompanyService> _companyService;
	private readonly Lazy<IEmployeeService> _employeeService;
	private readonly Lazy<IAuthenticationService> _authenticationService;

	public ServiceManager(IRepositoryManager repositoryManager,
		ILoggerManager logger,
		IMapper mapper, IEmployeeLinks employeeLinks,
		UserManager<User> userManager,
		IOptions<JwtConfiguration> configuration)
	{
		_companyService = new Lazy<ICompanyService>(() =>
			new CompanyService(repositoryManager, logger, mapper));
		_employeeService = new Lazy<IEmployeeService>(() =>
			new EmployeeService(repositoryManager, logger, mapper, employeeLinks));
		_authenticationService = new Lazy<IAuthenticationService>(() =>
			new AuthenticationService(logger, mapper, userManager, configuration));
	}

	public ICompanyService CompanyService => _companyService.Value;
	public IEmployeeService EmployeeService => _employeeService.Value;
	public IAuthenticationService AuthenticationService => _authenticationService.Value;
}

//

public static void ConfigureRepositoryManager(this IServiceCollection services) =>
		services.AddScoped<IRepositoryManager, RepositoryManager>();

	public static void ConfigureServiceManager(this IServiceCollection services) =>
		services.AddScoped<IServiceManager, ServiceManager>();


//


using Contracts;

namespace Repository;

public sealed class RepositoryManager : IRepositoryManager
{
	private readonly RepositoryContext _repositoryContext;
	private readonly Lazy<ICompanyRepository> _companyRepository;
	private readonly Lazy<IEmployeeRepository> _employeeRepository;

	public RepositoryManager(RepositoryContext repositoryContext)
	{
		_repositoryContext = repositoryContext;
		_companyRepository = new Lazy<ICompanyRepository>(() => new CompanyRepository(repositoryContext));
		_employeeRepository = new Lazy<IEmployeeRepository>(() => new EmployeeRepository(repositoryContext));
	}

	public ICompanyRepository Company => _companyRepository.Value;
	public IEmployeeRepository Employee => _employeeRepository.Value;

	public async Task SaveAsync() => await _repositoryContext.SaveChangesAsync();
}


//


using Contracts;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Repository;

public class RepositoryBase<T> : IRepositoryBase<T> where T : class
{
	protected RepositoryContext RepositoryContext;

	public RepositoryBase(RepositoryContext repositoryContext)
		=> RepositoryContext = repositoryContext;

	public IQueryable<T> FindAll(bool trackChanges) =>
		!trackChanges ?
		  RepositoryContext.Set<T>()
			.AsNoTracking() :
		  RepositoryContext.Set<T>();

	public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression,
	bool trackChanges) =>
		!trackChanges ?
		  RepositoryContext.Set<T>()
			.Where(expression)
			.AsNoTracking() :
		  RepositoryContext.Set<T>()
			.Where(expression);

	public void Create(T entity) => RepositoryContext.Set<T>().Add(entity);

	public void Update(T entity) => RepositoryContext.Set<T>().Update(entity);

	public void Delete(T entity) => RepositoryContext.Set<T>().Remove(entity);
}


```
