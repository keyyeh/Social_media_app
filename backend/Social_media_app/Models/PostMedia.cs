using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialConnectAPI.Models
{
    public class PostMedia
    {
        [Key]
        public int Id { get; set; }

        public int PostId { get; set; }

        [MaxLength(255)]
        public string ImageUrl { get; set; }

        [MaxLength(255)]
        public string VideoUrl { get; set; }

        public string Description { get; set; }

        public CommPost CommPost { get; set; }
    }
}
