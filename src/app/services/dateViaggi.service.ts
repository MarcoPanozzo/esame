import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { TappeDto } from "./tappe.service";

export interface DateViaggiDto {
    dataId: number;
    data: any;
    viaggioId: number;
    tappaId: number;
    tappa: TappeDto;
}

@Injectable({
    providedIn: 'root'
})
export class DateViaggiService {

    constructor(
        private http: HttpClient
    ) {

    }
    
}