using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;

namespace BL.DTO
{
    public class UserDTO
    {
        //public int? Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string About { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
    }
}
