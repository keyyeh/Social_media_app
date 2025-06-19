using Microsoft.EntityFrameworkCore;
using SocialConnectAPI.Models;
using System.Reflection.Emit;

namespace SocialConnectAPI.Data.SeedModel
{
    public static class CreateSeedModel
    {
        public static void RelationshipModel(this ModelBuilder modelBuilder)
        {
            // Cấu hình khóa chính và khóa ngoại

            // Accounts
            modelBuilder.Entity<Account>().HasIndex(a => a.Phone).IsUnique();
            modelBuilder.Entity<Account>().HasIndex(a => a.Email).IsUnique();

            // Users
            modelBuilder.Entity<User>()
                .HasOne(u => u.Account)
                .WithOne(a => a.User)
                .HasForeignKey<User>(u => u.ID)
                .OnDelete(DeleteBehavior.NoAction);

            // CommPosts
            modelBuilder.Entity<CommPost>()
                .HasOne(p => p.User)
                .WithMany(u => u.CommPosts)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // PostMedia
            modelBuilder.Entity<PostMedia>()
                .HasOne(pm => pm.CommPost)
                .WithMany(p => p.PostMedias)
                .HasForeignKey(pm => pm.PostId)
                .OnDelete(DeleteBehavior.NoAction);

            // PostEmoji
            modelBuilder.Entity<PostEmoji>()
                .HasKey(pe => new { pe.PostId, pe.UserId });
            modelBuilder.Entity<PostEmoji>()
                .HasOne(pe => pe.CommPost)
                .WithMany(p => p.PostEmojis)
                .HasForeignKey(pe => pe.PostId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<PostEmoji>()
                .HasOne(pe => pe.User)
                .WithMany(u => u.PostEmojis)
                .HasForeignKey(pe => pe.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // PostComments
            modelBuilder.Entity<PostComment>()
                .HasOne(pc => pc.CommPost)
                .WithMany(p => p.PostComments)
                .HasForeignKey(pc => pc.PostId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<PostComment>()
                .HasOne(pc => pc.User)
                .WithMany(u => u.PostComments)
                .HasForeignKey(pc => pc.UserId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<PostComment>()
                .HasOne(pc => pc.ParentComment)
                .WithMany(pc => pc.ChildComments)
                .HasForeignKey(pc => pc.UserPComment)
                .OnDelete(DeleteBehavior.NoAction);

            // Friendships
            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.User)
                .WithMany(u => u.Friendships)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.Friend)
                .WithMany(u => u.FriendshipsAsFriend)
                .HasForeignKey(f => f.FriendshipId)
                .OnDelete(DeleteBehavior.NoAction);

            // Messages
            modelBuilder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany(u => u.SentMessages)
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Message>()
                .HasOne(m => m.Receiver)
                .WithMany(u => u.ReceivedMessages)
                .HasForeignKey(m => m.ReceiverId)
                .OnDelete(DeleteBehavior.NoAction);

            // Sales
            modelBuilder.Entity<Sale>()
                .HasOne(s => s.User)
                .WithMany(u => u.Sales)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // SaleImages
            modelBuilder.Entity<SaleImage>()
                .HasOne(si => si.Sale)
                .WithMany(s => s.SaleImages)
                .HasForeignKey(si => si.SaleId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
