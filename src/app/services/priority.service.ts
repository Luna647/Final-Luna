
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Priority } from '../models/priority.model';


const baseUrl =  AppSettings.API_ENDPOINT + "/priority";

@Injectable({
  providedIn: 'root'
})

export class PriorityService {
  constructor(private http: HttpClient) {}

  listarPrioridad(): Observable<Priority[]> {
    return this.http.get<Priority[]>(`${baseUrl}/listaPriority`);
  }

}
