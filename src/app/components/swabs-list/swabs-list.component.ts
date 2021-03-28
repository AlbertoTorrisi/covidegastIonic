import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Swab, SwabCalendar } from 'src/app/interface/list-of-swabs';
import { SwabsService } from 'src/app/services/swabs.service';
import { ModalEditSwabComponent } from '../modals/modal-edit-swab/modal-edit-swab.component';

@Component({
  selector: 'app-swabs-list',
  templateUrl: './swabs-list.component.html',
  styleUrls: ['./swabs-list.component.scss'],
})
export class SwabsListComponent implements OnInit {
  swabs: undefined[] | SwabCalendar = [];
  public daysSelected: string[] = [];
  public daysSelectedContent: any[] = [];

  swabToUpdate: Swab;

  constructor(
    public modalController: ModalController,
    private alertCtrl: AlertController,
    private swabService: SwabsService
  ) {}

  async openModalEditSwab({
    swab_id,
    team_id,
    date,
    type,
    done,
    positive_res,
    name,
    phone,
    address,
    patient_id,
  }: Swab) {
    const modal = await this.modalController.create({
      component: ModalEditSwabComponent,
      componentProps: {
        swab_id,
        team_id,
        date,
        type,
        done,
        positive_res,
        name,
        phone,
        address,
        patient_id,
      },
    });
    await modal.present();

    const { data: swabModified, role } = await modal.onWillDismiss();

    const alert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Saved successfly!',
      buttons: ['Close'],
    });
    await alert.present();
  }

  /*
  async openModal(swab:Swab){
    const modal = await this.modalController.create({
      component: ModalEditSwabComponent,
      componentProps: {
        swab_id: swab.swab_id,
        team_id:  swab.team_id,
        date:  swab.date,
        type:  swab.type,
        done:  swab.done,
        positive_res:  swab.positive_res,
        name:  swab.name,
        phone:  swab.phone,
        address:  swab.address,
        patient_id:  swab.patient_id,
      },

    });
  }
*/

  async ngOnInit() {
    // this.swabs = await this.swabService.allSwabs();
  }
}
