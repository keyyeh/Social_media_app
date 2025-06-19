using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SocialConnectAPI.Models
{
    public class SaleImage
    {
        [Key]
        public int Id { get; set; }

        public int SaleId { get; set; }

        [MaxLength(255)]
        public string ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; }

        public Sale Sale { get; set; }
    }
}