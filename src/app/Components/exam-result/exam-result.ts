import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentExamService } from '../../Services/student-exam-service';
import { ActivatedRoute } from '@angular/router';

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
     private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.examId = +this.route.snapshot.paramMap.get('examId')!;
    this.studentId = 8;

    if (this.examId && this.studentId) {
      this.loadResult();
    } else {
      this.error = 'Invalid route parameters';
    }
  }

  loadResult(): void {
  
    this.examService.getExamResult(this.studentId, this.examId).subscribe({
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

}
