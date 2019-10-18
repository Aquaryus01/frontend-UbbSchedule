import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Discipline } from "../Discipline";
import { AlertController, ToastController, PopoverController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverScheduleComponent } from '../popover-schedule/popover-schedule.component';
import { Schedule } from '../Schedule';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  
  schedules: Discipline[]

  orar: Schedule[];
  constructor(private dataService: DataService,
              private alertController: AlertController,
              private route: Router,
              public toastController: ToastController,
              public popoverController: PopoverController) { 
  }

  currentPopover = null;


  async presentPopover(discipline: Discipline) {
    const popover = await this.popoverController.create({
      component: PopoverScheduleComponent,
      componentProps: {
        "title": discipline["title"],
        "type": discipline["type"],
        "hour": discipline["time"],
        "day": discipline["day"]
      },
      translucent: true,
      animated: true,
      showBackdrop: true
    });

    return await popover.present();
  }

  async presentToast() {
    var title;
    var type;
    var room;
    var time;
    this.orar = this.dataService.getData();
    
    var days = ['Luni', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Luni'];
    var zi = days[new Date().getDay()];

    var timeAux = new Date().getHours()
    var timeArray;
      for(let discipline of this.orar[zi]){
        if(discipline["isActive"]){
          timeArray = discipline["time"].split('-');
          if(timeAux<timeArray[0] || (timeAux>=timeArray[0] && timeAux<=timeArray[1])){
            title = discipline["title"];
            time = timeArray[0]
            type = discipline["type"];
            room = discipline["room"];
            break;
          }
        }
      }

    const toast = await this.toastController.create({
      header: title,
      message: time + " - " +
      room + " - " +
      type,
      color: "light",
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    var param = this.route.url;
    var splitted = param.split("/", ); 
    var day = splitted[2];

    this.dataService.getDataTab().subscribe(() => {
      this.schedules = this.dataService.shareData(day)
    });
      
  }
}

/*
     Componenta cere date la service
     Service-ul verifica daca datele exista:
        exista    - returneaza
        nu exista - apare notificare cu setarile
                  - apeleaza din nou cererea de date
          
*/
