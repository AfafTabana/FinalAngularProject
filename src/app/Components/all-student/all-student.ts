import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Students } from '../../Models/students.model';
import { StudentService } from '../../Services/student-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-student-list',
  imports: [CommonModule, RouterLink, FormsModule, NavBar],
  templateUrl: './all-student.html',
  styleUrls: ['./all-student.css']
})
export class AllStudentComponent implements OnInit {
  students: Students[] = [];
  searchId: number | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.error = null;
    
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to load students';
        this.isLoading = false;
        console.error(err);
        this.cdr.detectChanges();
      }
    });
  }

  search(): void {
    if (!this.searchId) return;
    
    // Navigate directly to the student details route with the ID
    this.router.navigate(['/student', this.searchId]);
  }

  clearSearch(): void {
    this.searchId = null; // Clear the search input
    this.loadStudents(); // Reload all students
    this.cdr.detectChanges(); // Ensure view updates
  }
}