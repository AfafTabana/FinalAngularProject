import { Component } from '@angular/core';
import { ExamHeader } from '../../Components/exam-header/exam-header';
import { ExamList } from '../../Components/exam-list/exam-list';
import { NavBar } from "../../Components/nav-bar/nav-bar";

@Component({
  selector: 'app-exams',
  imports: [ExamHeader, ExamList, NavBar],
  templateUrl: './exams.html',
  styleUrl: './exams.css'
})
export class Exams {

}
