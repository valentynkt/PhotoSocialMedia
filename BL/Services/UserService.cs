using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BL.DTO;
using BL.Exceptions;
using BL.Interfaces;
using BL.Settings;
using DAL.Entities.Auth;
using DAL.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace BL.Services
{
    public class UserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly IMapper _mapper;
        private readonly JwtSettings _jwtSettings;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IMapper mapper, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, IOptionsSnapshot<JwtSettings> jwtSettings, SignInManager<AppUser> signInManager,IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _jwtSettings = jwtSettings.Value;
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> SignUp(UserDTO userDto)
        {
            var user = _mapper.Map<AppUser>(userDto);
            var userCreateResult = await _userManager.CreateAsync(user, userDto.Password);
            if (userCreateResult.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "USER");
                return true;
            }

            throw new UserException(userCreateResult.Errors.First().Description);
        }

        public async Task<AuthenticateResponse> SignIn(UserLoginResource userDto)
        {
            var user = await _userManager.Users.Include(x=>x.ClientProfile).SingleOrDefaultAsync(u => u.UserName == userDto.Email);
            if (user is null)
            {
                throw new UserException("User not found");
            }

            var userSigninResult = await _signInManager.PasswordSignInAsync(user.UserName, userDto.Password, userDto.RememberMe, false);
            
            if (userSigninResult.Succeeded)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var token = GenerateJwt(user, roles);
                return new AuthenticateResponse(user,token,roles.FirstOrDefault());
            }

            throw new UserException("Email or password incorrect.");
        }

        public async Task SignOut()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<AuthenticateResponse> UpdateUser(UserDTO newUserDto)
        {
            var user = await _userManager.Users.Include(x => x.ClientProfile).SingleOrDefaultAsync(u => u.UserName == newUserDto.Email);
            if (user is null)
            {
                throw new UserException("User not found");
            }

            user.ClientProfile.FirstName = newUserDto.FirstName;
            user.ClientProfile.SecondName = newUserDto.SecondName;
            user.ClientProfile.About = newUserDto.About;
            user.ClientProfile.Gender = newUserDto.Gender;
            if (!string.IsNullOrEmpty(newUserDto.Password))
            {
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, newUserDto.Password);
            }
            await _userManager.UpdateAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var token = GenerateJwt(user, roles);
            return new AuthenticateResponse(user, token, roles.FirstOrDefault());
        }

        public async Task DeleteUserById(int id)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.Id == id);
            if (user is null)
            {
                throw new UserException("User not found");
            }

            await _userManager.DeleteAsync(user);
        }

        public async Task DeleteUserByEmail(string email)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.UserName == email);
            if (user is null)
            {
                throw new UserException("User not found");
            }

            await _userManager.DeleteAsync(user);
        }

        public async Task<IEnumerable<UserDTO>> GetAllUsers()
        {
            var users = await _userManager.Users.Include(x => x.ClientProfile).ToListAsync();
            var userListDto = _mapper.Map<IEnumerable<UserDTO>>(users);
            return userListDto;
        }

        public async Task<UserDTO> GetUserByEmail(string email)
        {
            var user = await _userManager.Users.Include(x => x.ClientProfile).SingleOrDefaultAsync(u => u.UserName == email);
            if (user is null)
            {
                throw new UserException("User not found");
            }

            var userDto = _mapper.Map<UserDTO>(user);
            return userDto;
        }
        public async Task<UserDTO> GetUserById(int id)
        {
            var user = await _userManager.Users.Include(x => x.ClientProfile).SingleOrDefaultAsync(u => u.Id==id);
            if (user is null)
            {
                throw new UserException("User not found");
            }

            var userDto = _mapper.Map<UserDTO>(user);
            return userDto;
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
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.UserName == userEmail);
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

        public async Task<IEnumerable<string>> GetUserRoles(string email)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.UserName == email);
            if (user is null)
            {
                throw new UserException("User not found");
            }
            var roles = await _userManager.GetRolesAsync(user);
            return roles;
        }

        public async Task<IEnumerable<ImageDTO>> GetUserImages(string email)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.UserName == email);
            if (user is null)
            {
                throw new UserException("User not found");
            }

            var images = await _unitOfWork.ImageRepository.FindByConditionAsync(x => x.PersonId==user.Id);
            var userImagesDTO = _mapper.Map<IEnumerable<ImageDTO>>(images);
            return userImagesDTO;
        }
        public async Task<IEnumerable<CommentDTO>> GetUserComments(string email)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.UserName == email);
            if (user is null)
            {
                throw new UserException("User not found");
            }

            var comments = await _unitOfWork.CommentRepository.FindByConditionAsync(x=> x.PersonId==user.Id);
            var userCommentsDTO = _mapper.Map<IEnumerable<CommentDTO>>(comments);
            return userCommentsDTO;
        }
        public string GenerateJwt(AppUser user, IList<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r));
            claims.AddRange(roleClaims);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_jwtSettings.ExpirationInDays));

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Issuer,
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
