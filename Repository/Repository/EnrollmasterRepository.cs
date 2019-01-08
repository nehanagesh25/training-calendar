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
    public class EnrollmasterRepository : IEnroll
    {
        private readonly Training_CalendarEntities _db;
        public EnrollmasterRepository()
        {
            _db = new Training_CalendarEntities();
        }
        public bool AddEnrollmaster(Enroll enroll)
        {
            DateTime fromdate = DateTime.Now;
            DateTime todate = DateTime.Now;
            DateTime lastDate = DateTime.Now;


            fromdate = DateTime.Parse(enroll.FromDate, new CultureInfo("en-GB", true));
            todate = DateTime.Parse(enroll.ToDate, new CultureInfo("en-GB", true));
            lastDate = DateTime.Parse(enroll.Last_date_to_enroll, new CultureInfo("en-GB", true));

            try
            {
                int trainerID = Convert.ToInt32((from train in _db.TrainerDetails
                                                 where train.Trainer_ID == enroll.Trainer_ID
                                                 select train.Trainer_ID).FirstOrDefault());

                int cousreID = Convert.ToInt32((from course in _db.TrainerDetails
                                                where course.Course_ID == enroll.Course_ID
                                                select course.Course_ID).FirstOrDefault());

                var createEnrollmaster = new Enrollmaster
                {
                    Trainer_ID = trainerID,
                    Course_ID = cousreID,
                    FromDate = fromdate,
                    ToDate = todate,
                    Venue = enroll.Venue,
                    Last_date_to_enroll = lastDate,
                    Max_enroll = enroll.Max_enroll,
                    Min_enroll = enroll.Min_enroll,
                    Created_On = DateTime.Now,
                    Status = enroll.Status
                };
                _db.Enrollmasters.Add(createEnrollmaster);
                _db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable GetEnrollMasterById(int id)
        {
            return (from u in _db.Enrollmasters
                    where u.Enrollmaster_ID == id && u.Status == true
                    select u);                    
        }
        public IEnumerable GetAllEnrollmaster()
        {
           

            try
            {
                return (from u in _db.Enrollmasters
                        select new Enroll
                        {
                            Enrollmaster_ID = u.Enrollmaster_ID,
                            Trainer_ID = u.Trainer_ID,
                            Course_ID = u.Course_ID,
                            FromDate = u.FromDate.ToString(),
                            ToDate = u.ToDate.ToString(),
                            Venue = u.Venue,
                            Last_date_to_enroll = u.Last_date_to_enroll.ToString(),
                            Max_enroll = u.Max_enroll,
                            Min_enroll = u.Min_enroll,
                            Created_On = u.Created_On,
                            Updated_On = u.Updated_On,
                            Status = u.Status
                        }).ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateEnrollmaster(Enroll enroll)
        {
            DateTime fromdate = DateTime.Now;
            DateTime todate = DateTime.Now;
            DateTime lastDate = DateTime.Now;

            fromdate = DateTime.Parse(enroll.FromDate, new CultureInfo("en-GB", true));
            todate = DateTime.Parse(enroll.ToDate, new CultureInfo("en-GB", true));
            lastDate = DateTime.Parse(enroll.Last_date_to_enroll, new CultureInfo("en-GB", true));
            try
            {
                Enrollmaster e = _db.Enrollmasters.FirstOrDefault(u => u.Enrollmaster_ID == enroll.Enrollmaster_ID );

                int trainerID = Convert.ToInt32((from train in _db.TrainerDetails
                                                 where train.Trainer_ID == enroll.Trainer_ID
                                                 select train.Trainer_ID).FirstOrDefault());

                int cousreID = Convert.ToInt32((from course in _db.TrainerDetails
                                                where course.Course_ID == enroll.Course_ID
                                                select course.Course_ID).FirstOrDefault());

                var result = from u in _db.Enrollmasters
                             where u.Enrollmaster_ID == enroll.Enrollmaster_ID
                             select u;
                foreach (Enrollmaster u in result)
                {
                    u.Trainer_ID = trainerID;
                    u.Course_ID = cousreID;
                    u.FromDate = fromdate;
                    u.ToDate = todate;
                    u.Venue = enroll.Venue;
                    u.Last_date_to_enroll = lastDate;
                    u.Max_enroll = enroll.Max_enroll;
                    u.Min_enroll = enroll.Min_enroll;
                    u.Updated_On = DateTime.Now;
                    u.Status = enroll.Status;
                };

                _db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteEnrollmaster(Enroll enroll)
        {
            try
            {
                var result = (from u in _db.Enrollmasters
                              where u.Enrollmaster_ID == enroll.Enrollmaster_ID
                              select u).FirstOrDefault();
                _db.Enrollmasters.Remove(result);
                _db.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
