using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BL.DTO;
using DAL.Entities.Auth;
using AutoMapper;
using DAL.Entities;


namespace BL
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<AppUser, UserDTO>()
                .ForMember(u => u.Email, opt => opt.MapFrom(ur => ur.UserName))
                .ForMember(u => u.CommentsIds,
                    c => c.MapFrom(user => user.ClientProfile.Comments.Select(x => x.Id)))
                .ForMember(u => u.ImagesIds,
                    c => c.MapFrom(user => user.ClientProfile.Images.Select(x => x.Id)))
                .ForMember(u => u.FirstName,c=>c.MapFrom(user => user.ClientProfile.FirstName))
                .ForMember(u => u.SecondName, c => c.MapFrom(user => user.ClientProfile.SecondName))
                .ReverseMap();
            CreateMap<Image, ImageDTO>().ReverseMap();
            CreateMap<Comment, CommentDTO>().ReverseMap();
        }
    }
}
