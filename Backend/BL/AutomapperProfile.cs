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
                .ForMember(u => u.FirstName,c=>c.MapFrom(user => user.ClientProfile.FirstName))
                .ForMember(u => u.SecondName, c => c.MapFrom(user => user.ClientProfile.SecondName))
                .ForMember(u=>u.About,c=>c.MapFrom(user=>user.ClientProfile.About))
                .ForMember(u=>u.Gender,c=>c.MapFrom(user=>user.ClientProfile.Gender))
                .ForMember(u=>u.DateOfRegistration,c=>c.MapFrom(user=>user.ClientProfile.DateOfRegistration))
                .ReverseMap();
            CreateMap<Image, ImageDTO>()
                .ForMember(u=>u.PublishedTime,opt=>opt.MapFrom(c=>c.PublishedTime.ToString("MM/dd/yyyy HH:mm:ss")))
                .ReverseMap();
            CreateMap<Comment, CommentDTO>().ReverseMap();
        }
    }
}
