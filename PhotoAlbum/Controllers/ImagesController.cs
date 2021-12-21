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
        /*        [HttpGet]
                public ActionResult<IEnumerable<ImageDTO>> GetAll()
                {

                }*/
        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            try
            {
                if (file != null)
                {
                    ImageDTO imageDto = new ImageDTO() { ImageTitle = file.FileName,PublishedTime = DateTime.Now};
                    byte[] imageData = null;
                    // считываем переданный файл в массив байтов
                    using (var binaryReader = new BinaryReader(file.OpenReadStream()))
                    {
                        imageData = binaryReader.ReadBytes((int)file.Length);
                    }
                    // установка массива байтов
                    imageDto.ImageData = imageData;
                    //var user = await _userService.GetUserAsync(HttpContext.User);
                    var checkAuth = _httpContext.User.Identity.IsAuthenticated;
                    var userEmail = _httpContext.User.FindFirst(ClaimTypes.Name).Value;
                    var user =await _userService.GetUserByEmail(userEmail);

                    imageDto.PersonId = user.Id;
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
    }
}
