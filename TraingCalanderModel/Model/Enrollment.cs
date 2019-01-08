using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TraingCalanderModel.Model
{
    public partial class Enrollment
    {
        public decimal Enrollment_ID { get; set; }
        public decimal EnrollMaster_ID { get; set; }
        public decimal User_ID { get; set; }
        public System.DateTime Reg_On { get; set; }
        public Nullable<System.DateTime> Unreg_On { get; set; }
        public string Reason_For_Unreg { get; set; }
        public Nullable<System.DateTime> Created_On { get; set; }
        public Nullable<System.DateTime> Updated_On { get; set; }

        public virtual UserLogin UserLogin { get; set; }
    }
}
