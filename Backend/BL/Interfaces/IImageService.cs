using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BL.DTO;
using DAL.Entities;

namespace BL.Interfaces
{
    public interface IImageService : IService<ImageDTO>
    {
        Task<IEnumerable<CommentDTO>> GetImageComments(int id);
        Task<IEnumerable<ImageDTO>> GetImageByTitle(string title);
        Task<IEnumerable<ImageDTO>> GetAllUsersPhotoAsync(int id);
        Task<IEnumerable<ImageDTO>> GetUserImageByTitle(int id, string title);
    }
}
