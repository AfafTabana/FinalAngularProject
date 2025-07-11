import { AfterViewInit, Component, Directive, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthHelperServices } from '../../Services/auth-helper-services';


declare var bootstrap: any;
@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
@Component({
  selector: 'app-nav-bar',
  imports: [ RouterLink , RouterLinkActive  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar implements OnInit  , AfterViewInit {
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
 ngAfterViewInit() {
    // Initialize dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
      new bootstrap.Dropdown(dropdown);
    });
  }


  //add logout function 
  logout():void{
    this.authhelper.removeToken();
     this.closeAllDropdowns();
    //this.role = null;
     
  }

    mobileMenuOpen = false;
  dropdownStates: { [key: string]: boolean } = {
    adminDropdown: false,
    profileDropdown: false
  };

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleDropdown(dropdownId: string) {
    // Close all other dropdowns first
    Object.keys(this.dropdownStates).forEach(key => {
      if (key !== dropdownId) {
        this.dropdownStates[key] = false;
      }
    });
    
    // Toggle the clicked dropdown
    this.dropdownStates[dropdownId] = !this.dropdownStates[dropdownId];
  }

  closeDropdown(dropdownId: string) {
    this.dropdownStates[dropdownId] = false;
  }

  closeAllDropdowns() {
    Object.keys(this.dropdownStates).forEach(key => {
      this.dropdownStates[key] = false;
    });
    this.mobileMenuOpen = false;
  }

  logout2() {
    // Your logout logic here
    this.closeAllDropdowns();
  }
}



