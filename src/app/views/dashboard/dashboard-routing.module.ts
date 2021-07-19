import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DettaglioViaggiComponent } from './dettaglio-viaggi/dettaglio-viaggi.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Viaggi'
    }
  },
  {
    path: ':id',
    component: DettaglioViaggiComponent,
    data: {
      title: 'Dettaglio del viaggio'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
