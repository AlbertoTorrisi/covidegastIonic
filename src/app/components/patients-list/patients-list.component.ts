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
    if (role === 'deletePatient'){
      console.log("ciao", patientModified);
      await (await this.patientService.deletePatient(patientModified)).subscribe(
        (Response) => {
          console.log('Patient Deleted');
        },
        (error) => {
          console.log(error.error && error.error);
        }
      );
      const alert = await this.alertCtrl.create({
        header: 'Deteled',
        message: 'Deleted successfly!',
        buttons: ['Close'],
      });
      await alert.present();
    }
    this.patients = await this.patientService.getAllPatients();
  }

  //con questa funzioen dovrebbe aggiornarsi la lista però non so come chiamarla. tramite (ionChange) sull'html non va
  async ngOnChanges(){   
    console.log("sono su receive patient"); 
    this.patients = await this.patientService.getAllPatients();
    this.patients.push(this.addPatientService.getPatient());
  }

  async ngOnInit() {
    this.patients = await this.patientService.getAllPatients();
    console.log(this.patients)
  }
}
