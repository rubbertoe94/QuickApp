using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class LocationRepository : Repository<Location>, ILocationRepository
    {
        public LocationRepository(ApplicationDbContext context) : base(context)
        { }



        public IEnumerable<Location> GetAllLocation()
        {
            return _appContext.Locations
                .OrderBy(c => c.Id)
                .ToList();
        }

        public Location GetLocationById(int Id)
        {
            return _appContext.Locations.FirstOrDefault(c => c.Id == Id);

        }


        public void AddLocation(Location location)
        {
            if (location == null)
            {
                throw new ArgumentNullException(nameof(location));
            }

            _appContext.Locations.Add(location);
        }

        public void UpdateLocation(Location location)
        {
            _appContext.Attach(location);
            _appContext.Entry(location).State = EntityState.Modified;
        }




        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
