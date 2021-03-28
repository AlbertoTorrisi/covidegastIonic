import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginTabPage } from './loginTab.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LoginTabPageRoutingModule } from './loginTab-routing.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: LoginTabPage }]),
    LoginTabPageRoutingModule,
  ],
  declarations: [LoginTabPage],
})
export class LoginTabPageModule {}
