using Microsoft.EntityFrameworkCore;
using SocialConnectAPI.Data.SeedModel;
using SocialConnectAPI.Models;

namespace SocialConnectAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Account> Accounts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<CommPost> CommPosts { get; set; }
        public DbSet<PostMedia> PostMedias { get; set; }
        public DbSet<PostEmoji> PostEmojis { get; set; }
        public DbSet<PostComment> PostComments { get; set; }
        public DbSet<Friendship> Friendships { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<SaleImage> SaleImages { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> context) : base(context)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.RelationshipModel();
        }
    }
}
