﻿// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.ViewModels;
using QuickApp.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pickleball_Website.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;
        private readonly IEmailSender _emailSender;


        public OrderController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<OrderController> logger, IEmailSender emailSender)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailSender = emailSender;
        }



        // GET: api/values
        [HttpGet]
        public IActionResult GetAllOrders()
        {
            var allOrders = _unitOfWork.Orders.GetAllOrders();
            return Ok(_mapper.Map<IEnumerable<OrderViewModelDisplay>>(allOrders));
        }



        // GET api/values/5
        [HttpGet("{id}")]
        public OrderViewModelDisplay GetOrder(int id)
        {
            var order = _unitOfWork.Orders.GetOrderById(id);
            return _mapper.Map<OrderViewModelDisplay>(order);
        }



        // POST api/values
        [HttpPost("addOrder")]
        public async Task<ActionResult<Order>> Post([FromBody] OrderViewModelAddOrEdit value)
        {
            var order = _mapper.Map<Order>(value);

            await _unitOfWork.Orders.AddOrder(order);
            await _unitOfWork.SaveChangesAsync();
            return Ok(_mapper.Map<OrderViewModelDisplay>(order));
            
        }



        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] OrderViewModelAddOrEdit order)
        {
            



            var orderToUpdate = _unitOfWork.Orders.GetOrderById(id);

            orderToUpdate.Discount = order.Discount;
            orderToUpdate.Comments = order.Comments;
            orderToUpdate.CustomerId = order.CustomerId;
            orderToUpdate.CashierId = order.CashierId;
            orderToUpdate.ProductId = order.ProductId;

           
           

            _unitOfWork.Orders.UpdateOrder(id, orderToUpdate);
            _unitOfWork.SaveChanges();

            return Ok(_mapper.Map<OrderViewModelDisplay>(order));

        }



        // DELETE api/values/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var order = _unitOfWork.Orders.Get(id);
            _unitOfWork.Orders.Remove(order);
            _unitOfWork.SaveChanges();
            return NoContent();
        }
    }
}
