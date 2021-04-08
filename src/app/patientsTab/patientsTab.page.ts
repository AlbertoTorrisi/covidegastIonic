import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ModalPatientComponent } from '../components/modals/patient/modal-patient.component';
import { Patient } from '../interface/patient';
import { PatientsService } from '../services/patients.service';

@Component({
  selector: 'app-patientsTab',
  templateUrl: 'patientsTab.page.html',
  styleUrls: ['patientsTab.page.scss'],
})
export class PatientsTab implements OnInit {
  @Input() patients: void | Patient[] = [];
  patientToAdd: any;
  constructor(
    public modalController: ModalController,
    private alertCtrl: AlertController,
    private patientService: PatientsService
  ) {}
  async ngOnInit() {
    this.patients = await this.patientService.getAllPatients();
  }
  async deletePatient(patientId) {
    const res = await this.patientService.deletePatient(patientId);
    this.patients
      ? (this.patients = this.patients.filter(
          ({ patient_id }) => patient_id !== patientId
        ))
      : null;
  }
  async openModalPatient(patient, editPatient) {
    const modal = await this.modalController.create({
      component: ModalPatientComponent,
      componentProps: {
        id: patient?.patient_id,
        name: patient?.name,
        address: patient?.address,
        fiscal_code: patient?.fiscal_code,
        phone: patient?.phone,
        email: patient?.email,
        hasCovid: patient?.hasCovid,
        editPatient,
      },
    });
    await modal.present();

    const { data: patientModified, role } = await modal.onWillDismiss();
    if (role === 'edit') {
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
        this.patients[index].address,
        this.patients[index].email,
        this.patients[index].phone,
        this.patients[index].hasCovid
      );

      const alert = await this.alertCtrl.create({
        header: 'Success',
        message: 'Saved successfly!',
        buttons: ['Close'],
      });
      res && (await alert.present());
    }
    if (role === 'add') {
      patientModified.value.dob = patientModified.value.dob.substring(0, 10);

      const res = await this.patientService.addPatient(
        patientModified.value.name,
        patientModified.value.email,
        patientModified.value.dob,
        patientModified.value.fiscalCode,
        patientModified.value.address,
        patientModified.value.phone,
        patientModified.value.hasCovid ? 0 : 1
      );
      const alert = await this.alertCtrl.create(
        res
          ? {
              header: 'Added',
              message: 'Added successfly!',
              buttons: ['Close'],
            }
          : {
              header: 'Error',
              message: 'Something went wrong',
              buttons: ['Close'],
            }
      );
      await alert.present();
      this.patients && this.patients.push(patientModified.value);
    }
  }
}
