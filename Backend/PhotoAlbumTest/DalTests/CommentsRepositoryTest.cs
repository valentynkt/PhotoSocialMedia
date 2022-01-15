using NUnit.Framework;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DAL.Entities;
using DAL.Repositories;

namespace PhotoAlbumTest.DalTests
{
    [TestFixture]
    public class CommentsRepositoryTest
    {
        [Test]
        public async Task CommentRepository_GetAll_ReturnsAllValues()
        {

            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var repository = new CommentRepository(context);

                var elements = await repository.GetAllAsync();

                Assert.AreEqual(3, elements.Count());
            }
        }
        [Test]
        public async Task CommentRepository_GetById_ReturnsSingleValue()
        {
            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var repository = new CommentRepository(context);

                var element = await repository.GetByIdAsync(1);

                Assert.AreEqual(1, element.Id);
                Assert.AreEqual("Text", element.Text);
                Assert.AreEqual(1,element.ImageId);
                Assert.AreEqual(1, element.PersonId);
                Assert.AreEqual(4, element.Rating);
                Assert.AreEqual(new DateTime(2020, 7, 22), element.CommentedOn);
            }
        }
        [Test]
        public async Task CommentRepository_AddAsync_AddsValueToDatabase()
        {
            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var repository = new CommentRepository(context);
                var actual1 = context.Comments.Count();
                var element = new Comment() { Id = 4 };

                await repository.AddAsync(element);
                await context.SaveChangesAsync();
                var actual = context.Comments.Count();
                Assert.AreEqual(4, actual);
            }
        }
        [Test]
        public async Task CommentRepository_DeleteByIdAsync_DeletesEntity()
        {
            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var repository = new CommentRepository(context);

                await repository.DeleteByIdAsync(1);
                await context.SaveChangesAsync();

                Assert.AreEqual(2, context.Comments.Count());
            }
        }
        [Test]
        public async Task CommentRepository_DeleteAsync_DeletesEntity()
        {
            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var repository = new CommentRepository(context);
                var actual1 = context.Comments.Count();
                var element = new Comment() { Id = 1 };
                repository.Delete(element);
                await context.SaveChangesAsync();
                var actual2 = context.Comments.Count();

                Assert.AreEqual(2, context.Comments.Count());
            }
        }

        [Test]
        public async Task CommentRepository_Update_UpdatesEntity()
        {
            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var repository = new CommentRepository(context);

                var element = new Comment() { Id = 1, Text = "NewText" };

                repository.Update(element);
                await context.SaveChangesAsync();

                Assert.AreEqual("NewText", element.Text);
            }
        }

        [Test]
        public async Task CommentRepository_FindByConditionAsync_ReturnsWithIncludedEntities()
        {
            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var repository = new CommentRepository(context);
                var element = await repository.FindByConditionAsync(x => x.Text == "Text");

                Assert.AreEqual(1, element.ToList()[0].Id);
            }
        }
    }
}
