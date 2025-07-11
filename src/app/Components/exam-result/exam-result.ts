import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentExamService } from '../../Services/student-exam-service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../Services/student-service';
import { AuthHelperServices } from '../../Services/auth-helper-services';

@Component({
  selector: 'app-exam-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-result.html',
  styleUrl: './exam-result.css'
})
export class ExamResult implements OnInit{

   examId!: number;
  studentId!: number;
  result: { examName: string; grade: number } | null = null;
  error = '';

    constructor(
    private route: ActivatedRoute,
    private examService: StudentExamService ,
     private cdr: ChangeDetectorRef ,
     private router: Router ,
      private StudentService : StudentService , private authhelper:AuthHelperServices
  ) {}
    Name : string | null  = null ;
  ngOnInit(): void {
    this.examId = +this.route.snapshot.paramMap.get('examId')!;
         this.Name  = this.authhelper.getUserName();
     
      this.StudentService.getStudentsByUsername(this.Name).subscribe({
      next: (students) => {
        if (students.length > 0) {
          const Studentid = students[0].id; 
          this.loadResult(Studentid);
          
        } else {
          console.error('No student found with the given username');
          
        }
      },
      error: (err) => {
        console.error('Error fetching student by username:', err);
        
      }
    });

  
  }

  loadResult(studentid : number ): void {
  
    this.examService.getExamResult(studentid, this.examId).subscribe({
      next: (data) => {
        this.result = data;
        console.log(data);
        this.cdr.detectChanges();
       
      },
      error: (err) => {
        this.error = 'Failed to load result';
        console.error(err);
       
      }
    });
  }

  getGradeColorClass(grade: any, type: string): string {
  const numericGrade = this.isNumeric(grade) ? parseFloat(grade) : 0;
  
  if (typeof grade === 'string' && grade.match(/[A-Fa-f]/)) {
    // Letter grades
    switch(grade.toUpperCase()) {
      case 'A': return type === 'header' ? 'bg-gradient-success' : 
                        type === 'text' ? 'text-success' :
                        type === 'icon-bg' ? 'bg-light-success' :
                        'bg-success';
      case 'B': return type === 'header' ? 'bg-gradient-info' : 
                        type === 'text' ? 'text-info' :
                        type === 'icon-bg' ? 'bg-light-info' :
                        'bg-info';
      case 'C': return type === 'header' ? 'bg-gradient-warning' : 
                        type === 'text' ? 'text-warning' :
                        type === 'icon-bg' ? 'bg-light-warning' :
                        'bg-warning';
      default: return type === 'header' ? 'bg-gradient-danger' : 
                        type === 'text' ? 'text-danger' :
                        type === 'icon-bg' ? 'bg-light-danger' :
                        'bg-danger';
    }
  } else if (this.isNumeric(grade)) {
    // Numeric grades
    if (numericGrade >= 80) return type === 'header' ? 'bg-gradient-success' : 
                                  type === 'text' ? 'text-success' :
                                  type === 'icon-bg' ? 'bg-light-success' :
                                  'bg-success';
    if (numericGrade >= 60) return type === 'header' ? 'bg-gradient-info' : 
                                  type === 'text' ? 'text-info' :
                                  type === 'icon-bg' ? 'bg-light-info' :
                                  'bg-info';
    if (numericGrade >= 40) return type === 'header' ? 'bg-gradient-warning' : 
                                  type === 'text' ? 'text-warning' :
                                  type === 'icon-bg' ? 'bg-light-warning' :
                                  'bg-warning';
    return type === 'header' ? 'bg-gradient-danger' : 
             type === 'text' ? 'text-danger' :
             type === 'icon-bg' ? 'bg-light-danger' :
             'bg-danger';
  }
  return type === 'header' ? 'bg-gradient-primary' : 
           type === 'text' ? 'text-primary' :
           type === 'icon-bg' ? 'bg-light-primary' :
           'bg-primary';
}

getGradeIcon(grade: any): string {
  if (typeof grade === 'string' && grade.match(/[A-Fa-f]/)) {
    switch(grade.toUpperCase()) {
      case 'A': return 'bi-star-fill text-success';
      case 'B': return 'bi-check-circle-fill text-info';
      case 'C': return 'bi-exclamation-triangle-fill text-warning';
      default: return 'bi-x-circle-fill text-danger';
    }
  } else if (this.isNumeric(grade)) {
    const numericGrade = parseFloat(grade);
    if (numericGrade >= 80) return 'bi-star-fill text-success';
    if (numericGrade >= 60) return 'bi-check-circle-fill text-info';
    if (numericGrade >= 40) return 'bi-exclamation-triangle-fill text-warning';
    return 'bi-x-circle-fill text-danger';
  }
  return 'bi-question-circle-fill text-primary';
}

isNumeric(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

goBackToExams() {
  this.router.navigate(['/AllExams']); // or your exams route path
}

}
