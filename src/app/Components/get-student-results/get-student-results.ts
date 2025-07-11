import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentExamService } from '../../Services/student-exam-service';
import { ActivatedRoute } from '@angular/router';
import { NavBar } from "../nav-bar/nav-bar";
import { StudentService } from '../../Services/student-service';
import { AuthHelperServices } from '../../Services/auth-helper-services';

@Component({
  selector: 'app-get-student-results',
  standalone: true,
  imports: [CommonModule, NavBar],
  templateUrl: './get-student-results.html', 
  styleUrl: './get-student-results.css'
})
export class GetStudentResults implements OnInit {

  //studentId = 2; 
  results: { examName: string; grade: number }[] = [];
  result!: { examName: string; grade: number };
  isLoading = false;
  error: string = '';

  constructor (private StudentExamService : StudentExamService ,  private route: ActivatedRoute , 
    private cdr : ChangeDetectorRef , 
     private StudentService : StudentService , private authhelper:AuthHelperServices
  ){}

  Name : string | null  = null ;
  ngOnInit(): void {
    const examId = this.route.snapshot.paramMap.get('id');
     this.Name  = this.authhelper.getUserName();
     
      this.StudentService.getStudentsByUsername(this.Name).subscribe({
      next: (students) => {
        if (students.length > 0) {
          const Studentid = students[0].id; 
          this.loadResults(Studentid);
          
        } else {
          console.error('No student found with the given username');
          
        }
      },
      error: (err) => {
        console.error('Error fetching student by username:', err);
        
      }
    });
  }

  loadResults(studentid : number ): void {
  this.isLoading = true;
     this.StudentExamService.getStudentResults(studentid).subscribe({
      next :(data)=> { this.results = data ; console.log(data) ; this.cdr.detectChanges() }  ,
      error : (err) => {this.error = 'Failed to load student results.';
        console.error(err);
        
      } , 
      complete : ()=> {
        this.isLoading =false ;
      }
     });
}
getGradeBadgeClass(grade: number): string {
  if (grade >= 80) return 'badge-success';
  if (grade >= 60) return 'badge-warning';
  return 'badge-danger';
}


}
