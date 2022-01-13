using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Text;
using DAL.Entities;
using DAL.Entities.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class AppDbContext : IdentityDbContext<AppUser,AppRole, int>
    {
        public DbSet<ClientProfile> ClientProfiles { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
       {
           base.OnModelCreating(builder);
           builder.Entity<AppRole>()
               .HasData(
                   new AppRole()
                   {
                       Id = 1,
                       Name = "user",
                       NormalizedName = "USER"
                   },
                   new AppRole
                   {
                       Id = 2,
                       Name = "admin",
                       NormalizedName = "ADMIN"

                   }
               );
           builder.Entity<ClientProfile>().HasData(new ClientProfile
           {
               Id = 1,
              FirstName = "Valentyn",
              SecondName = "Kit",
              About = "I'm Admin",
              Gender = "male",
              DateOfRegistration=DateTime.Now
           });
            var hasher = new PasswordHasher<AppUser>();
           builder.Entity<AppUser>().HasData(new AppUser
           {
               Id = 1,
               UserName = "valikit14@gmail.com",
               NormalizedUserName = "valikit14@gmail.com",
               Email = "valikit14@gmail.com",
               NormalizedEmail = "valikit14@gmail.com",
               EmailConfirmed = true,
               PasswordHash = hasher.HashPassword(null, "Testpass8"),
               PhoneNumber = "0989081789",
               SecurityStamp = string.Empty
           });

           builder.Entity<IdentityUserRole<int>>().HasData(new IdentityUserRole<int>
           {
               RoleId = 2,
               UserId = 1
           });
        }
    }
}
