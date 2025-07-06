import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentExamService } from '../../Services/student-exam-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-student-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-student-results.html', 
  styleUrl: './get-student-results.css'
})
export class GetStudentResults implements OnInit {

   studentId = 8; 
  results: { examName: string; grade: number }[] = [];
  result!: { examName: string; grade: number };
  isLoading = false;
  error: string = '';

  constructor (private StudentExamService : StudentExamService ,  private route: ActivatedRoute , private cdr : ChangeDetectorRef
  ){}
  ngOnInit(): void {
    const examId = this.route.snapshot.paramMap.get('id');
      this.loadResults();
  }

  loadResults(): void {
  this.isLoading = true;
     this.StudentExamService.getStudentResults(this.studentId).subscribe({
      next :(data)=> { this.results = data ; console.log(data) ; this.cdr.detectChanges() }  ,
      error : (err) => {this.error = 'Failed to load student results.';
        console.error(err);
        
      } , 
      complete : ()=> {
        this.isLoading =false ;
      }
     });
}

}
