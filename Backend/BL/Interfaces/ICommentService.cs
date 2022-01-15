using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BL.DTO;
using DAL.Entities;

namespace BL.Interfaces
{
    public interface ICommentService : IService<CommentDTO>
    {
        Task<IEnumerable<CommentsDisplayDTO>> GetAllWithDetailsAsync();
        Task<IEnumerable<CommentDTO>> GetAllUsersCommentsAsync(int id);
    }
}
