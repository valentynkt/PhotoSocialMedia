using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using DAL.Entities.Auth;

namespace DAL.Entities
{
    public class ClientProfile
    {
        [Key]
        [ForeignKey("AppUser")]
        public int Id { get; set; }

        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string About { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfRegistration { get; set; }
        public ICollection<Image> Images { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public virtual AppUser AppUser { get; set; }
    }
}
