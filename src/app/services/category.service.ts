
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Category } from '../models/category.model';

const baseUrl =  AppSettings.API_ENDPOINT + "/category";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  constructor(private http: HttpClient) {}

  listarCategoria(): Observable<Category[]> {
    return this.http.get<Category[]>(`${baseUrl}/listaCategory`);
  }

}
