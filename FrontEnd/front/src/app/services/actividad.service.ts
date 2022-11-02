import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  url:string;
  constructor(private http:HttpClient) {
    this.url = "http://localhost:5063/actividad";
   }

  get(){
    let query = `${this.url}/get`;
    return this.http.get(query).pipe(map((data) => data));
  }
}
