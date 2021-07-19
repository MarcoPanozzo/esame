import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { PacchettiDto } from "./pacchetti.service";

export interface TappeDto {
    tappaId: number;
    citta: string;
    pacchetti: PacchettiDto[];
}

@Injectable({
    providedIn: 'root'
})
export class TappeService {

    constructor(
        private http: HttpClient
    ) {

    }
    
}