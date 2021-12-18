using System;
using System.Collections.Generic;
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
            CreateMap<UserDTO, AppUser>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(ur => ur.Email))
                .ReverseMap();
            CreateMap<ImageDTO, Image>().ReverseMap();
            CreateMap<CommentDTO, Comment>().ReverseMap();
        }
    }
}
