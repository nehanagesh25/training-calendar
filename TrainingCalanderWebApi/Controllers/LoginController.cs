using System;
using System.Net.Http;
using System.Web.Http;
using System.Configuration;
using TrainingCalendarWebAPI.Common;
using TrainingCalendarWebApi.Models;
using System.Web.Http.Cors;
using TraingCalanderModel.Model;
using Newtonsoft.Json;

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
        [HttpPost]
        [Route("Register")]
        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public IHttpActionResult Register(Register user)
        {
            ServiceManager Serv = new ServiceManager();
            try
            {
                string ServResponse = null;
                //HttpResponseMessage Serve = Serv.postRequest("user/AdminLogin", user);
                ServResponse = Convert.ToString(Serv.postRequest("Employee/Enroll", user));
                if (ServResponse !=null)
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
        [HttpPost]
        [Route("UnRegister")]
        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public IHttpActionResult UnRegister(Register user)
        {
            ServiceManager Serv = new ServiceManager();
            try
            {
                string ServResponse = null;
                //HttpResponseMessage Serve = Serv.postRequest("Employee/AdminLogin", user);
                ServResponse = Convert.ToString(Serv.postRequest("Employee/UnEnroll", user));
                if (ServResponse!=null )
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
        [HttpPost]
        [Route("check")]
        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public IHttpActionResult Check(Register user)
        {
            ServiceManager Serv = new ServiceManager();
            try
            {
                string ServResponse = null;
                HttpResponseMessage Serve = Serv.postRequest("Employee/check", user);
                ServResponse = Convert.ToString(Serv.postRequest("Employee/check", user));
                if (Serve.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var res = JsonConvert.DeserializeObject(ServResponse);
                    return Ok(res); 
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

        [HttpPost]
        [Route("EnrolledEmployees")]
        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public IHttpActionResult Enrolled_Employees(Course courseId)
        {
            ServiceManager Serv = new ServiceManager();
            try
            {
                string ServResponse = null;
                //HttpResponseMessage Serve = Serv.postRequest("Employee/check", user.Course_ID);
                ServResponse = Convert.ToString(Serv.post_Request("Employee/RegisterEmloyees", courseId));
                if (ServResponse!=null)
                {
                    var res = JsonConvert.DeserializeObject(ServResponse);
                    return Ok(res);
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
        public class Course
        {
            public int Course_ID;
        }
    }
}