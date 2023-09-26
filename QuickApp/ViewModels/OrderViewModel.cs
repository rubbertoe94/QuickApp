// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using QuickApp.ViewModels;
using System;
using System.Linq;


namespace QuickApp.ViewModels
{
    public class OrderViewModelEdit
    {
        public int Id { get; set; }
        public decimal Discount { get; set; }
        public string Comments { get; set; }
        public int CustomerId { get; set; }
        public string CashierId { get; set; }

    }

    public class OrderViewModelList
    {
        public int Id { get; set; }
        public decimal Discount { get; set; }
        public string Comments { get; set; }
        public int CustomerId { get; set; }
        public string CashierId { get; set; }
        public CustomerViewModel Customer { get; set; }

    }
}
