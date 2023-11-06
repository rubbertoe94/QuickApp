using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        public CustomerRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<Customer> GetTopActiveCustomers(int count)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetAllCustomersData()
        {
            return _appContext.Customers
                .Include(c => c.Orders).ThenInclude(o => o.OrderDetails).ThenInclude(d => d.Product)
                .Include(c => c.Orders).ThenInclude(o => o.Cashier)
                .AsSingleQuery()
                .OrderBy(c => c.Name)
                .ToList();
        }

        public IEnumerable<Customer> GetAllCustomers()
        {
            return _appContext.Customers
                .Include(c => c.Orders).ThenInclude(o => o.OrderDetails).ThenInclude(d => d.Product)
                .Include(c => c.Orders).ThenInclude(o => o.Cashier)
                .OrderBy(c => c.Name)
                .ToList();
        }

        public Customer GetCustomerById(int customerId)
            {
                var customer = _appContext.Customers.FirstOrDefault(c => c.Id == customerId);

                if (customer == null)
                {
                    // Log or print a message indicating that the customer was not found
                    Console.WriteLine($"Customer with ID {customerId} not found.");
                }
                else
                {
                    // Log or print the details of the found customer
                    Console.WriteLine($"Found customer: {customer.Name}, {customer.Email}, {customer.PhoneNumber}");
                }

                return customer;
            }
        

        public void AddCustomer(Customer customer)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }

            _appContext.Customers.Add(customer);
        }

        public void UpdateCustomer(Customer customer)
        {
            _appContext.Attach(customer);
            _appContext.Entry(customer).State = EntityState.Modified;
        }

        public async Task<List<Customer>> SearchCustomersAsync(string term)
        {
            term = term.ToLower(); 

            var customers = await _appContext.Customers
                .Where(c => c.Name.ToLower().Contains(term))
                .ToListAsync();

            return customers;
        }




        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
