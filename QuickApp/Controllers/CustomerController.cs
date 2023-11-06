// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Helpers;
using QuickApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;
        private readonly IEmailSender _emailSender;

        public CustomerController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<CustomerController> logger, IEmailSender emailSender)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailSender = emailSender;
        }

        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            var allCustomers = _unitOfWork.Customers.GetAllCustomersData();
            return Ok(_mapper.Map<IEnumerable<CustomerViewModel>>(allCustomers));
        }

        // GET: api/values
        [HttpGet("allcustomers")]
        public ActionResult<IEnumerable<CustomerViewModel>> GetAllCustomers()
        {
            var allCustomers = _unitOfWork.Customers.GetAllCustomers();
            return Ok(_mapper.Map<IEnumerable<CustomerViewModel>>(allCustomers));
        }

        [HttpGet("throw")]
        public IEnumerable<CustomerViewModel> Throw()
        {
            throw new InvalidOperationException($"This is a test exception: {DateTime.Now}");
        }

        [HttpGet("email")]
        public async Task<string> Email()
        {
            var recipientName = "QickApp Tester"; //         <===== Put the recipient's name here
            var recipientEmail = "test@ebenmonney.com"; //   <===== Put the recipient's email here

            var message = EmailTemplates.GetTestEmail(recipientName, DateTime.UtcNow);

            (var success, var errorMsg) = await _emailSender.SendEmailAsync(recipientName, recipientEmail, "Test Email from QuickApp", message);

            if (success)
                return "Success";

            return $"Error: {errorMsg}";
        }


        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<CustomerViewModel> GetCustomerById(int id)
        {
           var customer = _unitOfWork.Customers.GetCustomerById(id);
            return Ok(_mapper.Map<CustomerViewModel>(customer));
        }


        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Customer>>> SearchCustomers([FromQuery] string term)
        {

            if (string.IsNullOrWhiteSpace(term))
            {
                return Ok(new List<Customer>());
            }

            var customers = await _unitOfWork.Customers.SearchCustomersAsync(term);
            return Ok(customers);
        }



        // POST api/values
        [HttpPost("addcustomer")]
        public void Post([FromBody] CustomerViewModel value)
        {
            var newcustomer = _mapper.Map<Customer>(value);
            _unitOfWork.Customers.AddCustomer(newcustomer);
            _unitOfWork.SaveChanges();
        }


        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] CustomerViewModel customer)
        {
            var customerToUpdate = _unitOfWork.Customers.GetCustomerById(id);

            if (customerToUpdate != null)
            {
                try
                {
                    customerToUpdate.Name = customer.Name;
                    customerToUpdate.Address = customer.Address;
                    customerToUpdate.City = customer.City;
                    customerToUpdate.Email = customer.Email;
                    customerToUpdate.PhoneNumber = customer.PhoneNumber;

                    _unitOfWork.Customers.UpdateCustomer(customerToUpdate);
                    _unitOfWork.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred: {ex.Message}");   
                }
            }

        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var customer = _unitOfWork.Customers.Get(id);
            _unitOfWork.Customers.Remove(customer);
            _unitOfWork.SaveChanges();
            return NoContent();
        }
    }
}
