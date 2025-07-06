import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentExamService } from '../../Services/student-exam-service';

@Component({
  selector: 'app-all-student-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-student-results.html',
  styleUrl: './all-student-results.css'
})
export class AllStudentResults implements OnInit {
   allResults: {
    studentName: string;
    results: { examName: string; grade: number }[];
  }[] = [];

  isLoading = false;
  error = '';
  constructor(private studentExamService: StudentExamService , private cdr : ChangeDetectorRef) {}
 ngOnInit(): void {
    this.loadAllResults();
  }

  loadAllResults(): void {
    this.isLoading = true;
    this.studentExamService.getAllStudentResults().subscribe({
      next: (data) => {
        this.allResults = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to load student results.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
