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
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
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
        redirectTo: '/tabs/tab2',
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
