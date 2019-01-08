using System;
using System.Web.Http;
using TraingCalanderModel.Model;
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

    }
}
