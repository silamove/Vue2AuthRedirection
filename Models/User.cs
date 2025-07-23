using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyWebApp.Models;

public class User
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(50)]
    public string Username { get; set; } = string.Empty;
    
    [Required]
    [StringLength(255)]
    public string PasswordHash { get; set; } = string.Empty;
    
    [StringLength(100)]
    public string? Email { get; set; }
    
    [StringLength(100)]
    public string? FullName { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public bool IsActive { get; set; } = true;
    
    // Navigation property
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
