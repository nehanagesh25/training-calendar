namespace TraingCalanderModel.Model
{
    public class UserLogin
    {
        public decimal User_ID { get; set; }
        public string User_Name { get; set; }
        public string Password { get; set; }
        public System.DateTime Last_Login { get; set; }
        public bool Status { get; set; }
        public System.DateTime Created_On { get; set; }
    }
}
