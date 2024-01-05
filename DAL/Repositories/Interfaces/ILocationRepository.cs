// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface ILocationRepository : IRepository<Location>
    {

        IEnumerable<Location> GetAllLocations();
        public Location GetLocationById(int id);
        public void AddLocation(Location location);
        public void UpdateLocation(Location location);

    }
}
