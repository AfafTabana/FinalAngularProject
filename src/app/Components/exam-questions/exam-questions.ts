import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { QuestionService } from '../../Services/question-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IQuestion } from '../../Models/IQuestion';
import { GetQuestionList } from '../get-question-list/get-question-list';
import { CommonModule } from '@angular/common';
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-exam-questions',
  standalone: true,
  imports: [ReactiveFormsModule, GetQuestionList, CommonModule, NavBar],
  templateUrl: './exam-questions.html',
  styleUrl: './exam-questions.css'
})
export class ExamQuestions implements OnInit {
  QuestionForm!: FormGroup;
  questions: IQuestion[] = [];
  isLoading = false;
  errorMessage = '';
  hasSubmitted = false;

  constructor(private QuestionOfExam: QuestionService , private cdr : ChangeDetectorRef) {}

  ngOnInit(): void {
    this.QuestionForm = new FormGroup({
      Exam_id: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    if (this.QuestionForm.invalid) return;

    this.hasSubmitted = true; 
    this.isLoading = false;
    this.QuestionOfExam.GetQuestionByExamId(this.QuestionForm.value.Exam_id)
      .subscribe({
        next: (res: IQuestion[]) => {
          this.questions = [...res];
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.questions = []; 
          console.error('Error:', err);
        }
      });
  }

  handleQuestionDeleted(examId: number) {
    this.refreshQuestions(examId);
  }

  private refreshQuestions(examId: number) {
    this.isLoading = true;
    this.QuestionOfExam.GetQuestionByExamId(examId).subscribe({
      next: (res) => {
        this.questions = [...res];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to refresh questions';
      }
    });
  }
}
