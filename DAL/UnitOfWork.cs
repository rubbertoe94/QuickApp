// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

using DAL.Models;
using DAL.Repositories;
using DAL.Repositories.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private ICustomerRepository _customers;
        private IProductRepository _products;
        private IOrdersRepository _orders;
        private IUserRepository _users;
        private ICourtRepository _courts;
        private ILocationRepository _locations;
        private ILessonRepository _lessons;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public ICustomerRepository Customers
        {
            get
            {
                _customers ??= new CustomerRepository(_context);

                return _customers;
            }
        }

        public IProductRepository Products
        {
            get
            {
                _products ??= new ProductRepository(_context);

                return _products;
            }
        }

        public IOrdersRepository Orders
        {
            get
            {
                _orders ??= new OrdersRepository(_context);

                return _orders;
            }
        }

        public IUserRepository Users
        {
            get
            {
                _users ??= new UserRepository(_context);

                return _users;
            }
        }

        public ICourtRepository Courts
        {
            get
            {
                _courts ??= new CourtRepository(_context);

                return _courts;
            }
        }

        public ILocationRepository Locations
        {
            get
            {
                _locations ??= new LocationRepository(_context);

                return _locations;
            }
        }

        public ILessonRepository Lessons
        {
            get
            {
                _lessons ??= new LessonRepository(_context);

                return _lessons;
            }
        }


        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
