using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class CourtRepository : Repository<Court>, ICourtRepository
    {
        public CourtRepository(ApplicationDbContext context) : base(context)
        { }



        public IEnumerable<Court> GetAllCourts()
        {
            return _appContext.Courts
                .OrderBy(c => c.Id)
                .ToList();
        }

        public Court GetCourtById(int courtId)
        {
            return _appContext.Courts.FirstOrDefault(c => c.Id == courtId);

        }


        public void AddCourt (Court court)
        {
            if (court == null)
            {
                throw new ArgumentNullException(nameof(court));
            }

            _appContext.Courts.Add(court);
        }

        public void UpdateCourt(Court court)
        {
            _appContext.Attach(court);
            _appContext.Entry(court).State = EntityState.Modified;
        }

   


        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
