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
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface ILessonRepository : IRepository<Lesson>
    {

        IEnumerable<Lesson> GetAllLessons();
        public Lesson GetLessonById(int id);
        public void AddLesson(Lesson lesson);
        public void UpdateLesson(Lesson lesson);

    }
}
