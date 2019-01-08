using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TrainingCalanderModel.Model;
using TrainingCalendarRepository.Model;
using TrainingCalendarRepository.Repository.Abstract;

namespace TrainingCalendarRepository.Repository
{
   public class TrainerdetailsRepository:ITrainerdetails
    {
        private readonly Training_CalendarEntities _db;
        public TrainerdetailsRepository()
        {
            _db = new Training_CalendarEntities();
        }

        public bool AddTrainerDetails(Trainerdetails trainerDetail)
        {
            
            try
            {
                int courseId = Convert.ToInt32((from course in _db.CourseDetails
                                                where course.Course_ID == trainerDetail.Course_ID
                                                select course.Course_ID).FirstOrDefault());

                var CreateTrainerDetails = new TrainerDetail
                {
                    Trainer_ID = trainerDetail.Trainer_ID,
                    Course_ID = courseId,
                    User_ID = trainerDetail.User_ID,
                    Trainer_Type = trainerDetail.Trainer_Type,
                    Trainer_Name = trainerDetail.Trainer_Name,
                    Created_By = trainerDetail.Created_By,
                    Created_On = DateTime.Now
                };
                _db.TrainerDetails.Add(CreateTrainerDetails);
                _db.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public bool DeleteTrainerdetails(Trainerdetails trainerdetails)
        {
            try
            {
                var result = (from u in _db.TrainerDetails
                              where u.Trainer_ID == trainerdetails.Trainer_ID
                              select u).FirstOrDefault();
                _db.TrainerDetails.Remove(result);
                _db.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable GetAllTrainerdetails()
        {
            try
            {
                return (from u in _db.TrainerDetails
                        select new Trainerdetails
                        {
                            Trainer_ID = u.Trainer_ID,
                            Course_ID = u.Course_ID,
                            User_ID = u.User_ID,
                            Trainer_Type = u.Trainer_Type,
                            Trainer_Name = u.Trainer_Name,
                            Created_By = u.Created_By,
                            Created_On = u.Created_On,
                            Updated_On = u.Updated_On
                        }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool UpdateTrainerdetails(Trainerdetails trainerDetails)
        {
            try
            {
              TrainerDetail e = _db.TrainerDetails.FirstOrDefault(u => u.Trainer_ID == trainerDetails.Trainer_ID);

                int courseId = Convert.ToInt32((from course in _db.CourseDetails
                                                where course.Course_ID == trainerDetails.Course_ID
                                                select course.Course_ID).FirstOrDefault());
                var result = from u in _db.TrainerDetails
                             where u.Trainer_ID == trainerDetails.Trainer_ID
                             select u;
                foreach(TrainerDetail u in result)
                {
                    u.Course_ID = courseId;
                    u.Trainer_Type = trainerDetails.Trainer_Type;
                    u.Trainer_Name = trainerDetails.Trainer_Name;
                    u.Created_By = trainerDetails.Created_By;
                    u.Updated_On = DateTime.Now;
                };
                _db.SaveChanges();
                return true;

            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
