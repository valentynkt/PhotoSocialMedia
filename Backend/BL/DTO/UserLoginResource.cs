using System;
using System.Collections.Generic;
using System.Text;

namespace BL.DTO
{
    public class UserLoginResource
    {
        public string Email { get; set; }

        public string Password { get; set; }
        public bool RememberMe { get; set; }

    }
}
