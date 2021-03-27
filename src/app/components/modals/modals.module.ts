import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAddPatientComponent } from './modal-add-patient/modal-add-patient.component';
import { ModalAddSwabComponent } from './modal-add-swab/modal-add-swab.component';
import { ModalEditPatientComponent } from './modal-edit-patient/modal-edit-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ModalAddPatientComponent,ModalAddSwabComponent,ModalEditPatientComponent,ModalAddSwabComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, ReactiveFormsModule
  ],
  exports:[ModalAddPatientComponent,ModalAddSwabComponent,ModalEditPatientComponent,ModalAddSwabComponent],
})
export class ModalsModule { }
