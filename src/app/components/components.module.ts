import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ModalsModule } from './modals/modals.module';
import { SwabsListComponent } from './swabs-list/swabs-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwabAddComponent } from './swab-add/swab-add.component';
import { AlertsModule } from './alerts/alerts.module';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    SwabsListComponent,
    SwabAddComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ModalsModule,
  ],
  exports: [
    LoginComponent,
    LogoutComponent,
    SwabsListComponent,
    SwabAddComponent,
  ],
})
export class ComponentsModule {}
