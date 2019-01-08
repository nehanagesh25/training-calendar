using System.Collections;
using System.Collections.Generic;
using TraingCalanderModel.Model;
using TrainingCalendarRepository.Model;

namespace TrainingCalendarRepository.Repository.Abstract
{
    public interface IEmployee
    {
        IEnumerable<Employee> GetCoursesAttended(UserID user);
    }
}
