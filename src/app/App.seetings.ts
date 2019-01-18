var webApiUrl="http://localhost:60027/TrainingCalendar/"


export class Appsettings{
    public static BASE_URL = webApiUrl;
    //Login API 
    public static UserLogin = 'user/UserLogin';
    public static AdminLogin='user/AdminLogin';
    public static Register='user/Register';
    public static UnRegister='user/UnRegister';
    public static check='user/check';
    public static EnrolledEmployees='user/EnrolledEmployees';
    //Course API
    public static AddCourse='Course/AddCourse';
    public static AllCourse='Course/AllCourse';
    public static CourseByToday='Course/GetBydate';
    public static UpdateCourse='Course/UpdateCourse';
    public static DeleteCourse='Course/DeleteCourse';
    public static GetTableDetails='Course/GetTableDetails'
    public static SaveFile='Course/Save';
    public static LastRecord='Course/LastRecord';
    public static GetCalendarDetails='Course/GetCalendarDetails'
    //Enroll Master API
    public static CreateEnrollmaster='Enrollmasters/CreateEnrollmaster';
    public static Updatemaster='Enrollmasters/Updatemaster';
    public static GetAllMasters='Enrollmasters/GetAllMasters';
    public static Removemaster='Enrollmasters/Removemaster';
    //Trainers API
    public static CreateTrainers='Trainers/CreateTrainers';
    public static UpdateTrainers='Trainers/UpdateTrainers';
    public static GetAllTrainers='Trainers/GetAllTrainers';
    public static RemoveTrainerdetails='Trainers/RemoveTrainerdetails';    
    //courses attended
    public static CoursesAttended='user/CoursesAttended';
}
