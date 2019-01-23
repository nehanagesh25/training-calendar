using System;
using System.Net;
using System.Web.Http;
using TrainingCalendarModel.Model;
using TrainingCalendarRepository.Repository.Abstract;

namespace TrainingCalanderService.Controllers
{
    [RoutePrefix("TrainingCalendar/Employee")]
    public class EmployeeController : ApiController
    {
        private readonly IEmployee _EmpRepo;
        public EmployeeController(IEmployee EmpRepo)
        {
            _EmpRepo = EmpRepo;
        }
        [Route("check")]
        [HttpPost]
        public IHttpActionResult Check(Register res)
        {
            try
            {
                return Ok(_EmpRepo.Check(res));
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        [Route("GetEvents")]
        [HttpPost]
        public IHttpActionResult GetEvents(UserID user)
        {
            try
            {
                return Ok(_EmpRepo.GetCoursesAttended(user));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [Route("Enroll")]
        [HttpPost]
        public IHttpActionResult Register(Register user)
        {
            try
            {
                return Ok(_EmpRepo.Reister(user));
            }
            catch (Exception e)
            {
                return Ok(e);
            }
        }
        [Route("UnEnroll")]
        [HttpPost]
        public IHttpActionResult UnRegister(Register user)
        {
            try
            {
                return Ok(_EmpRepo.UnRegister(user));
            }
            catch (Exception e)
            {
                return Ok(e);
            }
        }
        [HttpPost]
        [Route("RegisterEmloyees")]
        public IHttpActionResult GetAllEmpRegisterd(courseId Course)
        {
            //int courseid = Convert.ToInt32(Course_ID);
            return Ok(_EmpRepo.Registered_Employees(Course.Course_ID));
        }

        public class courseId
            {
            public int Course_ID;
            }

        [HttpPost]
        [Route("CoursesAttended")]
        public IHttpActionResult GetCoursesAttended(UserLogin name)
        {
            try
            {
                return Ok(_EmpRepo.GetCoursesAttended(name));
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]        [Route("checkforregister")]        public IHttpActionResult CheckForRegister(Register course)        {            try            {                if (_EmpRepo.CheckToRegister(course))                {                    return Ok("Success");                }                else                {                    return Content(HttpStatusCode.InternalServerError, "Error ");                }            }            catch (Exception e)            {                throw e;            }        }
    }
}
