import { Component } from '@angular/core';
import {Ilogin } from '../../Models/ILogin';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Authsrvices } from '../../Services/authsrvices';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  LoginForm = new FormGroup({
    userName : new FormControl('',[Validators.required,Validators.minLength(4)]),
    password : new FormControl('',[Validators.required])
  });


  constructor(private router : Router,private loginservice : Authsrvices){}

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
          localStorage.setItem('token',response.token);
          this.router.navigate(['/exams']);
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


}
