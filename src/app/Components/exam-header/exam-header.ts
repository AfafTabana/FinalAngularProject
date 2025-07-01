import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-exam-header',
  imports: [FormsModule ,RouterLink],
  templateUrl: './exam-header.html',
  styleUrl: './exam-header.css'
})
export class ExamHeader {
  constructor(private router:Router){}
  examId!:string | null;
  searchById(){
    if(this.examId != null && this.examId != undefined){
      this.router.navigate(['/exams',this.examId]);
    }
  }
}
