import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { LazyLoadEvent, MessageService } from 'primeng/api';
import { OrderService } from '../../services/order.service';
import { BaseResponseDto } from '../../interfaces/baseResponseDto';
import { PageableDto } from '../../interfaces/pageableDto';
import { DatePipe } from '@angular/common';
import { ViaggiDto, ViaggiService } from '../../services/viaggi.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html',
  providers: [DatePipe, MessageService]
})
export class DashboardComponent implements OnInit {

  viaggi: any[] = [];
  page: number = 1;
  resultsPerPage: number = 10;
  totalRecords: number;
  loading: boolean = true;
  first: number = 0;
  rowId: string = "viaggioId";
  lastLazyLoad: LazyLoadEvent = null;
  request: any = null;
  columns: any[] = [
    {
      header: "Identificativo viaggio",
      field: "viaggioId"
    },
    {
      header: "Descrizione",
      field: "descrizioneViaggio"
    },
    {
      header: "Data Partenza",
      field: "dataPartenza"
    },
    {
      header: "Data Arrivo",
      field: "dataArrivo"
    }
  ];
  errors: any[] = [];

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private viaggiService: ViaggiService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
  }

  load(event: LazyLoadEvent = null) {
    if (event === null) {
      event = this.lastLazyLoad;
    }

    this.loading = true;
    this.lastLazyLoad = event;

    if (this.request) {
      this.request.unsubscribe();
    }

    this.viaggiService.getAll(
      this.page,
      this.resultsPerPage,
      this.orderService.parse(event)
    ).subscribe((resp: BaseResponseDto<PageableDto<ViaggiDto[]>>) => {
      if (resp.status == 200 && resp.success) {
        this.viaggi = resp.response.data;
        this.viaggi.sort((a: ViaggiDto, b: ViaggiDto) => {
          let dateA = new Date(a.dataPartenza);
          let dateB = new Date(b.dataPartenza);
          return dateA.getTime() - dateB.getTime();
        });
        this.viaggi.forEach((v: ViaggiDto) => {
          v.dataPartenza = this.datePipe.transform(v.dataPartenza, "dd/MM/yyyy");
          v.dataArrivo = this.datePipe.transform(v.dataArrivo, "dd/MM/yyyy");
        });
        this.totalRecords = resp.response.totalCount;
        this.resultsPerPage = resp.response.resultsPerPage;
        event.rows = resp.response.resultsPerPage;
        event.first = 0;
      }
      if (resp.error) {
        this.errors.push("Si è verificato un errore");
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Si è verificato un problema',
          detail: 'Impossibile caricare i viaggi'
        });
      }
      this.loading = false;
    });
  }

  onPage(event) {
    this.page = event.first / event.rows + 1;
    this.load();
  }

  onClick(viaggio: ViaggiDto) {
    console.log(viaggio);
    this.router.navigate(["dashboard", viaggio.viaggioId]);
  }

}
