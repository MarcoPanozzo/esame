import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../modules/shared.modules';
import { CommonModule } from '@angular/common';
import { DettaglioViaggiComponent } from './dettaglio-viaggi/dettaglio-viaggi.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [ DashboardComponent, DettaglioViaggiComponent ]
})
export class DashboardModule { }
