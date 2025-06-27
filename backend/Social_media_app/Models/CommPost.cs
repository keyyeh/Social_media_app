using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialConnectAPI.Models
{
    public class CommPost
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        [Required]
        public string Content { get; set; }

        public bool IsPublic { get; set; }

        [MaxLength(255)]
        public string Tag { get; set; }

        public DateTime CreatedAt { get; set; }

        public User User { get; set; }
        public List<PostMedia> PostMedias { get; set; }
        public List<PostEmoji> PostEmojis { get; set; }
        public List<PostComment> PostComments { get; set; }


    }
}
