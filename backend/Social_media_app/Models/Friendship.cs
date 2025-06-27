using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SocialConnectAPI.Models
{
    public class Friendship
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        public int FriendshipId { get; set; }

        [Required, MaxLength(50)]
        public string Status { get; set; } // "Pending", "Accepted"

        public DateTime CreatedAt { get; set; }

        public User User { get; set; }

        public User Friend { get; set; }
    }
}