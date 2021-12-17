using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using DAL.Entities;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class ImageRepository : IImageRepository
    {
        private readonly AppDbContext _context;

        public ImageRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Image>> GetAllAsync()
        {
            return await _context.Images.AsNoTracking().ToListAsync();
        }

        public async Task<Image> GetByIdAsync(int id)
        {
            return await _context.Images.Where(x => x.Id == id).AsNoTracking().FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Image>> FindByConditionAsync(Expression<Func<Image, bool>> expression)
        {
            return await _context.Images.Where(expression).AsNoTracking().ToListAsync();
        }

        public async Task AddAsync(Image entity)
        {
            await _context.Images.AddAsync(entity);
        }

        public void Update(Image entity)
        {
            _context.Images.Update(entity);
        }

        public void Delete(Image entity)
        {
            if (entity != null)
            {
                _context.Images.Remove(entity);
            }
        }

        public async Task DeleteByIdAsync(int id)
        {
            var item = await _context.Images.Where(x =>
                    x.Id == id)
                .FirstOrDefaultAsync();
            if (item != null)
            {
                _context.Images.Remove(item);
            }
        }

        public async Task<IEnumerable<Image>> GetAllWithDetailsAsync()
        {
            return await _context.Images.Include(x=>x.PublishedBy).AsNoTracking().ToListAsync();

        }

        public async Task<Image> GetByIdWithDetailsAsync(int id)
        {
            return await _context.Images.Where(x => x.Id == id).Include(x=>x.PublishedBy).AsNoTracking().FirstOrDefaultAsync();
        }
    }
}
