using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TrainingCalendarWebAPI.Models
{
    public class Enrollmaster
    {
        public decimal Enrollmaster_ID { get; set; }
        public Nullable<decimal> Trainer_ID { get; set; }
        public decimal Course_ID { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Venue { get; set; }
        public string Last_date_to_enroll { get; set; }
        public decimal Max_enroll { get; set; }
        public Nullable<decimal> Min_enroll { get; set; }
        public string Created_On { get; set; }
        public string Updated_On { get; set; }
        public bool Status { get; set; }
    }
}