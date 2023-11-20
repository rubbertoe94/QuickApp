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
                .Include(o => o.OrderDetails).ThenInclude(d => d.Product)
                .AsSingleQuery()
                .OrderBy(o => o.DateCreated)
                .ToList();
        }


        public void AddOrder(Order order)
        {
             _appContext.Orders.Add(order);
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
