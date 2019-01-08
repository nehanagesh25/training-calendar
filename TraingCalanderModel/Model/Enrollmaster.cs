using System;

namespace TrainingCalanderModel.Model
{
    public class Enroll
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
        public DateTime Created_On { get; set; }
        public DateTime? Updated_On { get; set; }
        public bool Status { get; set; }
    }
}
