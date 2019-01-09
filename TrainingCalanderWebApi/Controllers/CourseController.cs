using Newtonsoft.Json;
using System;
using System.Configuration;
using System.IO;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using TrainingCalanderModel.Model;
using TrainingCalendarWebAPI.Common;

namespace TrainingCalendarWebApi.Controllers
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
        public IHttpActionResult Addcourse(CourseDetails1 user)
        {
            ServiceManager Serv = new ServiceManager();
            try
            {
                var filepath = "";
                CourseDetails1 helper = new CourseDetails1();
                helper = user;
                if (helper.Attachment != null )
                {
                    
                        filepath = HttpContext.Current.Server.MapPath("~/Uploaded/") + Path.GetFileName( helper.Attachment.ToString());
                        FileInfo ofileinfo = new FileInfo(filepath);
                        helper.File_Name = Path.GetFileName(ofileinfo.Name);
                        helper.Attachment =File.ReadAllBytes(filepath);
                        helper.File_Extension = Path.GetExtension(ofileinfo.Extension);                   

                }
                else
                {
                    helper.File_Name = null;
                    helper.Attachment = null;
                    helper.File_Extension = null;
                }
                ServiceManager serv = new ServiceManager();
                string ServResponse = null;
                //HttpResponseMessage Serve = Serv.postRequest("Course/AddCourse", user);
                ServResponse = serv.post_Request("Course/AddCourse", helper);
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
        public IHttpActionResult GetAllCourses()
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
                    var res = JsonConvert.DeserializeObject(ServResponse);
                    return Ok(res);
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
        [HttpGet]
        [Route("GetBydate")]
         [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public IHttpActionResult GetCourseByDate(CourseDetails user)
        {
            ServiceManager Serv = new ServiceManager();
            try
            {
                ServiceManager serv = new ServiceManager();
                string ServResponse = null;
                //HttpResponseMessage Serve = Serv.postRequest("Course/AddCourse", user);
                ServResponse = serv.GetServer_Response("Course/CourseByDate");
                var response = JsonConvert.DeserializeObject(ServResponse);
                if (response != null)
                {
                    return Ok(response);
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
      
        [HttpPost]
        [Route("Save")]
        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public string UploadFile()
        {
            var file = HttpContext.Current.Request.Files.Count > 0 ?
                HttpContext.Current.Request.Files[0] : null;

            if (file != null && file.ContentLength > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                var path = Path.Combine(
                    HttpContext.Current.Server.MapPath("~/Uploaded"),
                    fileName
                );

                file.SaveAs(path);
            }

            return file != null ? "/Uploaded/" + file.FileName : null;

        }
        [HttpGet]
        [Route("LastRecord")]
        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public IHttpActionResult LastRecord()
        {
            ServiceManager Serv = new ServiceManager();
            //HttpResponseMessage Serve = Serv.postRequest("Course/AddCourse", user);
           var ServResponse = Serv.GetServer_Response("Course/LastCourse");
            var response = JsonConvert.DeserializeObject(ServResponse);
            if (response != null)
            {
                return Ok(response);
            }
            else
            {
                return Ok(new HttpError(string.Format("User Not found")));
            }
        }
          

        [HttpGet]
        [Route("GetCalendarDetails")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
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


          
        public class CourseDetails1
        {
            public decimal Course_ID { get; set; }
            public decimal? Trainer_ID { get; set; }
            public string Course_Name { get; set; }
            public string Description { get; set; }
            public string Duration { get; set; }
            public DateTime Created_On { get; set; }
            public DateTime? Updated_On { get; set; }
            public decimal? Created_By { get; set; }
            public decimal? Updated_By { get; set; }
            public dynamic Attachment { get; set; }
            public string File_Name { get; set; }
            public string File_Extension { get; set; }
        }
    }
}
