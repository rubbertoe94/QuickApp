// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using DAL.Models;
using QuickApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;


namespace QuickApp.ViewModels
{
    public class OrderDetailViewModel
    {
        public int OrderId { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public ProductViewModel Product { get; set; }

    }
}