using System.Collections.Generic;
using TrainingCalendarModel.Model;

namespace TrainingCalendarRepository.Repository.Abstract
{
    public interface IEmployee
    {
        IEnumerable<Employee> GetCoursesAttended(UserID user);
        bool Reister(Register res);
        bool UnRegister(Register res);
        bool Check(Register res);
        IEnumerable<UserLogin> Registered_Employees(int courseid);
        IEnumerable<CoursesAttended> GetCoursesAttended(UserLogin name);
        bool CheckToRegister(Register res);
    }
}
