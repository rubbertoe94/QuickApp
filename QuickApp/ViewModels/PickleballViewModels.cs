// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

using DAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        [Required(ErrorMessage = "LocationId is required.")]
        public int LocationId { get; set; }

        [Required(ErrorMessage = "CourtNumber is required.")]
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

    public class LessonViewModelDisplay
    {
        public int LessonId { get; set; }
        public DateTime Date { get; set; }

        public int CoachId { get; set; }
        public virtual PBUserViewModel Coach { get; set; }
        public int ParticipantId { get; set; }
        public virtual PBUserViewModel Participant { get; set; }

        public int LocationId { get; set; }
        public virtual LocationViewModelDisplay Location { get; set; }

        public int CourtId { get; set; }
        public CourtViewModel Court { get; set; }
    }

    public class LessonViewModelAddOrEdit
    {
        public int LessonId { get; set; }
        public DateTime Date { get; set; }

        public int CoachId { get; set; }
        public int ParticipantId { get; set; }

        public int LocationId { get; set; }

        public int CourtId { get; set; }
    }

}
