using System;
using System.Collections;
using System.Collections.Generic;
using TrainingCalendarModel.Model;
using TrainingCalendarRepository.Model;

namespace TrainingCalendarRepository.Repository.Abstract
{
    public interface ICourse
    {
        bool AddCourse(CourseDetails course);
        IEnumerable GetCourse(CourseDetails course);
        IEnumerable AllCourses();
        bool RemoveCourse(CourseDetails course);
        bool UpdateCourse(CourseDetails course);
        IEnumerable<CourseDetail> GetBydate(DateTime dt);
       IEnumerable<CalendarDisplay> GetTableDetails();
        decimal GetColorType(decimal courseID);
        IEnumerable LastRecord();
        IEnumerable<CalendarDisplay> GetCalendarDetails(User username);

        //    string GetFilePath(decimal course);

    }
}
