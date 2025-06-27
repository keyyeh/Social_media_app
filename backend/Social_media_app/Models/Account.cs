using System.ComponentModel.DataAnnotations;

namespace SocialConnectAPI.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(255)]
        public string? Phone { get; set; }

        [Required, MaxLength(255)]
        public string Email { get; set; }

        [Required, MaxLength(255)]
        public string Password { get; set; }

        [MaxLength(255)]
        public string? Role { get; set; }

        public User? User { get; set; }
    }

}
