// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(DbContext context) : base(context)
        { }

        public IEnumerable<Product> GetAllProducts()
        {
            return _appContext.Products
                .OrderBy(p => p.Name) 
                .ToList();
        }

        public void AddProduct(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }

            _appContext.Products.Add(product);
        }

        public Product GetProductById(int productId)
        {
            var product = _appContext.Products.FirstOrDefault(p => p.Id == productId);
            if (product == null)
            {
                Console.WriteLine($"Product with ID {productId} was not found");
            } else
            {
                Console.WriteLine($"Found product: {product.Name}");
            }
            return product;
        }

        public void UpdateProduct(Product product)
        {
            _appContext.Attach(product);
            _appContext.Entry(product).State = EntityState.Modified;
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
