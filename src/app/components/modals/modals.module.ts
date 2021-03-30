import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAddSwabComponent } from './modal-add-swab/modal-add-swab.component';
import { ModalPatientComponent } from './patient/modal-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ModalAddSwabComponent,
    ModalPatientComponent,
    ModalAddSwabComponent,
  ],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  exports: [
    ModalAddSwabComponent,
    ModalPatientComponent,
    ModalAddSwabComponent,
  ],
})
export class ModalsModule {}
