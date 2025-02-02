﻿// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IOrdersRepository : IRepository<Order>
    {
        IEnumerable<Order> GetAllOrders();
        public Order GetOrderById(int id);
        public Task AddOrder(Order order);
        public void UpdateOrder(int id, Order order);
        public bool DoesCustomerExist(int customerId);
        public bool DoesProductExist(int productId);
        public IEnumerable<Order> GetOrdersPaged(int pageNumber, int pageSize, string term);
    }
}
