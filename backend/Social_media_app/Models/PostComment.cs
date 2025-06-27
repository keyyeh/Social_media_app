using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SocialConnectAPI.Models
{
    public class PostComment
    {
        [Key]
        public int Id { get; set; }

        public int PostId { get; set; }

        public int UserId { get; set; }

        [Required]
        public string Content { get; set; }

        public int? UserPComment { get; set; }

        public DateTime CreatedAt { get; set; }

        public User User { get; set; }
        public CommPost CommPost { get; set; }
        public PostComment ParentComment { get; set; }
        public List<PostComment> ChildComments { get; set; }
    }
}
