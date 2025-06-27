using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SocialConnectAPI.Models
{
    public class PostEmoji
    {
        public int PostId { get; set; }

        public int UserId { get; set; }

        public string Emoji { get; set; }

        public DateTime? CreateAt { get; set; }

        public User User { get; set; }

        public CommPost CommPost { get; set; }
    }
}
