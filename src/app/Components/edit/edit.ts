import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionService } from '../../Services/question-service';
import { Router, RouterLink } from '@angular/router';
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-edit',
   imports: [
    ReactiveFormsModule,
    NavBar , 
    RouterLink
] ,
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {
  Questionform!: FormGroup;
  q! : any ;

  constructor(private AddQuestionService: QuestionService, private router: Router) {}

  ngOnInit(): void {
    console.log('Edit component initialized');

    // Initialize the form
    this.Questionform = new FormGroup({
      grade: new FormControl(0, [Validators.required]),
      header: new FormControl('', [Validators.required]),
      exam_id: new FormControl(0, [Validators.required]),
      type: new FormControl('', [Validators.required]),
      correct_Answer: new FormControl('', [Validators.required]),
      fWrong_Answer: new FormControl('', [Validators.required]),
      sWrong_Answer: new FormControl('', [Validators.required]),
    });

    // Get question from navigation state
     this.q = history.state['question'];

    if (this.q && this.q.header) {
      this.patchFormWithData(this.q);
    } else {
      console.warn('⚠️ No question data found in navigation state');
      // Optional: fetch from API if needed
    }
    console.log(this.q);
  }
  
  patchFormWithData(q: any) {
    this.getheader.setValue(q.header);
    this.getgrade.setValue(+q.grade);
    this.getcorrect.setValue(q.correct_Answer);
    this.getexam_id.setValue(+q.exam_id);
    this.getfwrong.setValue(q.fWrong_Answer);
    this.getswrong.setValue(q.sWrong_Answer);
    this.gettype.setValue(q.type);
  }

  // Form control getters
  get getgrade() { return this.Questionform.controls['grade']; }
  get getheader() { return this.Questionform.controls['header']; }
  get getexam_id() { return this.Questionform.controls['exam_id']; }
  get gettype() { return this.Questionform.controls['type']; }
  get getcorrect() { return this.Questionform.controls['correct_Answer']; }
  get getfwrong() { return this.Questionform.controls['fWrong_Answer']; }
  get getswrong() { return this.Questionform.controls['sWrong_Answer']; }

  onSubmit() {
  const formData = this.Questionform.value;
  formData.id = this.q.id;
    this.AddQuestionService.EditProduct(this.q.id ,formData).subscribe({
      next: () => {
        this.Questionform.reset();
        console.log('✅ Question Edited');
      },
      error: (err) => {
        console.error('❌ Validation error:', err);
        if (err.status === 400 && err.error?.errors) {
          console.table(err.error.errors);
        }
      }
    });
  }
}
