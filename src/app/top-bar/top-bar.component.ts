import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Discipline } from '../Discipline';
import { Subscription } from 'rxjs';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  subscription: Subscription;
  year;
  constructor(private dataService: DataService,
              private alertController: AlertController,
              public modalController: ModalController ){ 
      this.dataService.getSettingsTab().subscribe(() => {
        this.presentAlertConfirm();
        console.log("si pe aici");
      }); 
      this.year = (new Date()).getFullYear();
    }

  ngOnInit() {}

  async FilterModal() {
    const modal = await this.modalController.create({
      component: FilterComponent
    });
    return await modal.present();
  }

  async onlineAlert() {
    const alert = await this.alertController.create({
      message: '<strong>No internet acces!</strong>',
      backdropDismiss: true,
      buttons: ['OK']
    });
  }
  
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Settings',
      inputs: [
        {
          name: 'group',
          type: 'text',
          value: window.localStorage.group,
          placeholder: 'Group ex. 221 or 321 etc.'
        },
        {
          name: 'semiGroup',
          type: 'text',
          value: window.localStorage.semigroup,
          placeholder: 'Semigroup ex. 1 or 2'
        },
        {
          name: 'year',
          type: 'text',
          value: this.year,
          placeholder: 'Year'
        },
        {
          name: 'semester',
          type: 'text',
          value: window.localStorage.semester,
          placeholder: 'Semester ex. 1 or 2'
        },
        
      ],
      buttons: [{
          text: 'Confirm',
          handler: (alertData) => {
            if(!this.dataService.onlineOffline)
              this.onlineAlert();
            else{
            this.dataService.sendGetRequest(alertData.group,alertData.semiGroup,
              alertData.semester, alertData.year)
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
