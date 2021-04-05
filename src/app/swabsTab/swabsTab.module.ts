import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwabsTabPage } from './swabsTab.page';

import { SwabsTabPageRoutingModule } from './swabsTab-routing.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SwabsTabPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [SwabsTabPage],
})
export class SwabsTabPageModule {}
