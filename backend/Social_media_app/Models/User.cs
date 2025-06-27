using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SocialConnectAPI.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required, MaxLength(255)]
        public string Name { get; set; }

        [MaxLength(255)]
        public string? Address { get; set; }

        public DateTime? Date { get; set; }

        [MaxLength(255)]
        public string? Avatar { get; set; }

        [MaxLength(255)]
        public string? Job { get; set; }

        [MaxLength(255)]
        public string? Education { get; set; }

        public Account Account { get; set; }
        public List<CommPost> CommPosts { get; set; }
        public List<PostEmoji> PostEmojis { get; set; }
        public List<PostComment> PostComments { get; set; }
        public List<Friendship> Friendships { get; set; }
        public List<Friendship> FriendshipsAsFriend { get; set; }
        public List<Message> SentMessages { get; set; }
        public List<Message> ReceivedMessages { get; set; }
        public List<Sale> Sales { get; set; }
    }

}