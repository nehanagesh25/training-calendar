using System.Collections;
using TrainingCalendarModel.Model;

namespace TrainingCalendarRepository.Repository.Abstract
{
    public interface ITrainerdetails
    {
        bool AddTrainerDetails(Trainerdetails trainerDetail);
        bool DeleteTrainerdetails(Trainerdetails trainerDetail);
        IEnumerable GetAllTrainerdetails();
        bool UpdateTrainerdetails(Trainerdetails trainerDetails);
    }
}
