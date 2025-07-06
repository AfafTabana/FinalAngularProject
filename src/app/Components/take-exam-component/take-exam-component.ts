import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentExamService } from '../../Services/student-exam-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-take-exam-component',
  standalone: true,
  imports: [CommonModule ,  FormsModule],
  templateUrl: './take-exam-component.html',
  styleUrls: ['./take-exam-component.css']
})
export class TakeExamComponent implements OnInit {
   examId! : number ; 
   examData : any ;
    answers: { [questionId: number]: string } = {};
    isSubmitting = false;
  constructor ( private StudentExamService : StudentExamService , private route: ActivatedRoute , private router: Router , private cdr : ChangeDetectorRef) {} 
  ngOnInit(): void {
     this.examId = +this.route.snapshot.paramMap.get('id')!;
     this.StudentExamService.getExamToTake(this.examId).subscribe({
       next : (data)=> { this.examData = data ,  console.log('Exam data loaded:', data); this.cdr.detectChanges();} , 
       error: (err) => console.error('Error loading exam:', err)

     });
  }
submitExam(): void  {
  if (!this.examData) return;

    this.isSubmitting = true;

     const payload = {
      studentId: 8, 
      examId: this.examData.id,
      answers: Object.entries(this.answers).map(([questionId, answer]) => ({
        questionId: +questionId,
        answer: answer
      }))
    };
    
     this.StudentExamService.submitExam(payload).subscribe({
      next: (response) => {
        console.log('Exam submitted successfully', response);

        alert('Exam submitted successfully!');
       this.router.navigate(['/exam-result', this.examId]);
      },
      error: (err) => {
        console.error('Error submitting exam:', err);
        alert('Failed to submit exam.');
      },
      complete: () => this.isSubmitting = false
    });

}
}
