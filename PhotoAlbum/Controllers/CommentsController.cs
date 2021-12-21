using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL.DTO;
using BL.Interfaces;

namespace PL.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
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
