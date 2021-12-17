using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace DAL.Entities.Auth
{
    public class AppUser : IdentityUser<int>
    {
        public virtual ClientProfile ClientProfile { get; set; }
    }
}
