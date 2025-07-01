import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Registeration } from "./AuthComponent/registeration/registeration";
import { Login } from "./AuthComponent/login/login";
import { NavBar } from './Components/nav-bar/nav-bar';
import { AddQuestion } from './Components/add-question/add-question';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [  RouterOutlet , NavBar , AddQuestion , FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Examsystemfront';
}
