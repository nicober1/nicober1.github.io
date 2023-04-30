---
slug: /ASP.NET_RepositoryPattern
id: ASP.NET_RepositoryPattern
title: ASP.NET Core Web API – Repository Pattern
description: ASP.NET Core Web API – Repository Pattern
keywords: [ASP.NET Core Web API – Repository Pattern,Repository Pattern]
sidebar_label: ASP.NET Core Web API – Repository Pattern
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

```



