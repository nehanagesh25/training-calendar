using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using TraingCalanderModel.Model;
using TrainingCalendarRepository.Model;
using TrainingCalendarRepository.Repository.Abstract;


namespace TrainingCalendarRepository.Repository
{
    public class CourseRepository : ICourse
    {

        public dynamic file;
        private readonly Training_CalendarEntities _db;
        public CourseRepository()
        {
            _db = new Training_CalendarEntities();
        }
     public bool AddCourse(CourseDetails course)
        {
            try
            {
                var varia = Convert.ToString(course.Attachment);
                
                var newCourse = new CourseDetail
                {
                    Course_Name = course.Course_Name,
                    Description = course.Description,
                    Created_On = DateTime.Now,
                    Duration = course.Duration,
                    Trainer_ID = course.Trainer_ID,
                    Created_By = 1,
                    Updated_By = course.Updated_By,
                    Attachment =byte.Parse(varia),
                    File_Extension = course.File_Extension,
                    File_Name = course.File_Name
                       
                };               
                _db.CourseDetails.Add(newCourse);
                _db.SaveChanges();
                return true;

            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
       public bool savefile()
        {
            var file = HttpContext.Current.Request.Files.Count > 0 ?
                HttpContext.Current.Request.Files[0] : null;

            if (file != null && file.ContentLength > 0)
            {
                var fileName = Path.GetFileName(file.FileName);

                var path = Path.Combine(
                    HttpContext.Current.Server.MapPath("~App_Data"),
                    fileName
                );

                file.SaveAs(path);
                return true;
            }
            else
            {
                return false;
            }

        }

        public IEnumerable  GetCourse(CourseDetails course)
        {
            try
            {
                var result = from u in _db.CourseDetails
                             where u.Course_ID == course.Course_ID 
                             select new CourseDetails
                             {
                                 Course_Name = u.Course_Name,
                                 Description = u.Description,
                                 Created_On = u.Created_On,
                                 Duration = u.Duration,
                                 Trainer_ID = u.Trainer_ID,
                                 Updated_On = u.Updated_On,
                                 Attachment=u.Attachment


                             };
                if(result.Count()> 0)
                {
                    return result;
                }else
                {
                    return result = null;
                }
            }
            catch(Exception e)
            {
                throw e;
                
            }
        }
        public IEnumerable AllCourses()
        {
            try
            {
                
                var result = from u in _db.CourseDetails                             
                             select new CourseDetails
                             {
                                 Course_ID=u.Course_ID,
                                 Course_Name = u.Course_Name,
                                 Description = u.Description,
                                 Created_On = u.Created_On,
                                 Duration = u.Duration,
                                 Trainer_ID = u.Trainer_ID,
                                 Updated_On = u.Updated_On,
                                 Attachment = u.Attachment,
                                 File_Name=u.File_Name                              
                             };              
                return result;

            }
            catch(Exception e)
            {
                throw e;
            }
           
        }

        private IEnumerable getfilename(IQueryable<CourseDetails> result)
        {
            var result1 = from u in _db.CourseDetails
                              select u.File_Name;
           
            return result1;
        }

        public bool RemoveCourse(CourseDetails course)
        {
            try
            {
                var x = (from y in _db.CourseDetails
                         where y.Course_ID==course.Course_ID
                         select y).FirstOrDefault();
                _db.CourseDetails.Remove(x);
                _db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
                
            }
        }

        public bool UpdateCourse(CourseDetails course)
        {
            try
            {
                var result = _db.CourseDetails.FirstOrDefault(r => r.Course_ID == course.Course_ID && r.Trainer_ID == course.Trainer_ID);
                if (result != null)
                {
                    result.Course_Name = course.Course_Name;
                    result.Trainer_ID = course.Trainer_ID;
                    result.Updated_On = DateTime.Now;
                    result.Updated_By = 1;
                    result.Description = course.Description;
                    result.Duration = course.Duration;
                }
                _db.SaveChanges();
                return true;
            }
            catch(Exception)
            {
                return false;
            }
            
        }

        public IEnumerable<CourseDetail> GetBydate(DateTime dt )
        {
            var result = from u in _db.CourseDetails.AsEnumerable()
                         join r in _db.Enrollmasters.AsEnumerable()
                         on u.Course_ID equals r.Course_ID
                         where r.FromDate==DateTime.Today                  
                         select u;
            return result;
        }
        public decimal GetColorType(decimal courseID)
        {
            var result = from r in _db.Enrollmasters.AsEnumerable()
                         join e in _db.Enrollments.AsEnumerable() on r.Enrollmaster_ID equals e.EnrollMaster_ID

                         where r.Course_ID == courseID
                         select e.EnrollMaster_ID;
                         //group new { e } by new
                         //{
                         //    e.EnrollMaster_ID
                         //} into t
                         //select new
                         //{
                         //    coursecount = t.Count()
                         //};
            var max = _db.Enrollmasters.Where(d => d.Course_ID == courseID).Select(m => m.Max_enroll).First();
            var min = _db.Enrollmasters.Where(d => d.Course_ID == courseID).Select(m => m.Min_enroll).First();
            var mid = (max + min) / 2;
            //var mid = _db.Enrollmasters.Select(m =>( m.Min_enroll + m.Min_enroll)/2);
            
            if (result.Count() >= max)
            {
                return 1;
            }
            else if (result.Count() < max && result.Count() > min)
            {
                return 2;
            }
            else 
            {
                return 3;
            }
             

            //GetCalendarDetails(result);

        }
        public IEnumerable<CalendarDisplay> GetCalendarDetails()
        {
            DateTime fromdate = new DateTime();
            DateTime todate = new DateTime();
            fromdate = DateTime.Now;
            todate = DateTime.Now;
            var max = _db.Enrollmasters.Select(m => m.Max_enroll);
            var min = _db.Enrollmasters.Select(m => m.Min_enroll);
            var avg = _db.Enrollmasters.Select(m => (m.Min_enroll + m.Min_enroll) / 2);

           
            var query = (from p in _db.CourseDetails.AsEnumerable()
                        join r in _db.Enrollmasters on p.Course_ID equals r.Course_ID
                        join e in _db.Enrollments on r.Enrollmaster_ID equals e.EnrollMaster_ID

                        select new CalendarDisplay
                        {
                            Course_ID = p.Course_ID,
                            Course_Name = p.Course_Name,
                            Description = p.Description,
                            Duration = p.Duration,
                            FromDate = r.FromDate.ToString("MMM-dd-yyyy"),
                            ToDate = r.ToDate.ToString("MMM-dd-yyyy"),
                            Last_date_to_enroll = r.Last_date_to_enroll.ToShortDateString(),
                            Max_enroll = r.Max_enroll,
                            Min_enroll = r.Min_enroll,
                            Venue = r.Venue,
                            ColorType = GetColorType(p.Course_ID)
                        }).GroupBy(n => n.Course_ID).Select(c => c.First()).ToList();



            return query;
        }


        //public IEnumerable GetColorType()
        //{
        //    var result = from r in _db.Enrollmasters
        //                 join e in _db.Enrollments on r.Enrollmaster_ID equals e.EnrollMaster_ID                         
        //    group new { e } by new
        //    {
        //        e.EnrollMaster_ID
        //    } into t
        //    select new
        //    {
        //        coursecount = t.Count()
        //    };

        //    //var mid = _db.Enrollmasters.Select(m =>( m.Min_enroll + m.Min_enroll)/2);

        //    return result;

        //    //GetCalendarDetails(result);

        //}
        //public IEnumerable<CalendarDisplay> GetCalendarDetails()
        //{
        //    var result = GetColorType();
           

        //    var query = from p in _db.CourseDetails
        //                join r in _db.Enrollmasters on p.Course_ID equals r.Course_ID
        //                join e in _db.Enrollments on r.Enrollmaster_ID equals e.EnrollMaster_ID
        //                select new CalendarDisplay
        //                {
        //                    Course_ID = p.Course_ID,
        //                    Course_Name = p.Course_Name,
        //                    Description = p.Description,
        //                    Duration = p.Duration,
        //                    FromDate = r.FromDate.ToString(),
        //                    ToDate = r.ToDate.ToString(),
        //                    Last_date_to_enroll = r.Last_date_to_enroll.ToString(),
        //                    Max_enroll = r.Max_enroll,
        //                    Min_enroll = r.Min_enroll,
        //                    Venue = r.Venue,
        //                    ColorType = GetColorType(p.Course_ID)
        //                };
        //    foreach(var item in query)
        //    {
        //        var max = _db.Enrollmasters.Where(d => d.Course_ID == item.Course_ID).Select(m => m.Max_enroll);
        //        var min = _db.Enrollmasters.Where(d => d.Course_ID == item.Course_ID).Select(m => m.Min_enroll);
        //        var avg = _db.Enrollmasters.Where(d => d.Course_ID == item.Course_ID).Select(m => (m.Max_enroll + m.Min_enroll) / 2);
        //        if(result == max)
        //        {
        //            item.ColorType = 1;   
        //        }
        //        else if (result <= max)
        //        {

        //        }
        //    }

            
        //    return query;
        //}

      

        public IEnumerable LastRecord()
        {
            return (_db.CourseDetails
                            .OrderByDescending(p => p.Course_ID)
                            .Select(r => r.Course_ID)
                            .First().ToString());
        }
    }
}
