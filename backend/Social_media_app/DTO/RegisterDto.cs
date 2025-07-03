using SocialConnectAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace Social_media_app.DTO
{
    public class RegisterDto
    {
        public Account Account { get; set; }
        [Required, MaxLength(255)]
        public string Name { get; set; }
    }
}
