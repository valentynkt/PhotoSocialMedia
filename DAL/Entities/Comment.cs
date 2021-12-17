using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Entities
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        public int ImageId { get; set; }
        //public Image Image { get; set; }
        public int PersonId { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
        public DateTime CommentedOn { get; set; }
    }
}
