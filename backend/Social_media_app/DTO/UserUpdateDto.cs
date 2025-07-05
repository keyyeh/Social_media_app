using System.ComponentModel.DataAnnotations;

namespace Social_media_app.DTO
{
    public class UserUpdateDto
    {
        [MaxLength(255)]
        public string? Email { get; set; }

        [Required, MaxLength(255)]
        public string Name { get; set; }

        [MaxLength(255)]
        public string? Phone { get; set; }

        [MaxLength(255)]
        public string? Address { get; set; }

        [MaxLength(255)]
        public string? Job { get; set; }

        [MaxLength(255)]
        public string? Education { get; set; }
    }
}
