using System.Net;
using System.Web.Http;
using TrainingCalendarModel.Model;
using TrainingCalendarRepository.Repository.Abstract;

namespace API.Controllers
{
    [RoutePrefix("TrainingCalendar/user")]
    public class UserController : ApiController
    {
        private readonly IUser _Ur; 
        public UserController(IUser Ur)
        {
            _Ur = Ur;
        }
        [HttpPost]
        [Route("UserLogin")]
        public IHttpActionResult CheckUser(User user)
        {
            if (_Ur.ValidateUser(user) != null)
            {

                return Ok(_Ur.ValidateUser(user));
            }
            else
            {
                return Ok(_Ur.Adduser(user));
            }
        }   
        [HttpPost]
        [Route("AdminLogin")]
        public IHttpActionResult AdminLogin(AdminLogin admin)
        {
            if (_Ur.ValidateAdmin(admin))
            {
                return Ok("Success");
            }
            else
            {
                return Content(HttpStatusCode.BadRequest, "Any object");
            }

        }
        [HttpGet]
        [Route("GetAllUsers")]
        public IHttpActionResult GetAllUsers()
        {
            return Ok(_Ur.GetallUser());
        }


    }
}
