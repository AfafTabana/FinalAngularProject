import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IQuestion } from '../../Models/IQuestion';
import { QuestionService } from '../../Services/question-service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-get-question-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-question-list.html',
  styleUrl: './get-question-list.css'
})
export class GetQuestionList implements OnInit {
  constructor(private QuestionService : QuestionService , private cdr : ChangeDetectorRef , private router : Router ){}
  @Input({ required: true }) questions: IQuestion[] = [];
  @Output() questionDeleted = new EventEmitter<number>();
  Exam_id! : number ;
  
  ngOnInit() {
    console.log('Initial questions:', this.questions);
    this.Exam_id = this.questions[0].exam_id ;
    
  
  }

  onEdit(Question_id: number , q : any) {
  this.router.navigate([`/Questions/${Question_id}/edit`], {
    state: { question: q }
  });
  }

  onDelete(Question_id: number) {
     if (confirm('Are you sure you want to delete this question?')) {
      this.QuestionService.DeleteQuestion(Question_id).subscribe({
        next: () => this.questionDeleted.emit(this.Exam_id),
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }
  

}