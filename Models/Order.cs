using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyWebApp.Models;

public class Order
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(100)]
    public string CustomerName { get; set; } = string.Empty;
    
    [Required]
    [StringLength(200)]
    public string Product { get; set; } = string.Empty;
    
    [Range(1, 1000)]
    public int Quantity { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    [Range(0.01, 999999.99)]
    public decimal Price { get; set; }
    
    public DateTime Created { get; set; } = DateTime.UtcNow;
    
    [Required]
    [StringLength(50)]
    public string Status { get; set; } = "Processing";
    
    // Foreign key
    public int UserId { get; set; }
    
    // Navigation property
    public virtual User User { get; set; } = null!;
    
    [NotMapped]
    public decimal TotalAmount => Quantity * Price;
}
