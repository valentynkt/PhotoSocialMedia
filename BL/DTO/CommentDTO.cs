using System;
using System.Collections.Generic;
using System.Text;

namespace BL.DTO
{
    public class CommentDTO
    {
        public int Id { get; set; }

        public int? ImageId { get; set; }
        public int? PersonId { get; set; }
        public string Text { get; set; }
        public int? Rating { get; set; }
        public DateTime CommentedOn { get; set; }
    }
}
