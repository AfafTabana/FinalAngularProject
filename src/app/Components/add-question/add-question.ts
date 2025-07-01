import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IQuestion } from '../../Models/IQuestion';
import { QuestionService } from '../../Services/question-service';

@Component({
  selector: 'app-add-question',
  imports: [ReactiveFormsModule],
  templateUrl: './add-question.html',
  styleUrl: './add-question.css'
})
export class AddQuestion implements OnInit{

  constructor(private fb: FormBuilder , private AddQuestionService : QuestionService){}
  Questionform! : FormGroup ; 
  ngOnInit(): void  {

    this.Questionform = new FormGroup({
 
  grade: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
  header: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  exam_id: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
  type: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  correct_Answer: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  fWrong_Answer: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  sWrong_Answer: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
});
  }

  onSubmit(){
    this.AddQuestionService.AddQuestion(this.Questionform.value).subscribe({
      next :()=>{
        this.Questionform.reset();
         console.log("Question Added") ; 
      } , 
        error: (err) => {
    console.error('Validation error:', err);
    if (err.status === 400 && err.error?.errors) {
      console.table(err.error.errors); // ✅ See exactly what failed
    }
  }

    })
  }
}
