import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalEditPatientComponent } from '../modals/modal-edit-patient/modal-edit-patient.component';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit {

  
  patients:any = [
    {
     name:"pippo",
     surname:"della piana",
     address:"piazza borgo 130",
     phone:"380193232",
     email: "pippo@mail.com",
     positive: false
   },
   {
     name:"jonh",
     surname:"doe",
     address:"via etnea 130",
     phone:"380193232",
     email: "jonhDoe@mail.com",
     positive: true
   }
 ];
   
 constructor(public modalController: ModalController, private alertCtrl: AlertController) {
 
 }
 
 async openModal(account) {
   const modal = await this.modalController.create({
     component: ModalEditPatientComponent,
     componentProps:{
       name: account.name,
       surname:account.surname,
       address:account.address,
       phone:account.phone,
       email:account.email,
       positive:account.positive
      }     
   });
    await modal.present();

    const {data: patientModified, role} = await modal.onWillDismiss();
    if(role === 'saved'){
      const index = this.patients.findIndex(patient=> patient.name === account.name)
      console.log(index)
      console.log(patientModified.value)
      
      this.patients[index].address = patientModified.value.address;
      this.patients[index].phone = patientModified.value.phone;
      this.patients[index].email = patientModified.value.email;
      if(patientModified.value.positive == null){
        this.patients[index].positive = false;
      }else{
        this.patients[index].positive = patientModified.value.positive;
      }
      const alert = await this.alertCtrl.create({header:"Success", message:"Saved successfly!", buttons:["Close"]})
      await alert.present()
    }
    
  }

   ngOnInit() {}
 
 }
 