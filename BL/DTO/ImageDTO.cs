using System;
using System.Collections.Generic;
using System.Text;

namespace BL.DTO
{
    public class ImageDTO
    {
        public int Id { get; set; }
        public string ImageTitle { get; set; }
        public byte[] ImageData { get; set; }
        public int? PersonId { get; set; }
        public DateTime PublishedTime { get; set; }
    }
}
