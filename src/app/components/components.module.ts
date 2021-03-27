import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ModalsModule } from './modals/modals.module';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { SwabsListComponent } from './swabs-list/swabs-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PatientAddComponent } from './patient-add/patient-add.component';



@NgModule({
  declarations: [LoginComponent, LogoutComponent,PatientsListComponent,SwabsListComponent, PatientAddComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, ReactiveFormsModule, ModalsModule
  ],
  exports:[LoginComponent, LogoutComponent,PatientsListComponent,SwabsListComponent,PatientAddComponent],
})
export class ComponentsModule { }
