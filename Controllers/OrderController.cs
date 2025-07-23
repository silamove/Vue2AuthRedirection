using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace MyWebApp.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : Controller
    {
        [HttpGet("{id}")]
        public IActionResult GetOrder(int id)
        {
            // Mock order data
            var order = new
            {
                Id = id,
                CustomerName = "John Doe",
                Product = "Premium Widget",
                Quantity = 2,
                Price = 49.99,
                Created = DateTime.Now.AddDays(-5).ToString("yyyy-MM-dd"),
                Status = "Processing"
            };

            return Ok(order);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateOrder(int id, [FromBody] OrderUpdateModel model)
        {
            // In a real app, this would update the database
            return Ok(new { message = $"Order {id} updated successfully" });
        }
    }

    public class OrderUpdateModel
    {
        public string CustomerName { get; set; }
        public string Product { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
