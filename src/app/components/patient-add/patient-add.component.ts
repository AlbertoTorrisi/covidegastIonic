import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAddPatientComponent } from '../modals/modal-add-patient/modal-add-patient.component';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss'],
})
export class PatientAddComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalAddPatientComponent,
    });
     await modal.present();
 
     const {data: newPatient, role} = await modal.onWillDismiss();

  }
}
