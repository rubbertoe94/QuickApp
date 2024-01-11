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
    public interface ICourtRepository : IRepository<Court>
    {
      
        IEnumerable<Court> GetAllCourts();
        public Court GetCourtById(int id);
        public void AddCourt(Court court);
        public void UpdateCourt(Court court);
        bool DoesCourtExistAtLocation(int locationId, int courtNumber);

    }
}
