import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentExamService {

   baseURl : string = "/api/StudentExamInteraction"
  constructor(private http : HttpClient) { 

  }

   getAvailableExams(): Observable<any> {
    return this.http.get(`${this.baseURl}/available-exams`);
  }

  getExamToTake(examId: number): Observable<any> {
    return this.http.get(`${this.baseURl}/take-exam/${examId}`);
  }

  submitExam(payload: any): Observable<any> {
    return this.http.post(`${this.baseURl}/submit-exam`, payload);
  }

  getStudentResults(studentId: number): Observable<any> {
    return this.http.get(`${this.baseURl}/student-results/${studentId}`);
  }

  getAllStudentResults(): Observable<any> {
    return this.http.get(`${this.baseURl}/admin/all-results`);
  }

  getExamResult(studentId: number, examId: number): Observable<{ examName: string; grade: number }> {
  return this.http.get<{ examName: string; grade: number }>(
    `${this.baseURl}/exam-result/${studentId}/${examId}`
  );
}

}
