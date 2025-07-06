import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iregisteruser } from '../Models/iregisteruser';
import { Ilogin } from '../Models/ILogin';
 

@Injectable({
  providedIn: 'root'
})
export class Authsrvices {
 private baseUrl = '/api/Account';
  constructor(private http: HttpClient,
  ) { }

  //register service 
  register(user:Iregisteruser) :Observable<any>{
    return this.http.post(`${this.baseUrl}/register`,user);
  }

 Login(user:Ilogin) :Observable<any>{
  return this.http.post(`${this.baseUrl}/login`, user);

 }

}
