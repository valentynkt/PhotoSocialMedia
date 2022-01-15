using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Entities;

namespace DAL.Interfaces
{
    public interface IImageRepository : IRepository<Image>
    {
        Task<IEnumerable<Image>> GetAllWithDetailsAsync();

        Task<Image> GetByIdWithDetailsAsync(int id);
    }
}
