using System;
using System.Web.Http;
using TrainingCalanderModel.Model;
using TrainingCalendarRepository.Repository.Abstract;

namespace TrainingCalanderService.Controllers
{
    [RoutePrefix("TrainingCalendar/Enrollmaster")]
    public class EnrollmasterController : ApiController
    {
        private readonly IEnroll _EnrollmasterRepository;
        public EnrollmasterController (IEnroll EnrollmasterRepository)
        {
            _EnrollmasterRepository = EnrollmasterRepository;
        }
        [HttpPost]
        [Route("AddEnrollmaster")]
        public IHttpActionResult GetEnrollmaster (Enroll enroll)
        {
            try 
            {
                return Ok(_EnrollmasterRepository.AddEnrollmaster(enroll));
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }


        [HttpGet]
        [Route("GetAllEnrollmaster")]
        public IHttpActionResult GetAllEnrollmasters()
        {
            try
            {
                var result = _EnrollmasterRepository.GetAllEnrollmaster();
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpPost]
        [Route("UpdateEnrollmaster")]
        public IHttpActionResult UpdateEnrollmaster(Enroll enroll)
        {
            try
            {
                return Ok(_EnrollmasterRepository.UpdateEnrollmaster(enroll));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("DeleteEnrollmaster")] 
        public IHttpActionResult RemoveEnrollmaster(Enroll enroll)
        {
            try
            {
                return Ok(_EnrollmasterRepository.DeleteEnrollmaster(enroll));
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
