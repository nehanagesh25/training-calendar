using System;
using System.Net.Http;
using System.Web.Http;
using System.Configuration;
using TrainingCalendarWebAPI.Common;
using TrainingCalanderWebApi.Models;
using System.Web.Http.Cors;

namespace BroadbandWebApi.Controllers
{
    [RoutePrefix("TrainingCalendar/user")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        private static HttpClient APIclient;
        public LoginController()
        {
            if (APIclient == null)
            {
                APIclient = new HttpClient();
                APIclient.BaseAddress = new Uri(ConfigurationManager.AppSettings["TrainingCalendarUrl"]);
                APIclient.DefaultRequestHeaders.Accept.Clear();
            }
        }
        //User Login
        [HttpPost]
        [Route("UserLogin")]
        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public IHttpActionResult UserLogin(Usermodel user)
        {
            ServiceManager Serv = new ServiceManager();
            try
            {
                string ServResponse = null;
                HttpResponseMessage Serve = Serv.postRequest("user/UserLogin", user);
                ServResponse = Convert.ToString(Serv.postRequest("user/UserLogin", user));
                if (Serve.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    return Ok(string.Format("Success"));
                }
                else
                {
                    return Ok(new HttpError(string.Format("User Not found")));
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Admin Login
        [HttpPost]
        [Route("AdminLogin")]
        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public IHttpActionResult AdminLogin(Adminmodel user)
        {
            ServiceManager Serv = new ServiceManager();
            try
            {
                string ServResponse = null;
                HttpResponseMessage Serve = Serv.postRequest("user/AdminLogin", user);
                ServResponse = Convert.ToString(Serv.postRequest("user/AdminLogin", user));
                if (Serve.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    return Ok(string.Format("Success"));
                }
                else
                {
                    return Ok(new HttpError(string.Format("Admin Not found")));
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}