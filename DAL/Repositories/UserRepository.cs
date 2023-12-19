using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext context) : base(context)
        { }



        public IEnumerable<User> GetAllUsers()
        {
            return _appContext.User
                .OrderBy(c => c.Id)
                .ToList();
        }

        public User GetUserById(int userId)
        {
            return _appContext.User.FirstOrDefault(c => c.Id == userId);

        }


        public void AddUser(User data)
        {
            if (data == null)
            {
                throw new ArgumentNullException(nameof(data));
            }

            _appContext.User.Add(data);
        }

        public void UpdateUser(User data)
        {
            _appContext.Attach(data);
            _appContext.Entry(data).State = EntityState.Modified;
        }




        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
