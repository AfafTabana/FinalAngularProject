import { ExamService } from './../../Services/exam-service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { IExam } from '../../Models/iexam';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-exam-list',
  imports: [RouterLink,CommonModule],
  templateUrl: './exam-list.html',
  styleUrl: './exam-list.css'
})
export class ExamList implements OnInit, OnDestroy {
  exams:IExam[]=[];
  mySub!:Subscription;
  

  constructor(
    private ExamServices:ExamService,
    private cdr:ChangeDetectorRef,
    private route:Router
    
  ){}
  ngOnDestroy(): void {
      this.mySub.unsubscribe();
  }
  ngOnInit(): void {
      this.mySub=this.ExamServices.getAllExams().subscribe({
        next:(response) =>{
          this.exams=response;
          this.cdr.detectChanges();
        },
        error:(error)=>{
          console.log(error);
        },
      });
  }
  deleteHandler(examId:string){
    this.ExamServices.deleteExam(examId).subscribe({
      
      next:()=>{
        this.exams = this.exams.filter(exam => exam.id !== examId);
        this.cdr.detectChanges();
      },
    });
  }
}
