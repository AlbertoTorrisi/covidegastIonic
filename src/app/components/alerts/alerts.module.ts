import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alert404Component } from './alert404/alert404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalsModule } from '../modals/modals.module';
import { ComponentsModule } from '../components.module';

@NgModule({
  declarations: [Alert404Component],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  exports: [Alert404Component],
})
export class AlertsModule {}
