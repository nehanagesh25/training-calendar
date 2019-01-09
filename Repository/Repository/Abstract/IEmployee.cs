using System.Collections;
using System.Collections.Generic;
using TraingCalanderModel.Model;
using TrainingCalendarRepository.Model;

namespace TrainingCalendarRepository.Repository.Abstract
{
    public interface IEmployee
    {
        IEnumerable<Employee> GetCoursesAttended(UserID user);
        bool Reister(Register res);
        bool UnRegister(Register res);
        bool Check(Register res);
        IEnumerable<TraingCalanderModel.Model.UserLogin> Registered_Employees(int courseid);
    }
}
