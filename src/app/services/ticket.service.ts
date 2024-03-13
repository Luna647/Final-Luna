import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://localhost:8090/url'; // Asegúrate de que esta URL sea correcta según tu configuración

  constructor(private http: HttpClient) { }

  // Obtiene la lista de usuarios
  getTicket(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/listaTicket`);
  }

  // Añade un nuevo usuario
  addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.baseUrl}/registraTicket`, ticket);
  }

  // Actualiza un usuario existente
  updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.baseUrl}/actualizaTicket`, ticket);
  }

  // Elimina un usuario por su ID
  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminaTicket/${id}`);
  }
}
