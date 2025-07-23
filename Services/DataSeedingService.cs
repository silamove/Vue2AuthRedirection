using MyWebApp.Data;
using MyWebApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace MyWebApp.Services;

public interface IDataSeedingService
{
    Task SeedDataAsync();
}

public class DataSeedingService : IDataSeedingService
{
    private readonly AppDbContext _context;
    private readonly IUserService _userService;
    
    public DataSeedingService(AppDbContext context, IUserService userService)
    {
        _context = context;
        _userService = userService;
    }
    
    public async Task SeedDataAsync()
    {
        // Check if data already exists
        if (await _context.Users.AnyAsync())
        {
            return; // Data already seeded
        }
        
        // Create demo users
        var user1 = await _userService.CreateUserAsync("user", "password", "user@example.com", "Demo User");
        var user2 = await _userService.CreateUserAsync("admin", "admin123", "admin@example.com", "Admin User");
        
        // Create demo orders
        var orders = new[]
        {
            new Order
            {
                CustomerName = "John Doe",
                Product = "Premium Widget",
                Quantity = 2,
                Price = 49.99m,
                Status = "Processing",
                UserId = user1.Id,
                Created = DateTime.UtcNow.AddDays(-5)
            },
            new Order
            {
                CustomerName = "Jane Smith",
                Product = "Standard Widget",
                Quantity = 1,
                Price = 29.99m,
                Status = "Completed",
                UserId = user1.Id,
                Created = DateTime.UtcNow.AddDays(-3)
            },
            new Order
            {
                CustomerName = "Bob Johnson",
                Product = "Deluxe Widget",
                Quantity = 3,
                Price = 79.99m,
                Status = "Shipped",
                UserId = user2.Id,
                Created = DateTime.UtcNow.AddDays(-1)
            }
        };
        
        _context.Orders.AddRange(orders);
        await _context.SaveChangesAsync();
    }
}
