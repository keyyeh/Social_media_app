using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SocialConnectAPI.Models
{
    public class Sale
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        [MaxLength(255)]
        public string Title { get; set; }

        public string Description { get; set; }

        public decimal? Price { get; set; }

        public DateTime CreatedAt { get; set; }

        public User User { get; set; }
        public List<SaleImage> SaleImages { get; set; }
    }
}