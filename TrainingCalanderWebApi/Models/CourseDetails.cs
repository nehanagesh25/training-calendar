using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TrainingCalendarWebApi.Models
{
    public partial class CourseDetails
    {
        public decimal Course_ID { get; set; }
        public Nullable<decimal> Trainer_ID { get; set; }
        public string Course_Name { get; set; }
        public string Description { get; set; }
        public string Duration { get; set; }
        public System.DateTime Created_On { get; set; }
        public Nullable<System.DateTime> Updated_On { get; set; }
        public Nullable<decimal> Created_By { get; set; }
        public Nullable<decimal> Updated_By { get; set; }
        public dynamic Attachment { get; set; }
        public string File_Name { get; set; }
        public string File_Extension { get; set; }
    }
}