
using DAL.Core;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Models
{



    public class Court : AuditableEntity
    {
        public int Id { get; set; }
        public int LocationId { get; set; }
        public int CourtNumber { get; set; }

        
    }
}
