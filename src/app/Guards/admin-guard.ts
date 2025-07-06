import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthHelperServices } from '../Services/auth-helper-services';
import { Router } from '@angular/router';
export const adminGuard: CanActivateFn = (route, state) => {
   //inject authhelper service
   const authhelper = inject(AuthHelperServices);
   const router = inject(Router); 
    // Check if the user is an admin
    const role =  authhelper.getUserRole();
    if(role == 'Admin'){
      return true ;

    }else {
      router.navigate(['/unauthorized']);
      return false;
    }
  
   
};
