using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TrainingCalendarWebAPI.Models
{
    public class TrainerDetails
    {
        public decimal Trainer_ID { get; set; }
        public decimal Course_ID { get; set; }
        public Nullable<decimal> User_ID { get; set; }
        public bool Trainer_Type { get; set; }
        public string Trainer_Name { get; set; }
        public string Created_By { get; set; }
        public System.DateTime Created_On { get; set; }
        public Nullable<System.DateTime> Updated_On { get; set; }
    }
}