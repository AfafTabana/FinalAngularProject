import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExam } from '../Models/iexam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
   baseUrl:string="/api/Exam"
  constructor(private http:HttpClient) { }
  getAllExams():Observable<IExam[]>{
    return this.http.get<IExam[]>(this.baseUrl);
  }
  getExamById(examId:any):Observable<IExam>{
    return this.http.get<IExam>(`${this.baseUrl}/searchBy/${examId}`);
  }
  addExam(exam:any):Observable<IExam>{
    return this.http.post<IExam>(this.baseUrl,exam);
  }
  editExam(examId:any,exam:any){
    return this.http.put(`${this.baseUrl}/${examId}`,exam);
  }
  deleteExam(examId:any):Observable<IExam>{
    return this.http.delete<IExam>(`${this.baseUrl}/${examId}`);
  }
}
