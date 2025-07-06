import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthHelperServices } from '../Services/auth-helper-services';
import { Router } from '@angular/router';
export const userGuard: CanActivateFn = (route, state) => {
   //inject authhelper service
   const authhelper = inject(AuthHelperServices);
   const router = inject(Router); 
    // Check if  it have role user
    const role =  authhelper.getUserRole();
    if(role == 'User'){
      return true ;

    }else {
      router.navigate(['/unauthorized']);
      return false;
    }
  
   
};