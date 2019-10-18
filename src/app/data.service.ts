import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { Schedule } from './Schedule';
import { Subscription } from 'rxjs';
import { Discipline } from './Discipline';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public onlineOffline: boolean;
  private REST_API_SERVER = "https://flask-scheduleubb.azurewebsites.net";
  //private REST_API_SERVER = "http://192.168.43.107:5000";
  public data: Schedule[];
  
  private subject = new ReplaySubject(1);
  private subjectData = new ReplaySubject(1);
  private subjectAlert = new ReplaySubject(1);

  async wrongDataAlert() {
    const alert = await this.alertController.create({
      message: '<strong>Datele introduse sunt gresite!</strong>',
      backdropDismiss: true,
      buttons: ['OK']
    });

    await alert.present();
  }


  getSettingsTab(): Observable<any> {
      return this.subject.asObservable();
  }

  getAlertMessage(): Observable<any> {
    return this.subjectAlert.asObservable();
  }

  getDataTab(): Observable<any> {
    return this.subjectData.asObservable();
  }

  showSettingsTab() {
    console.log("Vad ca a intrat aici!")
    this.subject.next();
  }

  showAlertTab(){
    this.subjectAlert.next();
  }

  nextData(){
    this.subjectData.next();
  }

  clear(){
    this.subject = new ReplaySubject(1);
    this.subjectAlert = new ReplaySubject(1);
  }

  constructor(private httpClient: HttpClient,
              private alertController: AlertController){ 
    this.onlineOffline = navigator.onLine;
    this.verifyCompatibility();
  } 

  public verifyCompatibility(){
    if(this.isValid())
        this.nextData();
      else{
          this.showSettingsTab();
          //this.clear();
      }
  }

  modifyDiscipline($item: any, state) {
    var dataString = localStorage.getItem("schedule");
    var data:Schedule[]  = JSON.parse(dataString);
    var days:string[] = ["Luni", "Marti", "Miercuri", "Joi", "Vineri"];
    for(var day of days)
      for(var i in data[day])
        if(data[day][i]["day"]==$item["day"] && 
        data[day][i]["time"]==$item["time"] && 
        data[day][i]["weekly"]==$item["weekly"] && 
        data[day][i]["room"]==$item["room"] && 
        data[day][i]["formation"]==$item["formation"] && 
        data[day][i]["type"]==$item["type"] && 
        data[day][i]["title"]==$item["title"] &&
        data[day][i]["author"]==$item["author"]){
            data[day][i]["isActive"] = state;
            var dataString = JSON.stringify(data) 
            localStorage.setItem('schedule', dataString);
            this.nextData();
            return;
       }
  }

  public shareData(day:string){
    var dataString = localStorage.getItem("schedule");
    var data:Schedule[]  = JSON.parse(dataString);
    var rez:Discipline[] = []
    for(var discipline of data[day])
      if(discipline["isActive"])
        rez.push(discipline)
    
    return rez;                                                             
 }

 public getData(){
  var dataString = localStorage.getItem("schedule"); 
  var data:Schedule[]  = JSON.parse(dataString);
  return data;
 }

 public shareAllData(day:string){
    var dataString = localStorage.getItem("schedule");
    console.log(dataString);
    var data:Schedule[]  = JSON.parse(dataString);
    var rez:Discipline[] = []
    for(var discipline of data[day])
        rez.push(discipline)
    console.log("__________________")
    console.log("******************")
    console.log(rez)
    return rez;                                                             
}

  public isValid(){
    console.log(localStorage.getItem('schedule'));
    if(localStorage.getItem('schedule')!=null){
      return true;
    }
    console.log("Ar trebui ok")
    return false;
  }

  public sendGetRequest(group,semiGroup, semester, year){
    this.httpClient.get(this.REST_API_SERVER + "/schedule", {
      params: {
        group: group,
        semigroup: semiGroup,
        semester: semester,
        year: year,
      }
    }).subscribe((data: Schedule[])=>{
      console.log(data);
      if(data["Error"]!=null){
        this.wrongDataAlert();
      }
      else{
        var dataString = JSON.stringify(data) 
        console.log(dataString)
        localStorage.setItem('schedule', dataString);
        this.nextData();
        this.clear();
      }
    })
  }
}
