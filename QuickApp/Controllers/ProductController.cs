﻿// ======================================
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
    public class ProductController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;
        private readonly IEmailSender _emailSender;

        public ProductController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<ProductController> logger, IEmailSender emailSender)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailSender = emailSender;
        }

       

        // GET: api/values
        [HttpGet("allproducts")]
        public ActionResult<IEnumerable<ProductViewModel>> GetAllProducts()
        {
            var allProducts = _unitOfWork.Products.GetAllProducts();
            return Ok(_mapper.Map<IEnumerable<ProductViewModel>>(allProducts));
        }


        [HttpGet("throw")]
        public IEnumerable<CustomerViewModel> Throw()
        {
            throw new InvalidOperationException($"This is a test exception: {DateTime.Now}");
        }

       

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<ProductViewModel> GetProductById(int id)
        {
          var product = _unitOfWork.Products.GetProductById(id);
            return Ok(_mapper.Map<ProductViewModel>(product));
        }


        // POST api/values
        [HttpPost("addproduct")]
        public void Post([FromBody] ProductViewModel value)
        {
            var newproduct = _mapper.Map<Product>(value);
            _unitOfWork.Products.AddProduct(newproduct);
            _unitOfWork.SaveChanges();

            }

            // PUT api/values/5
            [HttpPut("{id}")]
        public void Put(int id, [FromBody] ProductViewModel product)
        {
            var productToUpdate = _unitOfWork.Products.GetProductById(id);

            if (productToUpdate != null)
            {
                try
                {
                    productToUpdate.Name = product.Name;
                    productToUpdate.Description = product.Description;
                    productToUpdate.SellingPrice = product.SellingPrice;
                    productToUpdate.ProductCategoryId = product.ProductCategoryId;

                    _unitOfWork.Products.UpdateProduct(productToUpdate);
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
            var product = _unitOfWork.Products.GetProductById(id);
            _unitOfWork.Products.Remove(product);
            _unitOfWork.SaveChanges();
            return NoContent();
        }
    }
}
