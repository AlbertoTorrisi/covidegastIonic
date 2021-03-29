import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Patient } from 'src/app/interface/list-of-patients';
import { AddPatientService } from 'src/app/services/add-patient.service';
import { PatientsService } from 'src/app/services/patients.service';

import { ModalAddPatientComponent } from '../modals/modal-add-patient/modal-add-patient.component';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss'],
})
export class PatientAddComponent implements OnInit {

  constructor(private modalController: ModalController, private patientsService:PatientsService, private addPatientService:AddPatientService) { }
  @Output() patientToAdd: EventEmitter<any> = new EventEmitter<any>()
  patient:any;
  ngOnInit() {}

  async openAddPatientModal() {
    const modal = await this.modalController.create({
      component: ModalAddPatientComponent,
    });
     await modal.present();
 
     const {data:{value:{address,dateOfBirth, email, fiscalCode, hasCovid, name, phone, surname}}, role} = await modal.onWillDismiss();
     if(role === "add" ){
      this.patient = {
        address: address,
        dateOfBirth: dateOfBirth.substring(0,10),
        email: email,
        fiscalCode: fiscalCode,
        hasCovid: hasCovid ? 0 : 1,
        name: name,
        phone:phone,
        surname: surname,
      }
      console.log(this.patient)
      await this.patientsService.addPatient(name,email,dateOfBirth.substring(0,10),fiscalCode,address,phone, hasCovid ? 0 : 1).then(
          (Response) => {
            console.log('Patient Added');
            //il service funziona ma non so come richiamarlo nella lista...vedi-> patient-list.component.ts funzione reveicePatient() come la facciamo attivare al submit del nuovo utente?
           this.addPatientService.setPatient(this.patient);
          },
          (error) => {
            console.log(error.error && error.error);
          }
        );
     }

  }

  
}
