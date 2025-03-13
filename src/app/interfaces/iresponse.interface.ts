import { IUser } from './iuser.interface';

// Interfaz para respuesta GET de lista de usuarios páginada
export interface IResponseList {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUser[];
}

// Interfaz para respuesta GET de usuario individual
export interface IResponseSingle {
  data: IUser;
}