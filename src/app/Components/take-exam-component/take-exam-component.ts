import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentExamService } from '../../Services/student-exam-service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../Services/student-service';
import { AuthHelperServices } from '../../Services/auth-helper-services';

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
  constructor ( private StudentExamService : StudentExamService , 
    private route: ActivatedRoute , private router: Router , private cdr : ChangeDetectorRef ,
     private StudentService : StudentService , private authhelper:AuthHelperServices) {} 
  ngOnInit(): void {
     this.examId = +this.route.snapshot.paramMap.get('id')!;
     this.StudentExamService.getExamToTake(this.examId).subscribe({
       next : (data)=> { this.examData = data ,  console.log('Exam data loaded:', data); this.cdr.detectChanges();} , 
       error: (err) => console.error('Error loading exam:', err)

     });
  }
   Name : string |null = null;
submitExam(): void  {
  if (!this.examData) return;

    this.isSubmitting = true;
    this.Name = this.authhelper.getUserName();
     // Declare studentIdd variable
    this.StudentService.getStudentsByUsername(this.Name).subscribe({
      next: (students) => {
        if (students.length > 0) {
          const payload = this.processStudentExam(students[0].id); 
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

          
        } else {
          console.error('No student found with the given username');
          this.isSubmitting = false;
        }
      },
      error: (err) => {
        console.error('Error fetching student by username:', err);
        this.isSubmitting = false;
      }
    });


 

    
}

processStudentExam(studentIdd: number) {
  const payload = {
    studentId: studentIdd,
    examId: this.examData.id,
    answers: Object.entries(this.answers).map(([questionId, answer]) => ({
      questionId: +questionId,
      answer: answer
    }))
  };
  return payload;
}
}
