import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwabsTabPage } from './swabsTab.page';

const routes: Routes = [
  {
    path: '',
    component: SwabsTabPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwabsTabPageRoutingModule {}
