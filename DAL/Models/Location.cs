
using DAL.Core;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Models
{



    public class Location : AuditableEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Address { get; set; }
        public ICollection<Court> Courts { get; set; }
    }
}
