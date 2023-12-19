
using DAL.Core;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Models
{



    public class User : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
