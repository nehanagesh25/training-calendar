using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TrainingCalendarWebAPI.Common;
using TrainingCalendarWebAPI.Models;

namespace TrainingCalendarWebAPI.Controllers
{
    [RoutePrefix("TrainingCalendar/Enrollmasters")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EnrollmasterController : ApiController
    {
        private static HttpClient APIclient;
        public EnrollmasterController()
        {
            if (APIclient == null)
            {
                APIclient = new HttpClient
                {
                    BaseAddress = new Uri(ConfigurationManager.AppSettings["TrainingCalendarUrl"])
                };
                APIclient.DefaultRequestHeaders.Accept.Clear();
            }
        }
        [HttpPost]
        [Route("CreateEnrollmaster")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult CreateEnrollmaster(Enrollmaster enrollmaster)
        {
            ServiceManager sm = new ServiceManager();
            string ServResponse = null;
            List<object> Enrollmaster = new List<object>();
            try
            {
                ServResponse = sm.post_Request("Enrollmaster/AddEnrollmaster", enrollmaster);
                if (ServResponse != null)
                {
                    return Ok(ServResponse);
                }
                else
                {
                    return Ok(new HttpError(string.Format("No Records Found")));
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("Updatemaster")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Updatemaster(Enrollmaster enrollmaster)
        {
            ServiceManager sm = new ServiceManager();
            string ServResponse = null;
            List<object> Enrollmaster = new List<object>();
            try
            {
                ServResponse = sm.post_Request("Enrollmaster/UpdateEnrollmaster", enrollmaster);
                if (ServResponse != null)
                {
                    return Ok(ServResponse);
                }
                else
                {
                    return Ok(new HttpError(string.Format("No Records Found")));
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("GetAllMasters")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult GetAllmasters()
        {
            ServiceManager sm = new ServiceManager();
            string ServResponse = null;
            try
            {
                ServResponse = sm.GetServer_Response("Enrollmaster/GetAllEnrollmaster");
                if (ServResponse != null)
                {
                    var res = JsonConvert.DeserializeObject(ServResponse);
                    return Ok(res);
                }
                else
                {
                    return Ok(new HttpError(string.Format("No Records Found")));
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        [Route("Removemaster")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Removemaster(Enrollmaster enrollmaster)
        {
            ServiceManager sm = new ServiceManager();
            string ServResponse = null;
            List<object> Enrollmaster = new List<object>();
            try
            {
                ServResponse = sm.post_Request("Enrollmaster/DeleteEnrollmaster", enrollmaster);
                if (ServResponse != null)
                {
                    return Ok(ServResponse);
                }
                else
                {
                    return Ok(new HttpError(string.Format("No Records Found")));
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
