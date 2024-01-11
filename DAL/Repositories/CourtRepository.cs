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
                .Include(c => c.Location)
                .OrderBy(c => c.LocationId)
                .ThenBy(c => c.Id)
                .ToList();
        }

        public Court GetCourtById(int courtId)
        {
            return _appContext.Courts.FirstOrDefault(c => c.Id == courtId);

        }


        public void AddCourt(Court court)
        {
            if (court == null)
            {
                throw new ArgumentNullException(nameof(court));
            }

            // Check if a court with the same number already exists at the specified location
            var existingCourt = _appContext.Courts
                .FirstOrDefault(c => c.LocationId == court.LocationId && c.CourtNumber == court.CourtNumber);

            if (existingCourt != null)
            {
                // Throw an exception, return a specific result, or handle the duplicate court scenario appropriately
                throw new InvalidOperationException($"Court number {court.CourtNumber} already exists at the specified location.");
            }

            _appContext.Courts.Add(court);
        }

        public void UpdateCourt(Court court)
        {
            _appContext.Attach(court);
            _appContext.Entry(court).State = EntityState.Modified;
        }

        public bool DoesCourtExistAtLocation(int locationId, int courtNumber)
        {
            return _appContext.Courts.Any(c => c.LocationId == locationId && c.CourtNumber == courtNumber);
        }




        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
