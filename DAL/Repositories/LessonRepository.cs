using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class LessonRepository : Repository<Lesson>, ILessonRepository
    {
        public LessonRepository(ApplicationDbContext context) : base(context)
        { }



        public IEnumerable<Lesson> GetAllLessons()
        {
            return _appContext.Lessons
                .Include(l => l.Location)
                .Include(l => l.Court)
                .Include (l => l.Coach)
                .Include(l => l.Participant)
                .OrderBy(l => l.LessonId)
                .ToList();
        }

        public Lesson GetLessonById(int Id)
        {
            return _appContext.Lessons.FirstOrDefault(c => c.LessonId == Id);

        }


        public void AddLesson(Lesson lesson)
        {
            if (lesson == null)
            {
                throw new ArgumentNullException(nameof(lesson));
            }

            _appContext.Lessons.Add(lesson);
        }

        public void UpdateLesson(Lesson lesson)
        {
            _appContext.Attach(lesson);
            _appContext.Entry(lesson).State = EntityState.Modified;
        }




        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
