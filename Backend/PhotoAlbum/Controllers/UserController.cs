using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BL.DTO;
using BL.Exceptions;
using BL.Services;

namespace PL.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly HttpContext _httpContext;
        public UserController(UserService userService, IHttpContextAccessor httpContextAccessor)
        {
            _userService = userService;
            _httpContext = httpContextAccessor.HttpContext;
        }

        [HttpGet]
        public async Task<IEnumerable<AuthenticateResponse>> GetAllUsers()
        {
            return await _userService.GetAllUsers();
            }
        [HttpGet("{id}")]
        public async Task<AuthenticateResponse> GetUserById(int id)
        {
            try
            {
                return await _userService.GetUserById(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        [HttpGet("byemail/{email}")]
        public async Task<AuthenticateResponse> GetUserByEmail(string email)
        {
            try
            {
                return await _userService.GetUserByEmail(email);
            }
            catch (Exception)
            {
                return null;
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser(UserDTO userDto)
        {
            if (userDto == null)
            {
                return BadRequest();
            }

            try
            {
                var response = await _userService.UpdateUser(userDto);
                return Ok(response);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserById(int id)
        {
            try
            {
                await _userService.DeleteUserById(id);
                return new EmptyResult();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpDelete("byemail/{email}")]
        public async Task<IActionResult> DeleteUserByEmail(string email)
        {
            try
            {
                await _userService.DeleteUserByEmail(email);
                return new EmptyResult();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(UserDTO userDto)
        {
            try
            {
                userDto.DateOfRegistration=DateTime.Now;
                await _userService.SignUp(userDto);
               return CreatedAtAction(nameof(SignUp),new{email= userDto.Email},userDto);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn(UserLoginResource userDto)
        {
            try
            {
                var response=await _userService.SignIn(userDto);
                return Ok(response);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("signout")]
        public async Task<IActionResult> SignOut()
        {
            try
            {
                await _userService.SignOut();
                var checkAuth = _httpContext.User.Identity.IsAuthenticated;
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("roles/{roleName}")]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            try
            {
                await _userService.CreateRole(roleName);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("addRole/{roleName}")]
        public async Task<IActionResult> AddUserToRole([FromBody] string userEmail, string roleName)
        {
            try
            {
                await _userService.AddUserToRole(userEmail,roleName);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("roles")]
        public async Task<IActionResult> GetUserRole([FromBody]string email)
        {
            try
            {
                await _userService.GetUserRoles(email);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("images")]
        public async Task<IEnumerable<ImageDTO>> GetUserImages([FromBody] string email)
        {
            try
            {
                return await _userService.GetUserImages(email);
            }
            catch (Exception)
            {
                return null;
            }
        }
        [HttpGet("comments")]
        public async Task<IEnumerable<CommentDTO>> GetUserComments([FromBody] string email)
        {
            try
            {
                return await _userService.GetUserComments(email);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
