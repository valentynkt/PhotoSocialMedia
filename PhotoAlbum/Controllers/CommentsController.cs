using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BL.DTO;
using BL.Interfaces;
using BL.Services;

namespace PL.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly HttpContext _httpContext;
        public readonly UserService _userService;

        public CommentsController(ICommentService commentService,UserService userService, IHttpContextAccessor httpContextAccessor)
        {
            _commentService = commentService;
            _httpContext = httpContextAccessor.HttpContext;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IEnumerable<CommentDTO>> GetAll()
        {
            return await _commentService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<CommentDTO> GetById(int id)
        {
            return await _commentService.GetByIdAsync(id);
        }

        [HttpPut]
        public async Task<IActionResult> Update(CommentDTO commentDto)
        {
            if (commentDto == null)
            {
                return BadRequest();
            }

            try
            {
                await _commentService.Update(commentDto);
                return new EmptyResult();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _commentService.DeleteByIdAsync(id);
                return new EmptyResult();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(CommentDTO commentDto)
        {
            if (commentDto==null)
            {
                return BadRequest();
            }
            try
            {
                commentDto.CommentedOn=DateTime.Now;
                var checkAuth = _httpContext.User.Identity.IsAuthenticated;
                var userEmail = _httpContext.User.FindFirst(ClaimTypes.Name).Value;
                var user = await _userService.GetUserByEmail(userEmail);
                commentDto.PersonId = user.Id;
                await _commentService.AddAsync(commentDto);
                return CreatedAtAction(nameof(Add), new {id = commentDto.Id}, commentDto);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        /*        [HttpGet]
                public ActionResult<IEnumerable<CommentDTO>> GetAll()
                {

                }*/
    }
}
