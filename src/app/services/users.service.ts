import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.interface';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // Para que el servicio pueda hacer una petición tiene que inyectar el httpClient
  private httpClient = inject(HttpClient);
  private baseUrl: string = 'https://peticiones.online/api/users';

  // Petición asíncrona con Observable (nativo de Angular)
  // La petición GET se hace a la URL de la API de usuarios, se define el tipo de respuesta que se espera
  getAll(page: number): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.baseUrl}?page=${page}`);	
  }

  getUserById(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.baseUrl}/${id}`);
  }

  delete(id: string): Observable<IUser> {
    return this.httpClient.delete<IUser>(`${this.baseUrl}/${id}`);
  }
}