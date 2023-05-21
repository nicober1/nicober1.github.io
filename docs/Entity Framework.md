---
keywords: [Entity Framework, EF COre 7.0]
---

### Sparse Columns

In SQL Server, a sparse column is a column that is optimized for storing null values. Sparse columns allow you to save storage space by not storing any data for columns that have a null value.

```csharp

CREATE TABLE Books (
   Price INT SPARSE,
   Name VARCHAR(50)
);

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder
        .Entity<Product>()
        .Property(e => e.Price)
        .IsSparse();
}
```

### JSON Columns

```csharp
public class Customer
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public ContactDetails? Contact { get; set; }
}
public class ContactDetails
{
    public Address Address { get; set; } = null!;
    public string? Phone { get; set; }
}
public class Address
{
    public string? Street { get; set; }
    public string City { get; set; }
    public string? Postcode { get; set; }
    public string Country { get; set; }
}

public class CustomerContext : DbContext
{
    public DbSet<Customer> Customers { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Data Source=(localdb)\ProjectsV13;Initial Catalog=EmployeesDb;");
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>().OwnsOne(
            customer => customer.Contact, ownedNavigationBuilder =>
            {
                ownedNavigationBuilder.ToJson();
                ownedNavigationBuilder.OwnsOne(contactDetails => contactDetails.Address);
            });
    }
}


```
