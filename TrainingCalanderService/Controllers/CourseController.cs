using System;
using System.IO;
using System.Net;
using System.Web;
using System.Web.Http;
using TraingCalanderModel.Model;
using TrainingCalendarRepository.Model;
using TrainingCalendarRepository.Repository.Abstract;

namespace TrainingCalanderService.Controllers
{
    [RoutePrefix("TrainingCalendar/Course")]
    public class CourseController : ApiController
    {
        private readonly ICourse _cr;
        public CourseController(ICourse cr)
        {
            _cr = cr;
        }
        [Route("AddCourse")]
        [HttpPost]
        public IHttpActionResult PostCourse(CourseDetails course)
        {
            try
            {
                 return Ok(_cr.AddCourse(course));
            }
            catch(Exception )
            {
                return Content(HttpStatusCode.BadRequest, "Any object");
            }
        }
        [Route("GetCourse")]
        [HttpPost]
        public IHttpActionResult GetCourses(CourseDetails course)
        {
            try
            {
                return Ok(_cr.GetCourse(course));
            }
            catch(Exception e)
            {
                return Content(HttpStatusCode.BadRequest, "Any object");
                throw e;
            }
        }
        [Route("AllCourses")]
        [HttpGet]
        public IHttpActionResult GetAllCourses()
        {
            try
            {
                return Ok(_cr.AllCourses());
            }
            catch(Exception e)
            {
                return Content(HttpStatusCode.BadRequest, "Any object");
            }
        }
        [Route("DeleteCourse")]
        [HttpPost]
        public IHttpActionResult RemoveCourseById(CourseDetails course)
        {
            try
            {
                return Ok(_cr.RemoveCourse(course));
            }
            catch(Exception e)
            {
                return Content(HttpStatusCode.BadRequest, "Any object");
            }
        }
        [Route("UpdateCourse")]
        [HttpPost]
        public IHttpActionResult UpdateCourseById(CourseDetails course)
        {
            try
            {
                return Ok(_cr.UpdateCourse(course));
            }
            catch 
            {
                return Content(HttpStatusCode.BadRequest, "Any object");
            }
        }
        [Route("CourseByDate")]
        [HttpGet]
        public IHttpActionResult CourseByDate()
        {
            DateTime dt = DateTime.Now;
            return Ok(_cr.GetBydate(dt));
        }
        [Route("CalendarDetails")]
        [HttpGet]
        public IHttpActionResult GetCalendarDetails()
        {
            try
            {
                return Ok(_cr.GetCalendarDetails());
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
