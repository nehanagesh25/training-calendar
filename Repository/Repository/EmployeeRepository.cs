using System;
using System.Collections.Generic;
using System.Linq;
using TrainingCalendarModel.Model;
using TrainingCalendarRepository.Model;
using TrainingCalendarRepository.Repository.Abstract;
using Enrollment = TrainingCalendarRepository.Model.Enrollment;
using UserLogin = TrainingCalendarModel.Model.UserLogin;

namespace TrainingCalendarRepository.Repository
{
    public class EmployeeRepository : IEmployee
    {
        private readonly Training_CalendarEntities _db;

        public EmployeeRepository()
        {
            _db = new Training_CalendarEntities();
        }
      
        public bool Check(Register res)
        {
            var user_id = User_id(res.User_Name);
            var courseid = Course_Id(res.Course_Name);
            var enroll = EnrollId(courseid);
            var result = (from p in _db.Enrollments
                          where p.User_ID == user_id && p.EnrollMaster_ID == enroll && p.Unreg_On == null && p.Reason_For_Unreg == null
                          select p);
            if (result.Count()>0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public IEnumerable<Employee> GetCoursesAttended(UserID user)
        {
            var result = from p in _db.Enrollments
                         join r in _db.UserLogins on p.User_ID equals user.User_ID
                         join q in _db.Enrollmasters on p.EnrollMaster_ID equals q.Enrollmaster_ID
                         join t in _db.CourseDetails on q.Course_ID equals t.Course_ID
                         select new Employee
                         {
                             Course_ID = t.Course_ID,
                             Course_Name = t.Course_Name,
                             Duration = t.Duration
                         };

            return result.Distinct() as IEnumerable<Employee>;
        }

        public bool Reister(Register res)
        {
            try
            {
                //var User_ID =Convert.ToDecimal( from p in _db.UserLogins where p.User_Name == res.User_Name select p.User_ID);
                //var Course_ID = Convert.ToDecimal(from p in _db.CourseDetails where p.Course_Name == res.Course_Name select p.Course_ID);
                //var EnrollMaster_ID =Convert.ToDecimal( from p in _db.Enrollmasters where p.Course_ID == Course_ID select p.Enrollmaster_ID);
                var User_ID = User_id(res.User_Name);
                var Course_ID = Course_Id(res.Course_Name);
                var EnrollMaster_ID = EnrollId(Course_ID);
                var result = _db.Enrollments.FirstOrDefault(r => r.User_ID == User_ID && r.EnrollMaster_ID == EnrollMaster_ID);
                if (result!=null)
                {
                    result.Reg_On = DateTime.Now;
                    result.Updated_On = DateTime.Now;
                    result.Unreg_On = null;
                    result.Reason_For_Unreg = null;

                }
                else
                {

                    var creat = new Enrollment
                    {
                        User_ID = User_ID,
                        Created_On = DateTime.Today,
                        EnrollMaster_ID = EnrollMaster_ID,
                        Reg_On = DateTime.Today,
                        Updated_On = DateTime.Today,
                        Reason_For_Unreg = null,
                        Unreg_On = null
                    };
                    _db.Enrollments.Add(creat);
                }
                _db.SaveChanges();
                return true;
            }
            catch(Exception e)
            {
                return false;
            }
          
        }
        public bool CheckToRegister(Register res)        {

            var Course_ID = Course_Id(res.Course_Name);            var EnrollMaster_ID = EnrollId(Course_ID);            var result = _db.Enrollmasters.FirstOrDefault(r => r.Enrollmaster_ID == EnrollMaster_ID && r.Last_date_to_enroll < DateTime.Today);            if (result != null)            {                return true;            }            else            {                return false;            }        }

        public bool UnRegister(Register res)
        {

            try
            {
                var User_ID = User_id(res.User_Name);
                var Course_ID = Course_Id(res.Course_Name);
                var EnrollMaster_ID = EnrollId(Course_ID);
                var result = _db.Enrollments.FirstOrDefault(r => r.User_ID == User_ID && r.EnrollMaster_ID == EnrollMaster_ID);
                if (result != null)
                {
                    result.Unreg_On = DateTime.Now;
                    result.Reason_For_Unreg = res.Reason_For_Unreg;
                }
                _db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        //Getting ids from names 
        private int EnrollId(decimal course_ID)
        {
            var EnrollMaster_ID = Convert.ToInt32((from p in _db.Enrollmasters
                                                   where p.Course_ID == course_ID
                                                   select p.Enrollmaster_ID).FirstOrDefault());
            return EnrollMaster_ID;
        }

        private int User_id(string user_Name)
        {
            var User_ID = Convert.ToInt32((from p in _db.UserLogins
                                           where p.User_Name == user_Name
                                           select p.User_ID).FirstOrDefault());
            return User_ID;
        }

        public int Course_Id(string name)
        {
            var Course_ID = Convert.ToInt32((from p in _db.CourseDetails
                                             where p.Course_Name == name
                                             select p.Course_ID).FirstOrDefault());
            return Course_ID;
        }

        public IEnumerable<UserLogin> Registered_Employees(int courseid)
        {
            var result = from p in _db.CourseDetails
                         join r in _db.Enrollmasters on p.Course_ID equals courseid
                         join q in _db.Enrollments on r.Enrollmaster_ID equals q.EnrollMaster_ID
                         join e in _db.UserLogins on q.User_ID equals e.User_ID
                          select new UserLogin
                         {
                             User_ID=e.User_ID,
                             User_Name=e.User_Name
                         };

            return result.Distinct() as IEnumerable<UserLogin>;

        }
        public IEnumerable<CoursesAttended> GetCoursesAttended(UserLogin name)
        {
            var result = from p in _db.UserLogins
                         join r in _db.Enrollments on p.User_ID equals r.User_ID
                         join t in _db.Enrollmasters on r.EnrollMaster_ID equals t.Enrollmaster_ID
                         join n in _db.CourseDetails on t.Course_ID equals n.Course_ID
                         where p.User_Name == name.User_Name
                         select new CoursesAttended
                         {
                             Course_Name = n.Course_Name,
                             FromDate = t.FromDate,
                             ToDate = t.ToDate
                         };
            return result.Distinct();
        }
    }
}