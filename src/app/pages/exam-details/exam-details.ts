import { ExamService } from './../../Services/exam-service';
import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { IExam } from '../../Models/iexam';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-exam-details',
  imports: [RouterLink,CommonModule , RouterLinkActive],
  templateUrl: './exam-details.html',
  styleUrl: './exam-details.css'
})
export class ExamDetails implements OnInit {
  exam?:IExam;
  examId !:string | null;
  constructor(
    private ExamServices:ExamService,
    private activatedRoute:ActivatedRoute,
    private cdr:ChangeDetectorRef 
  ){}

  ngOnInit(): void {
      this.examId=this.activatedRoute.snapshot.paramMap.get('id');
      if (this.examId) {
      this.ExamServices.getExamById(this.examId).subscribe({
        next:(response)=>{
          this.exam=response;
          console.log(response);
          this.cdr.detectChanges();

        },
        error:(err)=>{
          console.log('error fetching exam details',err);
        }
      });
  }else{
 console.warn('No exam ID found in route.');
  }}

  // Component
get passingPercentage(): number {
  return this.exam ? (this.exam.min_grade / this.exam.grade) * 100 : 0;
}
}
