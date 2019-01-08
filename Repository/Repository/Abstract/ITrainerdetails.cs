using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TrainingCalanderModel.Model;

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
