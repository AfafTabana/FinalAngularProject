import { Component } from '@angular/core';
import {Ilogin } from '../../Models/ILogin';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Authsrvices } from '../../Services/authsrvices';
import { AuthHelperServices } from '../../Services/auth-helper-services';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule , RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  LoginForm = new FormGroup({
    userName : new FormControl('',[Validators.required,Validators.minLength(4)]),
    password : new FormControl('',[Validators.required])
  });


  constructor(private router : Router,
    private loginservice : Authsrvices,
    private authhelper : AuthHelperServices
  ){}

  get getUserName(){
    return this.LoginForm.controls['userName'];
  }
  get getPassword(){
    return this.LoginForm.controls['password'];
  }

  loginUser(){
    if(this.LoginForm.status == 'VALID'){
      const logindata = this.LoginForm.value as Ilogin;
      this.loginservice.Login(logindata).subscribe({
        next :(response) =>{
          console.log("success login",response);
          this.authhelper.saveToken(response.token);
          const role = this.authhelper.getUserRole();
          //after update
          console.log("Role from token:", role);

          if(role == 'Admin'){
            this.router.navigate(['/exams']);
            console.log("Decoded Token:", this.authhelper.decodeToken());

          }else if(role == 'User'){
            
                const username = this.authhelper.getUserName();
  
                console.log("Role from token:", role);
                 console.log("Username from token:", username);
            
            this.router.navigate(['/AllExams']);
            
            
          }else {
            // this.router.navigate(['/unauthorized']);
            console.log( role);
            console.log("unauthorized");
          }
         
        },
        error :(error) => {
          console.log("failed login",error);
        }
      });
       
    }
    else{
      this.LoginForm.markAllAsTouched();
    }
  }

navigateToRegister() {
  this.router.navigate(['/register']);
}
}
