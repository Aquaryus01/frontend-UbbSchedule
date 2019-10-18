import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover-schedule',
  templateUrl: './popover-schedule.component.html',
  styleUrls: ['./popover-schedule.component.scss'],
})
export class PopoverScheduleComponent implements OnInit {

  title: string;
  type: string;
  hour: string;
  day: string;
  author: string;
  adress: string;
  room: string;
  constructor(private dataService: DataService,
              private navParams: NavParams) { }
 
  ngOnInit() {
    this.title = this.navParams.data.title;
    this.type = this.navParams.data.type;
    this.hour = this.navParams.data.hour;
    this.day = this.navParams.data.day;
    this.author = this.navParams.data.author;
    this.adress = this.navParams.data.adress;
    this.room = this.navParams.data.room;
    console.log(this.title + " " + this.day);
  }

  editSchedule(){
      //this.dataService.editSchedule();
  }

}
