using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
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

        public IEnumerable LastRecord()
        {
            return (_db.CourseDetails
                            .OrderByDescending(p => p.Course_ID)
                            .Select(r => r.Course_ID)
                            .First().ToString());
        }
    }
}
