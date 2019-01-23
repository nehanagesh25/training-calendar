using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrainingCalendarModel.Model
{
    public partial class CourseDetails
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
