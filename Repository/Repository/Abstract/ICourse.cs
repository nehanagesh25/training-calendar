using System;
using System.Collections;
using System.Collections.Generic;
using System.Web;
using TraingCalanderModel.Model;
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

        IEnumerable LastRecord();

    }
}
