using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entities;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly AppDbContext _context;

        public CommentRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddAsync(Comment entity)
        {
            await _context.Comments.AddAsync(entity);
        }

        public void Delete(Comment entity)
        {
            _context.Comments.Update(entity);
        }

        public async Task DeleteByIdAsync(int id)
        {
            var item = await _context.Comments.Where(x =>
                    x.Id == id)
                .FirstOrDefaultAsync();
            if (item != null)
            {
                _context.Comments.Remove(item);
            }
        }

        public async Task<IEnumerable<Comment>> FindByConditionAsync(Expression<Func<Comment, bool>> expression)
        {
            return await _context.Comments.Where(expression).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<Comment>> GetAllAsync()
        {
            return await _context.Comments.AsNoTracking().ToListAsync();
        }

        public async Task<Comment> GetByIdAsync(int id)
        {
            return await _context.Comments.Where(x => x.Id == id).AsNoTracking().FirstOrDefaultAsync();
        }

        public void Update(Comment entity)
        {
            _context.Comments.Update(entity);
        }
    }
}
