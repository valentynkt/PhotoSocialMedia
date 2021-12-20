using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
        private readonly UserService _userService;

        public ImagesController(IImageService imageService, UserService userService)
        {
            _imageService = imageService;
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
                    ImageDTO imageDto = new ImageDTO() { ImageTitle = file.FileName };
                    byte[] imageData = null;
                    // считываем переданный файл в массив байтов
                    using (var binaryReader = new BinaryReader(file.OpenReadStream()))
                    {
                        imageData = binaryReader.ReadBytes((int)file.Length);
                    }
                    // установка массива байтов
                    imageDto.ImageData = imageData;
                    //var user = await _userService.GetUserAsync(HttpContext.User);

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
