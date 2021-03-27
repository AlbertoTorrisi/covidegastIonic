import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
   
 constructor(public modalController: ModalController) {
 
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

    const {data, role} = await modal.onWillDismiss();
    console.log(data);
 }

   ngOnInit() {}
 
 }
 