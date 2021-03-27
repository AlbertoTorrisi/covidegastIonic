import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add-patient',
  templateUrl: './modal-add-patient.component.html',
  styleUrls: ['./modal-add-patient.component.scss'],
})
export class ModalAddPatientComponent implements OnInit {

  formPatient: FormGroup;

  constructor(builder:FormBuilder, private modalCtrl: ModalController) { 
    this.formPatient= builder.group({
      name:["", Validators.required],
      surname:["", Validators.required],
      dateOfBirth:["", Validators.required],
      fiscalCode:["", Validators.required],
      address:["", Validators.required],
      phone:["", Validators.required],
      email:["", Validators.required],
      positive: false
    })
  }

  
  ngOnInit(){}

  dismissModal=()=>{
     this.modalCtrl.dismiss(null, 'cancel')
  }
  
  onSave(){
    this.modalCtrl.dismiss(this.formPatient, 'saved')
  }
}
