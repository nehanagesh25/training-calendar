using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TraingCalanderModel.Model
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
        public System.DateTime Reg_On { get; set; }
        public Nullable<System.DateTime> Unreg_On { get; set; }
        public string Reason_For_Unreg { get; set; }
        public Nullable<System.DateTime> Created_On { get; set; }
        public Nullable<System.DateTime> Updated_On { get; set; }
    }
}
