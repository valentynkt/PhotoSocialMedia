using System;
using AutoMapper;
using DAL;
using DAL.Entities;
using DAL.Entities.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace PhotoAlbumTest
{
    internal static class UnitTestHelper
    {
        public static DbContextOptions<AppDbContext> GetUnitTestDbOptions()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            using (var context = new AppDbContext(options))
            {
                SeedData(context);
            }
            return options;
        }
        public static void SeedData(AppDbContext context)
        {
            var hasher = new PasswordHasher<AppUser>();

            ClientProfile clientProfile1 = new ClientProfile { Id=1,FirstName = "Valentyn",SecondName = "Kit", About ="Test",Gender = "Male",DateOfRegistration = new DateTime(2020, 7, 22)};

            context.Users.Add(new AppUser
                {Id = 1, Email = "valikit14@gmail.com", PasswordHash = hasher.HashPassword(null, "Testpass8")});

            context.Images.Add(new Image
                {Id = 1, ImageData = new byte[] {1, 5, 1, 7, 1, 0, 1}, ImageTitle = "SomeTitle",PersonId = 1,PublishedBy = clientProfile1,PublishedTime = new DateTime(2020, 7, 22)});
            context.Images.Add(new Image
                { Id = 2, ImageData = new byte[] { 1, 1, 3, 1, 1, 0, 1 }, ImageTitle = "MainTitle", PersonId = 1, PublishedBy = clientProfile1, PublishedTime = new DateTime(2020, 7, 22) });
            context.Images.Add(new Image
                { Id = 3, ImageData = new byte[] { 5, 1, 2, 144, 1, 0, 1 }, ImageTitle = "Word", PersonId = 1, PublishedBy = clientProfile1, PublishedTime = new DateTime(2020, 7, 22) });

            context.Comments.Add(new Comment {Id = 1,CommentedOn = new DateTime(2020, 7, 22) ,ImageId = 1,PersonId = 1,Rating = 4,Text = "Text"});
            context.Comments.Add(new Comment { Id = 2, CommentedOn = new DateTime(2020, 7, 22), ImageId = 1, PersonId = 1, Rating = 3, Text = "Text2" });
            context.Comments.Add(new Comment {Id = 3,CommentedOn = new DateTime(2020, 7, 22) ,ImageId = 2, PersonId = 1, Rating = 3,Text = "Text2"});

            context.SaveChanges();
        }
    }
}