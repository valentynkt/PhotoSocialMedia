using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Text;
using DAL.Entities;
using DAL.Entities.Auth;
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
                   },
                   new AppRole
                   {
                       Id = 2,
                       Name = "admin"
                   }
               );
        }
    }
}
