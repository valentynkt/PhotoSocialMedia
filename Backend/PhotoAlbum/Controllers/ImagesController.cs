using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BL.DTO;
using BL.Interfaces;
using BL.Services;
using Microsoft.AspNetCore.Authorization;

namespace PL.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageService _imageService;
        private readonly HttpContext _httpContext;
        public readonly UserService _userService;
       // private readonly string _currentUserEmail;

        public ImagesController(IImageService imageService,UserService userService,IHttpContextAccessor httpContextAccessor)
        {
            _imageService = imageService;
            _httpContext = httpContextAccessor.HttpContext;
            _userService = userService;
        }
        [HttpGet]
        public async Task<IEnumerable<ImageDTO>> GetAll()
        {
            var images = await _imageService.GetAllAsync();
            return images;
        }

        [HttpGet("{id}")]
        public async Task<ImageDTO> GetById(int id)
        {
            return await _imageService.GetByIdAsync(id);
        }

        [HttpPut]
        public async Task<IActionResult> Update(ImageDTO imageDto)
        {
            if (imageDto == null)
            {
                return BadRequest();
            }

            try
            {
                await _imageService.Update(imageDto);
                return new EmptyResult();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _imageService.DeleteByIdAsync(id);
                return new EmptyResult();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPost("{email}")]
        public async Task<IActionResult> Upload([FromForm]IFormFile formFile,string email)
        {
            try
            {
                if (formFile != null && !string.IsNullOrEmpty(email))
                {
                    var user = await _userService.GetUserByEmail(email);
                    ImageDTO imageDto = new ImageDTO(formFile, user.Id);
                    await _imageService.AddAsync(imageDto);
                    return CreatedAtAction(nameof(Upload), new { id = imageDto.Id }, imageDto);
                }

                throw new ArgumentNullException("Argument null exception");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("bytitle/{title}")]
        public async Task<IEnumerable<ImageDTO>> GetImageByTitle(string title)
        {
            var images = await _imageService.GetImageByTitle(title);
                return images;
        }

        [HttpGet("{id}/comments")]
        public async Task<IEnumerable<CommentDTO>> GetImageComments(int id)
        {
            var images = await _imageService.GetImageComments(id);
               return images;
        }

        [HttpGet("userphotos/{id}")]
        public async Task<IEnumerable<ImageDTO>> GetAllUsersPhoto(int id)
        {
            var images = await _imageService.GetAllUsersPhotoAsync(id);
            return images;
        }
        [HttpGet("userphotos/{id}/{title}")]
        public async Task<IEnumerable<ImageDTO>> GetAllUsersPhotoByTitle(int id,string title)
        {
            var images = await _imageService.GetUserImageByTitle(id,title);
            return images;
        }
    }
}
