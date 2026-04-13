using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Note
{
    [Key]
    public int Id { get; set; }
    
    [Required(ErrorMessage = "Title is required")]
    public required string  Title  { get; set; }
    
    public string? Content { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}