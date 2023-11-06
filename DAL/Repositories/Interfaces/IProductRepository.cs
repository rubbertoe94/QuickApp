// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories.Interfaces
{
    public interface IProductRepository : IRepository<Product>
    {
        public IEnumerable<Product> GetAllProducts();
        public Product GetProductById(int id);
        public void AddProduct(Product product);
        public void UpdateProduct(Product product);
    }
}
