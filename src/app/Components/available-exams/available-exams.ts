import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentExamService } from '../../Services/student-exam-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-available-exams',
   standalone: true,
  imports: [RouterLink, CommonModule, NavBar],
  templateUrl: './available-exams.html',
  styleUrl: './available-exams.css'
})
export class AvailableExams  implements OnInit{
  exams: any[] = [];
  constructor ( private StudentExamservice : StudentExamService , private cdr : ChangeDetectorRef) {}
  ngOnInit() :void {
    this.StudentExamservice.getAvailableExams().subscribe({
  next: (data) => {
    this.exams = data;
    console.log(data);
    this.cdr.detectChanges();
  },
  error: (err) => console.error('Failed to load exams', err)
});

  }

    // Used to optimize *ngFor rendering
  trackById(index: number, exam: any): number {
    return exam.id;
  }

}
