import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8090/url'; // Asegúrate de que esta URL sea correcta según tu configuración

  constructor(private http: HttpClient) { }

  // Obtiene la lista de usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/listaUser`);
  }

  // Añade un nuevo usuario
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/registraUser`, user);
  }

  // Actualiza un usuario existente
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/actualizaUser`, user); // Corregir la URL aquí
  }

  // Elimina un usuario por su ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminaUser/${id}`);
  }

  // Listar usuarios por categoría
  getUsersByCategory(categoryId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/usersByCategory/${categoryId}`);
  }
}
