// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

using DAL.Repositories.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DAL
{
    public interface IUnitOfWork
    {
        ICustomerRepository Customers { get; }
        IProductRepository Products { get; }
        IOrdersRepository Orders { get; }
        ICourtRepository Courts { get; }
        IUserRepository Users { get; }
        ILocationRepository Locations { get; }
        ILessonRepository Lessons { get; }
        

        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
