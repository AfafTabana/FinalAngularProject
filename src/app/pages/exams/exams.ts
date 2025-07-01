import { Component } from '@angular/core';
import { ExamHeader } from '../../Components/exam-header/exam-header';
import { ExamList } from '../../Components/exam-list/exam-list';

@Component({
  selector: 'app-exams',
  imports: [ExamHeader,ExamList],
  templateUrl: './exams.html',
  styleUrl: './exams.css'
})
export class Exams {

}
