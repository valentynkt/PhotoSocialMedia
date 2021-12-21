using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;

namespace BL.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ICollection<int?> ImagesIds { get; set; }
        public ICollection<int?> CommentsIds { get; set; }
    }
}
