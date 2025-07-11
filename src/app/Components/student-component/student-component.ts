import { Component, OnInit } from '@angular/core';
import { Student } from '../../Models/student.model';
import { StudentService } from '../../Services/student-service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-student',
  imports: [CommonModule],
  templateUrl: './student-component.html',
  styleUrls: ['./student-component.css']
})
export class StudentComponent implements OnInit {
  studentId: number = 2; 
  student: Student | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private studentService: StudentService,private cdr: ChangeDetectorRef,private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.getStudentIdFromRoute();
  }

private getStudentIdFromRoute(): void {
    // Get ID from route parameters
    this.route.params.subscribe(params => {
      this.studentId = +params['id']; // Convert string to number
      this.loadStudentDetails();
    });
    
  }


  loadStudentDetails(): void {
    this.isLoading = true;
    this.error = null;
    
    this.studentService.getStudentDetails(this.studentId).subscribe({
      next: (data) => {
        console.log('Student details loaded:', data);
        this.student = data;
        this.isLoading = false;
        this.cdr.detectChanges();
       
      },
      error: (err) => {
        this.error = 'Failed to load student details';
        this.isLoading = false;
        console.error(err);
        console.log('Error loading student details:', err);
        this.cdr.detectChanges();
      }
    });
  }

  loadStudent(): void {
  if (!this.studentId) {
    console.error('No student ID available to load');
    return;
  }

  this.isLoading = true;
  this.error = null;
  
  this.studentService.getStudentDetails(this.studentId).subscribe({
    next: (data) => {
      this.student = data;
      this.isLoading = false;
      this.cdr.detectChanges();
      console.log('Student details loaded successfully:', data);
    },
    error: (err) => {
      this.error = 'Failed to load student details. Please try again.';
      this.isLoading = false;
      this.cdr.detectChanges();
      console.error('Error loading student details:', err);
    }
  });
}
goBack(): void {
  window.history.back();
}
}
