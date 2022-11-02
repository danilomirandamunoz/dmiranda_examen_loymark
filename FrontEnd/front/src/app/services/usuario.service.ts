import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url:string;
  constructor(private http:HttpClient) {
    this.url = "http://localhost:5063/usuario";
   }

  get(){
    let query = `${this.url}/get`;
    return this.http.get(query).pipe(map((data) => data));
  }

  delete(id:number){
    let query = `${this.url}/delete/${id}`;
    return this.http.delete(query).pipe(map((data) => data));
  }

  add(usuario: UsuarioModel){
    let query = `${this.url}/add`;
    return this.http.post(query, usuario).pipe(map((data) => data));
  }

  update(usuario: UsuarioModel){
    let query = `${this.url}/update`;
    return this.http.put(query, usuario).pipe(map((data) => data));
  }

  // mapearLista<T>(items: object): T[] {
  //   const lista: T[] = [];
  //   Object.keys(items).forEach(key => {
  //       const item: T = items[key];
  //       lista.push(item);
  //   });
  //   return lista;
  // }

  // asignar<T>(item): T {
  //   return Object.assign(<T>{}, item);
  // }
}
