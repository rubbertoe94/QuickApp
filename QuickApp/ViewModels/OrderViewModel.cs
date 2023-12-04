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
    public class OrderViewModel
    {
        public int Id { get; set; }
        public decimal Discount { get; set; }
        public string Comments { get; set; }
        public int CustomerId { get; set; }
        public string CashierId { get; set; }
        public CustomerViewModel Customer { get; set; }

        public List<OrderDetailViewModel> OrderDetails { get; set; }

    }

}
