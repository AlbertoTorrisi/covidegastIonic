import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSwabComponent } from './swab/modal-swab.component';
import { ModalPatientComponent } from './patient/modal-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ModalPatientComponent, ModalSwabComponent],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  exports: [ModalPatientComponent, ModalSwabComponent],
})
export class ModalsModule {}
