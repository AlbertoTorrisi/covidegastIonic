import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsTab } from './patientsTab.page';

const routes: Routes = [
  {
    path: '',
    component: PatientsTab,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsTabRoutingModule {}
