using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BL.DTO;
using BL.Exceptions;
using BL.Interfaces;
using DAL.Entities;
using DAL.Interfaces;

namespace BL.Services
{
    public class CommentService : ICommentService
    {

        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserService _userService;

        public CommentService(IUnitOfWork unitOfWork, IMapper mapper,UserService userService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userService = userService;
        }

        public async Task<IEnumerable<CommentDTO>> GetAllAsync()
        {
            var comments = await _unitOfWork.CommentRepository.GetAllAsync();
            var commentsModel = _mapper.Map<IEnumerable<CommentDTO>>(comments);
            return commentsModel;
        }
        public async Task<IEnumerable<CommentsDisplayDTO>> GetAllWithDetailsAsync()
        {
            var comments = await _unitOfWork.CommentRepository.GetAllAsync();
            var commentsModel = _mapper.Map<IEnumerable<CommentDTO>>(comments);
            var commentsDisplay = new List<CommentsDisplayDTO>();
            foreach (var comment in commentsModel)
            {
                var user = await _userService.GetUserById(comment.PersonId);
                var commentDto = new CommentsDisplayDTO(comment, user);
                commentsDisplay.Add(commentDto);
            }
            return commentsDisplay;
        }
        public async Task<IEnumerable<CommentDTO>> GetAllUsersCommentsAsync(int id)
        {
            var comments = await _unitOfWork.CommentRepository.FindByConditionAsync(x => x.PersonId == id);
            var commentsModel = _mapper.Map<IEnumerable<CommentDTO>>(comments);
            return commentsModel;
        }
        public async Task<CommentDTO> GetByIdAsync(int id)
        {
            var commentById = await _unitOfWork.CommentRepository.GetByIdAsync(id);
            if (commentById == null)
            {
                throw new PhotoAlbumException(@"There are no comment with this id: {id}");
            }
            var commentModelById = _mapper.Map<CommentDTO>(commentById);
            return commentModelById;
        }


        public async Task AddAsync(CommentDTO entity)
        {
            if (entity.PersonId == default || entity.ImageId == default || entity.CommentedOn == default || entity.CommentedOn > DateTime.Now)
            {
                throw new PhotoAlbumException("Wrong comment data");
            }
            var elem = _mapper.Map<Comment>(entity);
            await _unitOfWork.CommentRepository.AddAsync(elem);
            entity.Id = elem.Id;
            await _unitOfWork.SaveAsync();
        }

        public async Task Update(CommentDTO entity)
        {
            if (string.IsNullOrEmpty(entity.Text))
            {
                throw new PhotoAlbumException("Wrong comment data");
            }
            var elem = _mapper.Map<Comment>(entity);
            _unitOfWork.CommentRepository.Update(elem);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteByIdAsync(int id)
        {
            await _unitOfWork.CommentRepository.DeleteByIdAsync(id);
            await _unitOfWork.SaveAsync();
        }
    }
}
