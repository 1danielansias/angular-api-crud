import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseList } from '../interfaces/iresponse.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // Para que el servicio pueda hacer una petición tiene que inyectar el httpClient
  private httpClient = inject(HttpClient);
  private baseUrl: string = 'https://peticiones.online/api/users';

  // Petición asíncrona con Observable (nativo de Angular)
  // La petición GET se hace a la URL de la API de usuarios, se define el tipo de respuesta que se espera
  getAll(): Observable<IResponseList> {
    return this.httpClient.get<IResponseList>(this.baseUrl);
  }
}
