
import { Injectable } from '@angular/core';
import  {jwtDecode}  from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthHelperServices {

  constructor() { }
  //key to use it instesd use 'token'=> only clean code
  private tokenKey = 'token';
  //
  //adding behavior subject to remove reload func 
   isLoggedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
   isLogged = this.isLoggedSubject.asObservable();

  //method to save token in localstorage
  saveToken(token: string): void{
    localStorage.setItem(this.tokenKey,token);
    this.isLoggedSubject.next(true);
  }
  
  //get token from local storage
  getToken():string | null {
    return localStorage.getItem(this.tokenKey);
  }
  //method to remove token from local storage
  removeToken(): void{
    localStorage.removeItem(this.tokenKey);
    this.isLoggedSubject.next(false);
  }

  //if user is logged in or not
  isLoggedIn():boolean{
    return !!this.getToken();
  }
  //decode token to ge info from it 

  decodeToken():any |null{
    const decodedToken = this.getToken();
    if(decodedToken){
      try{
        return jwtDecode<any>(decodedToken);
      }catch(error){
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
  //get user role from token 
  // getUserRole():string | null{
  //   const decoded = this.decodeToken();
  //   return decoded ? decoded.role : null;
  // }
  getUserRole(): string | null {
  const decoded = this.decodeToken();
  if (!decoded) return null;

  
  return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      || decoded["role"]
      || null;
}

  //get user name from decoded token
  getUserName():string |null{
    const decoded = this.decodeToken();
   return decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || null;
    //==> optional chaining 
  }

}
