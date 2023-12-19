
using DAL.Core;
using System;
using System.Collections.Generic;
using System.Linq;


namespace DAL.Models
{



    public class Lesson : AuditableEntity
    {
        public int LessonId { get; set; }
        public DateTime Date { get; set; }

        public int CoachId { get; set; }
        public virtual User Coach { get; set; }

        public int LocationId { get; set; }
        public virtual Location Location { get; set; }

        public int CourtId { get; set; }
        public Court Court { get; set; }
    }
}
