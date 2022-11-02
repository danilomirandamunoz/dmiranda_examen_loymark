import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  url:string;
  constructor(private http:HttpClient) {
    this.url = "https://restcountries.com/v2";
   }

  get(){
    let query = `${this.url}/all`;
    return this.http.get(query).pipe(map((data) => data));
  }
}
