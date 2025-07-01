import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  //check token found or not => ahmed is   8 :00 am 
  const token = localStorage.getItem('token');
  //exist return true else return false
  return !!token;
};
