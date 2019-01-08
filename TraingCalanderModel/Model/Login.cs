using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TraingCalanderModel.Model
{
   public  class AdminLogin
    {
        public string User_Name { get; set; }
        public string Password { get; set; }
    }
    public class UserLogin
    {
        public decimal User_ID { get; set; }
        public string User_Name { get; set; }
        public string Password { get; set; }
        public System.DateTime Last_Login { get; set; }
        public bool Status { get; set; }
        public System.DateTime Created_On { get; set; }
    }
    public class User
    {
        public string User_Name { get; set; }
    }
    public class UserID
    {
        public decimal User_ID { get; set; }

    }
}
