using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrainingCalanderModel.Model
{
    public class CalendarDisplay
    {
        public decimal Course_ID { get; set; }
        public string Course_Name { get; set; }
        public string Description { get; set; }
        public string Duration { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Venue { get; set; }
        public string Last_date_to_enroll { get; set; }
        public decimal Max_enroll { get; set; }
        public Nullable<decimal> Min_enroll { get; set; }
        public decimal ColorType { get; set; }
        public dynamic Attachment { get; set; }
    }
}
