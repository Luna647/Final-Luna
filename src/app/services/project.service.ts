
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Project } from '../models/project.model';



const baseUrl =  AppSettings.API_ENDPOINT + "/project";

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  constructor(private http: HttpClient) {}

  listarProject(): Observable<Project[]> {
    return this.http.get<Project[]>(`${baseUrl}/listaProject`);
  }

}
