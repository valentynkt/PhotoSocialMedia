using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace BL.DTO
{
    public class ImageDTO
    {
        public int Id { get; set; }
        public string ImageTitle { get; set; }
        public byte[] ImageData { get; set; }
        public int? PersonId { get; set; }
        public string Email { get; set; }
        public string PublishedTime { get; set; }

        public ImageDTO()
        {

        }

        public ImageDTO(IFormFile file,int? personId)
        {
            ImageTitle = file.FileName;
            PublishedTime = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss");
            byte[] imageData = null;
            using (var binaryReader = new BinaryReader(file.OpenReadStream()))
            {
                imageData = binaryReader.ReadBytes((int)file.Length);
            }
            ImageData = imageData;
            PersonId = personId;
        }
    }
}
