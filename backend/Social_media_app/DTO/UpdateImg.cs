using System.ComponentModel.DataAnnotations;

namespace Social_media_app.DTO
{
    public class UpdateImg
    {
        [MaxLength(255)]
        public string Img {  get; set; }
        [MaxLength(255)]
        public string Cover { get; set; }
        
    }
}
