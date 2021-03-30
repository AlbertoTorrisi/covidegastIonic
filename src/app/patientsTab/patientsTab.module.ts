import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientsTab } from './patientsTab.page';

import { PatientsTabRoutingModule } from './patientsTab-routing.module';
import { ComponentsModule } from '../components/components.module';
import { ModalsModule } from '../components/modals/modals.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PatientsTabRoutingModule,
    ComponentsModule,
    ModalsModule,
  ],
  declarations: [PatientsTab],
})
export class PatientsPageModule {}
