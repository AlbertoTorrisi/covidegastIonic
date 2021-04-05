import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'patients',
        loadChildren: () =>
          import('../patientsTab/patientsTab.module').then(
            (m) => m.PatientsPageModule
          ),
      },
      {
        path: 'swabsTab',
        loadChildren: () =>
          import('../swabsTab/swabsTab.module').then(
            (m) => m.SwabsTabPageModule
          ),
      },
      {
        path: 'loginTab',
        loadChildren: () =>
          import('../loginTab/loginTab.module').then(
            (m) => m.LoginTabPageModule
          ),
      },
      {
        path: 'notFound',
        loadChildren: () =>
          import('../components/alerts/alerts.module').then(
            (m) => m.AlertsModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/swabsTab',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/loginTab',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
