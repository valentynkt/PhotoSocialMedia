using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
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
    public class ImageService : IImageService
    {

        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ImageService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ImageDTO>> GetAllAsync()
        {

            var images =await _unitOfWork.ImageRepository.GetAllWithDetailsAsync();
            var imagesModel = _mapper.Map<IEnumerable<ImageDTO>>(images);
            return imagesModel;
        }
        public async Task<IEnumerable<ImageDTO>> GetAllUsersPhotoAsync(int id)
        {
            var images = await _unitOfWork.ImageRepository.FindByConditionAsync(x=>x.PersonId==id);
            var imagesModel = _mapper.Map<IEnumerable<ImageDTO>>(images);
            return imagesModel;
        }
        public async Task<ImageDTO> GetByIdAsync(int id)
        {
            var imageById = await _unitOfWork.ImageRepository.GetByIdWithDetailsAsync(id);
            if (imageById == null)
            {
                throw new PhotoAlbumException(@"There are no book with this id: {id}");
            }
            var imageModelById = _mapper.Map<ImageDTO>(imageById);
            return imageModelById;
        }


        public async Task AddAsync(ImageDTO entity)
        {
            entity.Id = null;
            if (entity.PersonId is null || entity.ImageData is null || entity.PublishedTime == default||string.IsNullOrEmpty(entity.ImageTitle))
            {
                throw new PhotoAlbumException("Wrong image data");
            }
            var elem = _mapper.Map<Image>(entity);
            await _unitOfWork.ImageRepository.AddAsync(elem);
            entity.Id = elem.Id;
            await _unitOfWork.SaveAsync();
        }

        public async Task Update(ImageDTO entity)
        {
            if (entity.PersonId is null || entity.ImageData is null || entity.PublishedTime == default || entity.PublishedTime > DateTime.Now || string.IsNullOrEmpty(entity.ImageTitle))
            {
                throw new PhotoAlbumException("Wrong image data");
            } 
            var elem = _mapper.Map<Image>(entity);
             _unitOfWork.ImageRepository.Update(elem);
             await _unitOfWork.SaveAsync();
        }

        public async Task DeleteByIdAsync(int id)
        {
            await _unitOfWork.ImageRepository.DeleteByIdAsync(id);
            await _unitOfWork.SaveAsync();
        }

        public async Task<IEnumerable<CommentDTO>> GetImageComments(int id)
        {
            var imageById = await _unitOfWork.ImageRepository.GetByIdWithDetailsAsync(id);
            if (imageById == null)
            {
                throw new PhotoAlbumException(@"There are no book with this id: {id}");
            }

            var comments =await _unitOfWork.CommentRepository.FindByConditionAsync(x => x.ImageId == imageById.Id);
            var commentsDto = _mapper.Map<IEnumerable<CommentDTO>>(comments);
            return commentsDto;
        }
        public async Task<IEnumerable<ImageDTO>> GetImageByTitle(string title)
        {

            var images = await _unitOfWork.ImageRepository.GetAllAsync();
            var imagesByTitle = images.Where(x=> Contains(x.ImageTitle,title, StringComparison.InvariantCultureIgnoreCase)).ToList();
            var imagesModel = _mapper.Map<IEnumerable<ImageDTO>>(imagesByTitle);
            return imagesModel;
        }
        private bool Contains(string source, string value, StringComparison comparisonType)
        {
            return source?.IndexOf(value, comparisonType) >= 0;
        }
    }
}
