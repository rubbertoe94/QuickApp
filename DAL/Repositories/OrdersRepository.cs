// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Microsoft.AspNetCore.Mvc;

namespace DAL.Repositories
{
    public class OrdersRepository : Repository<Order>, IOrdersRepository
    {
        public OrdersRepository(DbContext context) : base(context)
        { }

        public Order GetMostRecentOrder()
        {
            var order = _appContext.Set<Order>().OrderByDescending(o => o.DateCreated).FirstOrDefault();
            return order;
        }

        public IEnumerable<Order> GetAllOrders()
        {
            return _appContext.Orders
                .Include(o => o.Customer)
                .Include(o => o.Product)
                .AsSingleQuery()
                .OrderBy(o => o.Id)
                .ToList();
        }

        public Order GetOrderById(int id)
        {
            var order = _appContext.Orders
                .Include(o => o.Customer)
                .Include(o => o.Product)
                .FirstOrDefault(o => o.Id == id);

           

            return order;
        }


        public async Task AddOrder(Order order)
        {
            if (order == null)
            {
                throw new ArgumentNullException(nameof(order));
            }

           await _appContext.Orders.AddAsync(order);
            await _appContext.SaveChangesAsync();
        }


        public void UpdateOrder(int id, Order order)
        {
            
            _appContext.Orders.Attach(order);
            _appContext.Entry(order).State = EntityState.Modified;
        }

        public bool DoesCustomerExist(int customerId)
        {
            return _appContext.Customers.Any(c => c.Id == customerId);
        }

        public bool DoesProductExist(int productId)
        {
            return _appContext.Products.Any(p => p.Id == productId);
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
