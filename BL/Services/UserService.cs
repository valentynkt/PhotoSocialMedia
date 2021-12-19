using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BL.DTO;
using BL.Exceptions;
using DAL.Entities.Auth;
using Microsoft.AspNetCore.Identity;

namespace BL.Services
{
    public class UserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly IMapper _mapper;

        public UserService(IMapper mapper, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<bool> SignUp(UserDTO userDto)
        {
            var user = _mapper.Map<AppUser>(userDto);
            var userCreateResult = await _userManager.CreateAsync(user, userDto.Password);
            if (userCreateResult.Succeeded)
            {
                return true;
            }

            throw new UserException(userCreateResult.Errors.First().Description);
        }

        public async Task<bool> SignIn(UserLoginResource userDto)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.UserName == userDto.Email);
            if (user is null)
            {
                throw new UserException("User not found");
            }

            var userSigninResult = await _userManager.CheckPasswordAsync(user, userDto.Password);

            if (userSigninResult)
            {
                return true;
            }

            throw new UserException("Email or password incorrect.");
        }

        public async Task<bool> CreateRole(string roleName)
        {
            if (string.IsNullOrWhiteSpace(roleName))
            {
                throw new RoleException("Role name should be provided.");
            }

            var newRole = new AppRole()
            {
                Name = roleName
            };

            var roleResult = await _roleManager.CreateAsync(newRole);

            if (roleResult.Succeeded)
            {
                return true;
            }

            throw new RoleException(roleResult.Errors.First().Description);
        }

        public async Task<bool> AddUserToRole(string userEmail, string roleName)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.UserName == userEmail);
            if (user is null)
            {
                throw new UserException("User not found");
            }

            var result = await _userManager.AddToRoleAsync(user, roleName);

            if (result.Succeeded)
            {
                return true;
            }

            throw new RoleException(result.Errors.First().Description);
        }
    }
}
