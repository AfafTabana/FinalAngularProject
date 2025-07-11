import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExamService } from '../../Services/exam-service';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule , RouterLink],
  templateUrl: './exam-form.html',
  styleUrl: './exam-form.css',
})
export class ExamForm implements OnInit {
  examId: any;

  constructor(
    private ExamServices: ExamService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ExamForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    category: new FormControl('', Validators.required),
    createdAt: new FormControl('', Validators.required),
    min_grade: new FormControl('', Validators.required),
    grade: new FormControl('', Validators.required),
    questions: new FormArray([]),
  });

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: (params) => {
        this.examId = params.get('id');

        if (this.examId && this.examId !== '0') {
          
          this.ExamServices.getExamById(this.examId).subscribe({
            next: (response) => {
              this.getName.setValue(response.name);
              this.getCategory.setValue(response.category);
              this.getCreatedAt.setValue(response.createdAt);
              this.getMinGrade.setValue(response.min_grade.toString());
              this.getGrade.setValue(response.grade.toString());

              this.questions.clear();
            },
          });
        } else {
          this.examId = 0;
        }
      },
    });
  }

  get getName() {
    return this.ExamForm.controls['name'];
  }
  get getCategory() {
    return this.ExamForm.controls['category'];
  }
  get getCreatedAt() {
    return this.ExamForm.controls['createdAt'];
  }
  get getMinGrade() {
    return this.ExamForm.controls['min_grade'];
  }
  get getGrade() {
    return this.ExamForm.controls['grade'];
  }
  get questions(): FormArray {
    return this.ExamForm.get('questions') as FormArray;
  }

  addQuestion() {
    const questionGroup = new FormGroup({
      grade: new FormControl('', Validators.required),
      header: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      correct_Answer: new FormControl('', Validators.required),
      fWrong_Answer: new FormControl('', Validators.required),
      sWrong_Answer: new FormControl('', Validators.required),
    });

    this.questions.push(questionGroup);
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  addExam() {
    if (this.ExamForm.valid) {
      const examToSend: any = {
        name: this.getName.value,
        category: this.getCategory.value,
        createdAt: this.getCreatedAt.value,
        min_grade: Number(this.getMinGrade.value),
        grade: Number(this.getGrade.value),
      };

      if (this.examId == 0 || this.examId === '0') {
        examToSend['questions'] = this.questions.value;

        this.ExamServices.addExam(examToSend).subscribe({
          next: () => {
            this.router.navigate(['/exams']);
          },
        });
      } else {
        this.ExamServices.editExam(this.examId, examToSend).subscribe({
          next: () => {
            this.router.navigate(['/exams']);
          },
        });
      }
    } else {
      console.log('fix errors');
    }
  }
}








