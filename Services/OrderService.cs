using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyWebApp.Data;
using MyWebApp.Models;

namespace MyWebApp.Services;

public interface IOrderService
{
    Task<Order?> GetOrderByIdAsync(int id, int userId);
    Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int userId);
    Task<Order> CreateOrderAsync(Order order);
    Task<Order?> UpdateOrderAsync(int id, int userId, Order updatedOrder);
    Task<bool> DeleteOrderAsync(int id, int userId);
}

public class OrderService : IOrderService
{
    private readonly AppDbContext _context;
    
    public OrderService(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<Order?> GetOrderByIdAsync(int id, int userId)
    {
        return await _context.Orders
            .Include(o => o.User)
            .Where(o => o.Id == id && o.UserId == userId)
            .FirstOrDefaultAsync();
    }
    
    public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int userId)
    {
        return await _context.Orders
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.Created)
            .ToListAsync();
    }
    
    public async Task<Order> CreateOrderAsync(Order order)
    {
        order.Created = DateTime.UtcNow;
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        
        return order;
    }
    
    public async Task<Order?> UpdateOrderAsync(int id, int userId, Order updatedOrder)
    {
        var existingOrder = await _context.Orders
            .Where(o => o.Id == id && o.UserId == userId)
            .FirstOrDefaultAsync();
            
        if (existingOrder == null)
            return null;
            
        existingOrder.CustomerName = updatedOrder.CustomerName;
        existingOrder.Product = updatedOrder.Product;
        existingOrder.Quantity = updatedOrder.Quantity;
        existingOrder.Price = updatedOrder.Price;
        existingOrder.Status = updatedOrder.Status;
        
        await _context.SaveChangesAsync();
        return existingOrder;
    }
    
    public async Task<bool> DeleteOrderAsync(int id, int userId)
    {
        var order = await _context.Orders
            .Where(o => o.Id == id && o.UserId == userId)
            .FirstOrDefaultAsync();
            
        if (order == null)
            return false;
            
        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();
        return true;
    }
}
