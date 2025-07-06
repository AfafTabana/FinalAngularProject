import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthHelperServices } from '../../Services/auth-helper-services';

@Component({
  selector: 'app-nav-bar',
  imports: [ RouterLink , RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar implements OnInit {
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
