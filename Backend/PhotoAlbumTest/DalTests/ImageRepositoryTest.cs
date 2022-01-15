using NUnit.Framework;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DAL.Entities;
using DAL.Interfaces;
using DAL.Repositories;
using Moq;

namespace PhotoAlbumTest.DalTests
{
    [TestFixture]
    public class ImageRepositoryTest
    {
        [Test]
        public async Task ImageRepository_GetAll_ReturnsAllValues()
        {

            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var repository = new ImageRepository(context);

                var elements = await repository.GetAllAsync();

                Assert.AreEqual(3, elements.Count());
            }
        }
        [Test]
        public async Task ImageRepository_GetById_ReturnsSingleValue()
        {
            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var repository = new ImageRepository(context);

                var element = await repository.GetByIdAsync(1);

                Assert.AreEqual(1, element.Id);
                Assert.AreEqual("SomeTitle", element.ImageTitle);
                Assert.AreEqual(new byte[] { 1, 5, 1, 7, 1, 0, 1 }, element.ImageData);
                Assert.AreEqual(1,element.PersonId);
                Assert.AreEqual(new DateTime(2020, 7, 22), element.PublishedTime);
            }
        }
        [Test]
        public async Task ImageRepository_AddAsync_AddsValueToDatabase()
        {
            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var repository = new ImageRepository(context);
                var element = new Image() {Id = 4};

                await repository.AddAsync(element);
                await context.SaveChangesAsync();
                Assert.AreEqual(4, context.Images.Count());
            }
        }
        [Test]
        public async Task ImageRepository_DeleteByIdAsync_DeletesEntity()
        {
            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var repository = new ImageRepository(context);

                await repository.DeleteByIdAsync(1);
                await context.SaveChangesAsync();

                Assert.AreEqual(2,context.Images.Count());
            }
        }
        [Test]
        public async Task ImageRepository_DeleteAsync_DeletesEntity()
        {
            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var repository = new ImageRepository(context);
                var element = new Image() {Id = 1};
                repository.Delete(element);
                await context.SaveChangesAsync();

                Assert.AreEqual(2, context.Images.Count());
            }
        }

        [Test]
        public async Task ImageRepository_Update_UpdatesEntity()
        {
            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var repository = new ImageRepository(context);

                var element = new Image() { Id = 1, ImageData = new byte[] { 1, 5, 1, 7, 24, 0, 1 }, ImageTitle = "SomeTitle2", PersonId = 1, PublishedTime = new DateTime(2020, 7, 24) };

                repository.Update(element);
                await context.SaveChangesAsync();

                Assert.AreEqual("SomeTitle2", element.ImageTitle);
            }
        }

        [Test]
        public async Task ImageRepository_GetByIdWithDetailsAsync_ReturnsWithIncludedEntities()
        {
            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var expectedUserFirstName = "Valentyn";
                var repository = new ImageRepository(context);
                var elementWithIncludes = await repository.GetByIdWithDetailsAsync(1);

                var actual = elementWithIncludes.PublishedBy.FirstName;

                Assert.AreEqual(expectedUserFirstName, actual);
            }
        }
        [Test]
        public async Task ImageRepository_GetAllWithDetailsAsync_ReturnsWithIncludedEntities()
        {
            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var expectedUserFirstName = "Valentyn";
                var repository = new ImageRepository(context);
                var elementWithIncludes = await repository.GetAllWithDetailsAsync();

                var actual = elementWithIncludes.ToList()[0].PublishedBy.FirstName;

                Assert.AreEqual(expectedUserFirstName, actual);
            }
        }
        [Test]
        public async Task ImageRepository_FindByConditionAsync_ReturnsWithIncludedEntities()
        {
            using (var context = new AppDbContext(UnitTestHelper.GetUnitTestDbOptions()))
            {
                var repository = new ImageRepository(context);
                var element = await repository.FindByConditionAsync(x=>x.ImageTitle== "SomeTitle");

                Assert.AreEqual(1, element.ToList()[0].Id);
            }
        }
    }
}
