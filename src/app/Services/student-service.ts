import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../Models/student.model'; 
import { Students } from '../Models/students.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = '/api/Student';

  constructor(private http: HttpClient) { }

   getAllStudents(): Observable<Students[]> {
    return this.http.get<Students[]>(this.apiUrl);
  }
  

  getStudentDetails(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/details/${id}`);
  }
}