using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Entities
{
    public class Image
    {
        [Key]
        public int Id { get; set; }
        public string ImageTitle { get; set; }
        public byte[] ImageData { get; set; }
        public int PersonId { get; set; }
        public ClientProfile PublishedBy { get; set; }
        public DateTime PublishedTime { get; set; }
    }
}
