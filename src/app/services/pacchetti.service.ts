import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export interface PacchettiDto {
    pacchettoId: number;
    descrizionePacchetto: string;
    tappaId: number;
}

@Injectable({
    providedIn: 'root'
})
export class PacchettiService {

    constructor(
        private http: HttpClient
    ) {

    }
    
}