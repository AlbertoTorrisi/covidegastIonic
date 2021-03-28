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

  async openModalEditPatient(patient) {
    const modal = await this.modalController.create({
      component: ModalEditPatientComponent,
      componentProps: {
        name: patient.name,
        address: patient.address,
        fiscal_code: patient.fiscal_code,
        phone: patient.phone,
        email: patient.email,
        positive: patient.positive,
      },
    });
    await modal.present();

    const { data: patientModified, role } = await modal.onWillDismiss();
    if (role === 'saved') {
      const index =
        this.patients &&
        this.patients.findIndex((patient) => patient.name === patient.name);
      console.log(index);
      console.log(patientModified.value);

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
    console.log(this.patients)
  }
}
