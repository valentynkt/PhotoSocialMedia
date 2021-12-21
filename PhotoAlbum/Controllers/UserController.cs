using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<IEnumerable<UserDTO>> GetAllUsers()
        {
            try
            {
                return await _userService.GetAllUsers();
            }
            catch (Exception e)
            {
                return null;
            }
        }
        [HttpGet("{id}")]
        public async Task<UserDTO> GetUserById(int id)
        {
            try
            {
                return await _userService.GetUserById(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpGet("byemail/{email}")]
        public async Task<UserDTO> GetUserByEmail(string email)
        {
            try
            {
                return await _userService.GetUserByEmail(email);
            }
            catch (Exception e)
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
                await _userService.UpdateUser(userDto);
                return new EmptyResult();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(UserDTO userDto)
        {
            try
            {
               await _userService.SignUp(userDto);
               return Created(string.Empty, string.Empty);
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
                var jwtString=await _userService.SignIn(userDto);
                var checkAuth = _httpContext.User.Identity.IsAuthenticated;
                return Ok(jwtString);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("roles")]
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
        [HttpPost("User/{userEmail}/Role")]
        public async Task<IActionResult> AddUserToRole(string userEmail, [FromBody] string roleName)
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
    }
}
