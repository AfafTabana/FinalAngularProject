import { Component, OnInit } from '@angular/core';
import { AuthHelperServices } from '../../Services/auth-helper-services';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavBar } from "../../Components/nav-bar/nav-bar";

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterLinkActive, NavBar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  currentYear: number = new Date().getFullYear();
   //inject authhelper 
    constructor(private authhelper:AuthHelperServices) { }
    role : string |null = null;
    Name : string |null = null;
    //get role to controle show in nav bar
   ngOnInit(): void {
    this.authhelper.isLogged.subscribe((isLogged) => {
      if (isLogged) {
        this.role = this.authhelper.getUserRole();
        this.Name = this.authhelper.getUserName();
      } else {
        this.role = null;
        this.Name = null;
      }
    });
  }
  
    //add logout function 
    logout():void{
      this.authhelper.removeToken();
      //this.role = null;
       
    }
}
