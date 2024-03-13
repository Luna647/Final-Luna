
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Status } from '../models/status.model';



const baseUrl =  AppSettings.API_ENDPOINT + "/status";

@Injectable({
  providedIn: 'root'
})

export class StatusService {
  constructor(private http: HttpClient) {}

  listarStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(`${baseUrl}/listaStatus`);
  }
}


