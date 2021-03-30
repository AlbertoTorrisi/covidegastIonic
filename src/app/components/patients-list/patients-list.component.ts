import { PatientsService } from './../../services/patients.service';
import { Component, Input, OnInit } from '@angular/core';
// import { EmailValidator } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalEditPatientComponent } from '../modals/modal-edit-patient/modal-edit-patient.component';
import { Patient } from 'src/app/interface/list-of-patients';
import { AddPatientService } from 'src/app/services/add-patient.service';
@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit {
  @Input() patients: void | Patient[] = [];
  //newPatients: void | Patient
  constructor(
    public modalController: ModalController,
    private alertCtrl: AlertController,
    private patientService: PatientsService,
    private addPatientService: AddPatientService
  ) {}
  async deletePatient(patientId) {
    const res = await this.patientService.deletePatient(patientId);
    this.patients
      ? (this.patients = this.patients.filter(
          ({ patient_id }) => patient_id !== patientId
        ))
      : null;
  }
  async openModalEditPatient(patient) {
    const modal = await this.modalController.create({
      component: ModalEditPatientComponent,
      componentProps: {
        id: patient.patient_id,
        name: patient.name,
        address: patient.address,
        fiscal_code: patient.fiscal_code,
        phone: patient.phone,
        email: patient.email,
        hasCovid: patient.hasCovid,
      },
    });
    await modal.present();

    const { data: patientModified, role } = await modal.onWillDismiss();
    if (role === 'saved') {
      const index =
        this.patients &&
        this.patients.findIndex(
          ({ patient_id }) => patient.patient_id === patient_id
        );
      this.patients[index].address = patientModified.value.address;
      this.patients[index].phone = patientModified.value.phone;
      this.patients[index].email = patientModified.value.email;
      if (patientModified.value.hasCovid == null) {
        this.patients[index].hasCovid = 0;
      } else {
        this.patients[index].hasCovid = Number(patientModified.value.hasCovid);
      }
      const res = await this.patientService.updatePatient(
        this.patients[index].patient_id,
        this.patients[index].name,
        this.patients[index].address,
        this.patients[index].email,
        this.patients[index].phone,
        this.patients[index].hasCovid,
        this.patients[index].dob,
        this.patients[index].fiscal_code
      );

      const alert = await this.alertCtrl.create({
        header: 'Success',
        message: 'Saved successfly!',
        buttons: ['Close'],
      });
      res && (await alert.present());
    }
  }

  async ngOnInit() {
    this.patients = await this.patientService.getAllPatients();
  }
}
