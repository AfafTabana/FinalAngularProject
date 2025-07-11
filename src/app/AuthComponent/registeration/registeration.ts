import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authsrvices } from '../../Services/authsrvices';
import { Iregisteruser } from '../../Models/iregisteruser';
import { Router, RouterModule } from '@angular/router';
import { NavBar } from "../../Components/nav-bar/nav-bar";

@Component({
  selector: 'app-registeration',
  imports: [ReactiveFormsModule, CommonModule, NavBar , RouterModule],
  templateUrl: './registeration.html',
  styleUrl: './registeration.css'
})
export class Registeration {
  Registerform  = new FormGroup({
    userName:new FormControl('',[Validators.required, Validators.minLength(3)]),
    email:new FormControl('',[Validators.required, Validators.email]),
    password:new FormControl('',[Validators.required, Validators.minLength(8)]),
    confirmPassward:new FormControl('',[Validators.required, Validators.minLength(8)]),
  });
  constructor(private registerserve : Authsrvices,private router : Router){}

  get getUserName(){
    return this.Registerform.controls['userName'];

  }
  get getEmail(){
    return this.Registerform.controls['email'];
  }
  get getPassword(){
    return this.Registerform.controls['password'];
  }
  get getConfirmPassword(){
    return this.Registerform.controls['confirmPassward'];
  } 
  Adduser(){
     if(this.Registerform.status == "VALID"){
      //put data in object user 
      const user = this.Registerform.value as Iregisteruser;
      // send user to server and reply 
      this.registerserve.register(user)
      .subscribe({
        next : (response : any) => {
          console.log("success register",response);
          this.Registerform.reset();
          this.router.navigate(['/login']);
        },
        error : (error : any) => {
          console.log("failed register",error);
        }
      });
     }else{
       console.log("not valid");
       this.Registerform.markAllAsTouched();
     };
  }

  
  goHome() {
    this.router.navigate(['/home']);
  }
  navigateToLogin() {
  this.router.navigate(['/login']);
}


}
