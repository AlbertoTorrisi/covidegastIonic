import { PatientsService } from './../../services/patients.service';
import { Component, OnInit } from '@angular/core';
// import { EmailValidator } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalEditPatientComponent } from '../modals/modal-edit-patient/modal-edit-patient.component';
import { Patient } from 'src/app/interface/list-of-patients';
@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit {
  patients: void | Patient[] = [];

  constructor(
    public modalController: ModalController,
    private alertCtrl: AlertController,
    private patientService: PatientsService
  ) {}

  async openModal(account) {
    const modal = await this.modalController.create({
      component: ModalEditPatientComponent,
      componentProps: {
        name: account.name,
        surname: account.surname,
        address: account.address,
        phone: account.phone,
        email: account.email,
        positive: account.positive,
      },
    });
    await modal.present();

    const { data: patientModified, role } = await modal.onWillDismiss();
    if (role === 'saved') {
      const index =
        this.patients &&
        this.patients.findIndex((patient) => patient.name === account.name);
      this.patients[index].address = patientModified.value.address;
      this.patients[index].phone = patientModified.value.phone;
      this.patients[index].email = patientModified.value.email;
      if (patientModified.value.positive == null) {
        this.patients[index].positive = false;
      } else {
        this.patients[index].positive = patientModified.value.positive;
      }
      const alert = await this.alertCtrl.create({
        header: 'Success',
        message: 'Saved successfly!',
        buttons: ['Close'],
      });
      await alert.present();
    }
  }

  async ngOnInit() {
    this.patients = await this.patientService.getAllPatients();
  }
}
