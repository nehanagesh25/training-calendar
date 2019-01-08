using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using TraingCalanderModel.Model;
using TrainingCalendarRepository.Model;
using TrainingCalendarRepository.Repository.Abstract;
using UserLogin = TraingCalanderModel.Model.UserLogin;

namespace TrainingCalendarRepository.Repository
{
    public class UserRepository:IUser
    {

        private readonly Training_CalendarEntities _db;
        public UserRepository()
        {
            _db = new Training_CalendarEntities();
        }
        public IEnumerable ValidateUser(User user)
        {
            try
            {
                return GetallUsers(user);
              
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable GetallUsers(User user)
        {
            try
            {
                var result = from u in _db.UserLogins
                             where u.User_Name == user.User_Name
                             select new UserLogin
                             {  
                                 User_ID=u.User_ID,
                                 User_Name = u.User_Name,
                                 Status= u.Status,
                                 Last_Login=DateTime.Now,
                                 Created_On=u.Created_On.Value,
                             };
                if(result.Count() > 0)
                {
                    return result;
                }
                else
                {
                    return result = null;
                }
             
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
        public bool Adduser(User user)
        {
            var newuser = new Model.UserLogin
            {
                
                User_Name = user.User_Name,
                Last_Login = DateTime.Now,
                Status = true,
                Created_On= DateTime.Now,
             };
            _db.UserLogins.Add(newuser);
            _db.SaveChanges();
            return true; 
        }

        public bool ValidateAdmin(AdminLogin admin)
        {
            var result = from u in _db.UserLogins
                         where u.User_Name == admin.User_Name && u.Password == admin.Password
                         select new TraingCalanderModel.Model.UserLogin
                         {
                             User_Name = u.User_Name,
                             Password = u.Password
                         };
            if (result.Count() > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public IEnumerable<UserLogin> GetallUser()
        {
            try
            {
                var Res = from u in _db.UserLogins
                          select new UserLogin
                          {

                              User_ID = u.User_ID,
                              User_Name = u.User_Name,
                              Status = u.Status,
                              Last_Login = DateTime.Now,                            
                              Password=u.Password
                              
                          };
                return Res;
            }
            catch(Exception e)
            {
                throw (e);
            }
        }
    }
}
