// =============================
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
            return Ok(_mapper.Map<IEnumerable<OrderViewModelList>>(allOrders));
        }



        // GET api/values/5
        [HttpGet("{id}")]
        public OrderViewModelList GetOrder(int id)
        {
            var order = _unitOfWork.Orders.Get(id);
            return _mapper.Map<OrderViewModelList>(order);
        }



        // POST api/values
        [HttpPost]
        public void Post([FromBody] OrderViewModelEdit value)
        {
            var order = _mapper.Map<Order>(value);
            _unitOfWork.Orders.Add(order);
            _unitOfWork.SaveChanges();

        }



        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Order value)
        {
            var order = _unitOfWork.Orders.Get(id);
            order = value;
            _unitOfWork.SaveChanges();

        }



        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var order = _unitOfWork.Orders.Get(id);
            _unitOfWork.Orders.Remove(order);
            _unitOfWork.SaveChanges();
        }
    }
}
