using System.Collections;
using TrainingCalendarModel.Model;

namespace TrainingCalendarRepository.Repository.Abstract
{
    public interface IEnroll
    {
        bool AddEnrollmaster(Enroll enroll);
        IEnumerable GetAllEnrollmaster();
        bool UpdateEnrollmaster(Enroll enroll);
        bool DeleteEnrollmaster(Enroll enroll);
    }
}
