
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Kind } from '../models/kind.model';

const baseUrl =  AppSettings.API_ENDPOINT + "/kind";

@Injectable({
  providedIn: 'root'
})

export class KindService {
  constructor(private http: HttpClient) {}

  listarTipo(): Observable<Kind[]> {
    return this.http.get<Kind[]>(`${baseUrl}/listaKind`);
  }

}
