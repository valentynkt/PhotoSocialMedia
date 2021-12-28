using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace BL.DTO
{
    public class UploadPhotoModel
    {
        public IFormFile File { get; set; }
        public string publisherEmail {get; set; }
    }
}
