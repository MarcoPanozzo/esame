import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { DateViaggiDto } from "./dateViaggi.service";

export interface ViaggiDto {
    viaggioId: number;
    descrizioneViaggio: string;
    dataPartenza: any;
    dataArrivo: any;
    date: DateViaggiDto[];
}

@Injectable({
    providedIn: 'root'
})
export class ViaggiService {

    constructor(
        private http: HttpClient
    ) {

    }

    getAll(page: number, resultsPerPage: number, sort: any): Observable<any> {
        const url = environment.host + environment.endpoint.viaggi 
        '?page=' + (Number.isNaN(page) ? 0 : page - 1) +
        (resultsPerPage !== null ? '&resultsPerPage=' + resultsPerPage : '') +
        (sort ? '&order=' + sort : '');

        return this.http.get(url);
    }

    getById(id: number) {
        const url = environment.host + environment.endpoint.viaggi + id;
        return this.http.get(url);
    }
    
}