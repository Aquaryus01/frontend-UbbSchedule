import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../data.service';
import { Schedule } from '../Schedule';
import { Discipline } from '../Discipline';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor(private modalCtrl: ModalController,
              private dataService: DataService) { }

  schedules: Discipline[];
  index: boolean[];
  title: string;
  type: string;
  time: string;
  day: string;
  author: string;
  adress: string;
  room: string;
  

  expand(poz, discipline){
    if(this.index[poz]==true)
      this.index[poz] = false;
    else{
      for(let i=0; i< this.schedules.length; i++){
        if(poz==i)
          this.index[i] = true;
        else
          this.index[i] = false;
      }
    }
    
    this.title = discipline["title"]
    this.type = discipline["type"]
    this.time = discipline["time"]
    this.day = discipline["day"]
    this.author = discipline["author"]
    this.adress = discipline["adress"]
    this.room = discipline["room"]
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  changeStateInactive($item){
    $item["isActive"] = false;
    this.dataService.modifyDiscipline($item, false);
  }

  changeStateActive($item){
    $item["isActive"] = true;
    this.dataService.modifyDiscipline($item, true);
  }

  ngOnInit() {
    
    if(this.dataService.isValid()){
      
      var Days =["Marti", "Miercuri", "Joi", "Vineri"] 
      this.schedules = this.dataService.shareAllData("Luni");
      for(var day of Days)
        for(var element of this.dataService.shareAllData(day))
            this.schedules.push(element);

      var size = this.schedules.length;
      this.index = new Array(size);
      this.index.fill(false, 0, size);
    }
  
  }

}
