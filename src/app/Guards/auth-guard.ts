import { CanActivateFn } from '@angular/router';
import { AuthHelperServices } from '../Services/auth-helper-services';

import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  // //check token found or not => ahmed is   8 :00 am 
  // const token = localStorage.getItem('token');
  // //exist return true else return false
  // return !!token;
  //==================ssing new way=================//
  //inject AuthHelperServices using inject because 
  //(canActivateFn) is a file function not a class

  const authheper = inject(AuthHelperServices);
  return authheper.isLoggedIn();
};
