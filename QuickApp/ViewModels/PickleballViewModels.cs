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

namespace QuickApp.ViewModels
{
    public class CourtViewModel
    {
        public int Id { get; set; }
        public int LocationId { get; set; }
        public LocationViewModelMinusCourts Location { get; set; }
        public int CourtNumber { get; set; }

    }
    public class CourtViewModelAddOrEdit
    {
        public int Id { get; set; }
        public int LocationId { get; set; }
        public int CourtNumber { get; set; }

    }

    public class LocationViewModelMinusCourts
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Address { get; set; }
    }
    public class LocationViewModelDisplay
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Address { get; set; }
        public ICollection<CourtViewModelAddOrEdit> Courts { get; set; }
    }

    public class PBUserViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class LessonViewModel
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
