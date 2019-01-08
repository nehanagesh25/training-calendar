using System.Collections.Generic;
using System.Linq;
using TraingCalanderModel.Model;
using TrainingCalendarRepository.Model;
using TrainingCalendarRepository.Repository.Abstract;

namespace TrainingCalendarRepository.Repository
{
    public class EmployeeRepository : IEmployee
    {
        private readonly Training_CalendarEntities _db;

        public EmployeeRepository()
        {
            _db = new Training_CalendarEntities();
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
    }
}