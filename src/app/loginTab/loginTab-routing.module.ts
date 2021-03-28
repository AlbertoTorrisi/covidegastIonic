import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginTabPage } from './loginTab.page';

const routes: Routes = [
  {
    path: '',
    component: LoginTabPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginTabPageRoutingModule {}
