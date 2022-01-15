using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IUnitOfWork
    {
        IImageRepository ImageRepository { get; }

        ICommentRepository CommentRepository { get; }

        Task<int> SaveAsync();
    }
}
