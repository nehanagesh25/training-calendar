import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appsettings } from '../App.seetings';
import { Observable } from 'rxjs';
import { httpFactory } from '@angular/http/src/http_module';
import { Http } from '@angular/http';
@Injectable({
    providedIn: 'root'
})
export class ServicesService {

    constructor(private http: HttpClient) { }
    // login post method
    public UserLogin(data) {
        let url = Appsettings.BASE_URL + Appsettings.UserLogin;
        return this.http.post(url, data);
    }
    //Admin Login Post Method
    public AdminLogin(data) {
        let url = Appsettings.BASE_URL + Appsettings.AdminLogin;
        return this.http.post(url, data);
    }
    //Register for an Event
    public Register(data){
        let url=Appsettings.BASE_URL+Appsettings.Register;
        return this.http.post(url,data);
    }
    //Unregister for an event
    public UnRegister(Data){
        let url=Appsettings.BASE_URL+Appsettings.UnRegister;
        return this.http.post(url,Data);
    }
    //check for Enrolled for the course or not 
    public check(data){
        let url=Appsettings.BASE_URL+Appsettings.check;
        return this.http.post(url,data);
    }
    //Enrolled For Current Evets
    public GetEnrolledEmployees(data){
        let url=Appsettings.BASE_URL+Appsettings.EnrolledEmployees;
        return this.http.post(url,data);
    }
    //Course
    //AddCourse Post Method
    public AddCourse(data) {
        let url = Appsettings.BASE_URL + Appsettings.AddCourse;
        return this.http.post(url, data);
    }
    // ALL AllCourse get method
    public AllCourse() {
        let url = Appsettings.BASE_URL + Appsettings.AllCourse;
        return this.http.get(url);
    }
    //save file
    public savefile(data){
        let url=Appsettings.BASE_URL+Appsettings.SaveFile;
        return this.http.post(url,data);
    }
    //Last Record Of Course
    public GetCourseid(){
        let url=Appsettings.BASE_URL+Appsettings.LastRecord
        return this.http.get(url);
    }
    //Course Running  Today Post Method
    public TodayCourse() {
        let url = Appsettings.BASE_URL + Appsettings.CourseByToday;
        return this.http.get(url);
    }
    // UpdateCourse Post Method
    public UpdateCourse(data) {
        let url = Appsettings.BASE_URL + Appsettings.UpdateCourse;
        return this.http.post(url, data);
    }
    //DeleteCourse Post Method
    public DeleteCourse(data) {
        let url = Appsettings.BASE_URL + Appsettings.DeleteCourse;
        return this.http.post(url, data);
    }
    //Enroll Master API
    //CreateEnrollmaster Post Method
    public CreateEnrollmaster(data) {
        let url = Appsettings.BASE_URL + Appsettings.CreateEnrollmaster;
        return this.http.post(url, data);
    }

    //Updatemaster
    public Updatemaster(data) {
        let url = Appsettings.BASE_URL + Appsettings.Updatemaster;
        return this.http.post(url, data);
    }

    //GetAllMasters Get Method
    public GetAllMasters() {
        let url = Appsettings.BASE_URL + Appsettings.GetAllMasters;
        return this.http.get(url);
    }
    //Removemaster Post Method
    public Removemaster(data) {
        let url = Appsettings.BASE_URL + Appsettings.Removemaster;
        return this.http.post(url, data);
    }

    //Trainers API
    //CreateTrainers Post Method
    public CreateTrainers(data) {
        let url = Appsettings.BASE_URL + Appsettings.CreateTrainers;
        return this.http.post(url, data);
    }
    //UpdateTrainers Post Method
    public UpdateTrainers(data) {
        let url = Appsettings.BASE_URL + Appsettings.UpdateTrainers;
        return this.http.post(url, data);
    }
    //RemoveTrainerdetails Post Method
    public RemoveTrainerdetails(data) {
        let url = Appsettings.BASE_URL + Appsettings.RemoveTrainerdetails;
        return this.http.post(url, data);
    }

    //GetAllTrainers Get Method
    public GetAllTrainers() {
        let url = Appsettings.BASE_URL + Appsettings.GetAllTrainers;
        return this.http.get(url);
    }

    //GetCalendarDetails Get Method
    public GetTableDetails(){
        let url = Appsettings.BASE_URL + Appsettings.GetTableDetails;
        return this.http.get(url);
    }
    
    //GetCoursesAttended Post method
    public GetCoursesAttended(name){
        let url = Appsettings.BASE_URL+Appsettings.CoursesAttended;
        return this.http.post(url,name);
    }

    public GetCalendarDetails(name){
        let url = Appsettings.BASE_URL + Appsettings.GetCalendarDetails;
        return this.http.post(url,name);
    }

}