import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { BaseResponseDto } from '../../../interfaces/baseResponseDto';
import { ServiceResponse } from '../../../interfaces/serviceResponse';
import { DateViaggiDto } from '../../../services/dateViaggi.service';
import { ViaggiDto, ViaggiService } from '../../../services/viaggi.service';

@Component({
  selector: 'app-dettaglio-viaggi',
  templateUrl: './dettaglio-viaggi.component.html',
  styleUrls: ['./dettaglio-viaggi.component.scss'],
  providers: [DatePipe, MessageService]
})
export class DettaglioViaggiComponent implements OnInit {

  dateViaggi: any[] = [];
  loading: boolean = true;
  first: number = 0;
  rowId: string = "dataId";
  id: number;
  columns: any[] = [
    {
      header: "Identificativo tappa",
      field: "tappaId",
      table: "tappe"
    },
    {
      header: "Città",
      field: "citta",
      table: "tappe"
    },
    {
      header: "Data",
      field: "data",
      table: "dateViaggi"
    },
  ];
  columnsPacchetti: any[] = [
    {
      header: "Identificativo pacchetto",
      field: "pacchettoId"
    },
    {
      header: "Descrizione",
      field: "descrizionePacchetto"
    }
  ];
  errors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private viaggiService: ViaggiService,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) { 
  }

  ngOnInit(): void {
    console.log("dettaglio");
    this.route.params.subscribe(values => {
      this.id = Number.parseInt(values['id']);
    });
  }

  load() {
    this.viaggiService.getById(this.id).subscribe((resp: BaseResponseDto<ServiceResponse<ViaggiDto>>) => {
      if (resp.status == 200 && resp.success) {
        this.dateViaggi = resp.response.data.date;
        this.dateViaggi.sort((a: DateViaggiDto, b: DateViaggiDto) => {
          let dateA = new Date(a.data);
          let dateB = new Date(b.data);
          return dateA.getTime() - dateB.getTime();
        });
        this.dateViaggi.forEach((dv: DateViaggiDto) => {
          dv.data = this.datePipe.transform(dv.data, "dd/MM/yyyy");
        });
      }
      if (resp.error) {
        this.errors.push("Si è verificato un errore");
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Si è verificato un problema',
          detail: 'Impossibile caricare il viaggio'
        });
      }
      this.loading = false;
    });
  }

}
