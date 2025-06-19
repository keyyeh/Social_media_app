using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SocialConnectAPI.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }

        public int SenderId { get; set; }

        public int ReceiverId { get; set; }

        [Required, MaxLength(255)]
        public string Content { get; set; }

        [Required]
        public bool IsRead { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public User Sender { get; set; }
        public User Receiver { get; set; }
    }
}