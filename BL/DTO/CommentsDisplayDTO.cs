using System;
using System.Collections.Generic;
using System.Text;
using DAL.Entities.Auth;

namespace BL.DTO
{
    public class CommentsDisplayDTO
    {
        public int Id { get; set; }

        public int ImageId { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
        public string CommentedOn { get; set; }
        public int PersonId { get; set; }
        public string PersonFullName { get; set; }

        public CommentsDisplayDTO(CommentDTO comment,AuthenticateResponse user)
        {
            Id = comment.Id;
            ImageId = comment.ImageId;
            Text = comment.Text;
            Rating = comment.Rating;
            CommentedOn = comment.CommentedOn.ToString("MM/dd/yyyy HH:mm:ss");
            PersonId = comment.PersonId;
            PersonFullName = user.FirstName+ " " + user.SecondName;
        }
    }
}
