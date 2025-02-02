﻿// ======================================
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
    public interface ICustomerRepository : IRepository<Customer>
    {
        IEnumerable<Customer> GetTopActiveCustomers(int count);
        IEnumerable<Customer> GetAllCustomersData();
        IEnumerable<Customer> GetAllCustomers();
        public Customer GetCustomerById(int id);
        public void AddCustomer(Customer customer);
        public void UpdateCustomer(Customer customer);
        Task<List<Customer>> SearchCustomersAsync(string term);



    }
}
