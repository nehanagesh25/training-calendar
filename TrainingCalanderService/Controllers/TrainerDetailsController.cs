using System;
using System.Web.Http;
using TrainingCalanderModel.Model;
using TrainingCalendarRepository.Repository.Abstract;

namespace TrainingCalanderService.Controllers
{
    [RoutePrefix("TrainingCalendar/TrainerDetails")]
    public class TrainerDetailsController : ApiController
    {
        private readonly ITrainerdetails _TrainerdetailsRepository;
        public TrainerDetailsController(ITrainerdetails TrainerdetailsRepository)
        {
            _TrainerdetailsRepository = TrainerdetailsRepository;
        }
        [HttpPost]
        [Route("AddTrainerdetails")]
        public IHttpActionResult AddTrainerdetails(Trainerdetails trainerdetails)
        {
            try
            {
                return Ok(_TrainerdetailsRepository.AddTrainerDetails(trainerdetails));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        [Route("DeleteTrainerdetails")]
        public IHttpActionResult DeleteTrainerdetails(Trainerdetails trainerdetails)
        {
            try
            {
                return Ok(_TrainerdetailsRepository.DeleteTrainerdetails(trainerdetails));
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        [HttpGet]
        [Route("GetAllTrainerdetails")]
        public IHttpActionResult GetAllTrainersdetail()
        {
            try
            {
                return Ok(_TrainerdetailsRepository.GetAllTrainerdetails());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        [Route("UpdateTrainerdetails")]
        public IHttpActionResult UpdateTrainersdetail(Trainerdetails trainerdetails)
        {
            try
            {
                return Ok(_TrainerdetailsRepository.UpdateTrainerdetails(trainerdetails));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
