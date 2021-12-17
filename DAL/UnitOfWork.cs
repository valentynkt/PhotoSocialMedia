using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DAL.Interfaces;
using DAL.Repositories;

namespace DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        private IImageRepository imageRepository;
        private ICommentRepository commentRepository;

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        public IImageRepository ImageRepository
        {
            get
            {
                if (this.imageRepository == null)
                {
                    this.imageRepository = new ImageRepository(_context);
                }

                return imageRepository;
            }
        }        
        public ICommentRepository CommentRepository
        {
            get
            {
                if (this.commentRepository == null)
                {
                    this.commentRepository = new CommentRepository(_context);
                }

                return commentRepository;
            }
        }
        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
