using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TraingCalanderModel.Model;
using TrainingCalendarWebAPI.Common;

namespace TrainingCalanderWebApi.Controllers
{
    [RoutePrefix("TrainingCalendar/Course")]
    public class CourseController : ApiController
    {
        private static HttpClient APIclient;
        public CourseController()
        {
            if (APIclient == null)
            {
                APIclient = new HttpClient();
                APIclient.BaseAddress = new Uri(ConfigurationManager.AppSettings["TrainingCalendarUrl"]);
                APIclient.DefaultRequestHeaders.Accept.Clear();
            }
        }
        [HttpPost]
        [Route("AddCourse")]
         [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public IHttpActionResult Addcourse(CourseDetails user)
        {
            ServiceManager Serv = new ServiceManager();
            try
            {
                ServiceManager serv = new ServiceManager();
                string ServResponse = null;
                //HttpResponseMessage Serve = Serv.postRequest("Course/AddCourse", user);
                ServResponse = serv.post_Request("Course/AddCourse", user);
                if (ServResponse != null)
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



        [HttpGet]
        [Route("AllCourse")]
        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public IHttpActionResult GetCourses()
        {
            ServiceManager Serv = new ServiceManager();
            try
            {
                ServiceManager serv = new ServiceManager();
                string ServResponse = null;
                //HttpResponseMessage Serve = Serv.postRequest("Course/AddCourse", user);
                ServResponse = serv.GetServer_Response("Course/AllCourses");
                if (ServResponse != null)
                {
                    return Ok(ServResponse);
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

        //Get Course Which Are running currently today 
        [HttpPost]
        [Route("GetBydate")]
         [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public IHttpActionResult GetbyDate(CourseDetails user)
        {
            ServiceManager Serv = new ServiceManager();
            try
            {
                ServiceManager serv = new ServiceManager();
                string ServResponse = null;
                //HttpResponseMessage Serve = Serv.postRequest("Course/AddCourse", user);
                ServResponse = serv.post_Request("Course/CourseByDate", user);
                if (ServResponse != null)
                {
                    return Ok(ServResponse);
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


        [HttpPost]
        [Route("UpdateCourse")]
         [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public IHttpActionResult UpdateCourse(CourseDetails user)
        {
            ServiceManager Serv = new ServiceManager();
            try
            {
                ServiceManager serv = new ServiceManager();
                string ServResponse = null;
                //HttpResponseMessage Serve = Serv.postRequest("Course/AddCourse", user);
                ServResponse = serv.post_Request("Course/UpdateCourse", user);
                if (ServResponse != null)
                {
                    return Ok(ServResponse);
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

        [HttpPost]
        [Route("DeleteCourse")]
         [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public IHttpActionResult DeleteCourse(CourseDetails user)
        {
            ServiceManager Serv = new ServiceManager();
            try
            {
                ServiceManager serv = new ServiceManager();
                string ServResponse = null;
                //HttpResponseMessage Serve = Serv.postRequest("Course/AddCourse", user);
                ServResponse = serv.post_Request("Course/DeleteCourse", user);
                if (ServResponse != null)
                {
                    return Ok(ServResponse);
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
        [HttpGet]
        [Route("GetCalendarDetails")]
        [EnableCors(origins:"*", headers:"*",methods:"GET")]
        public IHttpActionResult GetCalendarDetails()
        {
            try
            {
                ServiceManager serv = new ServiceManager();
                string ServResponse = null;
                ServResponse = serv.GetServer_Response("Course/CalendarDetails");
                if(ServResponse != null)
                {
                    object CalDetails = JsonConvert.DeserializeObject(ServResponse);
                    return Ok(CalDetails);
                }
                else
                {
                    return Ok(new HttpError(string.Format("User Not Found")));
                }
            }
            catch(Exception e)
            {
                throw e;
            }
        }

    }
}
