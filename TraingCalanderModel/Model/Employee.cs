using System;

namespace TrainingCalendarModel.Model
{
    public class Employee
    {
        public decimal Course_ID { get; set; }
        public string Course_Name { get; set; }
        public string Duration { get; set; }

    }
    public class Register
    {
        public string User_Name { get; set; }
        public string Trainer_Name { get; set; }
        public string Course_Name { get; set; }
        public DateTime Reg_On { get; set; }
        public DateTime? Unreg_On { get; set; }
        public string Reason_For_Unreg { get; set; }
        public DateTime? Created_On { get; set; }
        public DateTime? Updated_On { get; set; }
    }
    public class CoursesAttended
    {
        public string Course_Name { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }

    public class UserDetails
    {
        public string User_Name { get; set; }
        public decimal Course_ID { get; set; }
    }
}
