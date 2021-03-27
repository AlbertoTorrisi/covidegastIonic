import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ModalsModule } from './modals/modals.module';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { SwabsListComponent } from './swabs-list/swabs-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [LoginComponent, LogoutComponent,PatientsListComponent,SwabsListComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, ReactiveFormsModule, ModalsModule
  ],
  exports:[LoginComponent, LogoutComponent,PatientsListComponent,SwabsListComponent],
})
export class ComponentsModule { }
