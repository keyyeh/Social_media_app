using Microsoft.AspNetCore.Identity;
using SocialConnectAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace Social_media_app.Models
{
    public class ApplicationUser : IdentityUser<int>
    {
        [Required, MaxLength(50)]
        public string Phone { get; set; }

        [Required, MaxLength(50)]
        public string Role { get; set; }

        public User User { get; set; }
    }
}
