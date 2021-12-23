﻿using System;
using System.Collections.Generic;
using System.Text;
using DAL.Entities.Auth;

namespace BL.DTO
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(AppUser user, string token,string role)
        {
            Id = user.Id;
            Email = user.Email;
            FirstName = user.ClientProfile.FirstName;
            SecondName = user.ClientProfile.SecondName;
            Role = role;
            Token = token;
        }
    }
}
