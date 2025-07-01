import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuestion } from '../Models/IQuestion';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
   baseURl : string = "/api/Question"
  constructor(private http : HttpClient) { 

  }

   AddQuestion (Question : any) : Observable<IQuestion>{
       return this.http.post<IQuestion>(this.baseURl, Question);
    }

   DeleteQuestion (QuestionId : number ) : Observable<IQuestion>  {
    return this.http.delete<IQuestion>(`${this.baseURl}/${QuestionId}`)
   }

  GetQuestionByExamId(Exam_id: number): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${this.baseURl}/${Exam_id}`);
  }

    EditProduct(QuestionId: number, Question: any) {
    return this.http.put(`${this.baseURl}/${QuestionId}`, Question);
  }
}
