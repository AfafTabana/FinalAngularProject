import { Routes } from '@angular/router';
import { Login } from './AuthComponent/login/login';
import { Registeration } from './AuthComponent/registeration/registeration';
import { authGuard } from './Guards/Guards/auth-guard';
import { AddQuestion } from './Components/add-question/add-question';
import { ExamQuestions } from './Components/exam-questions/exam-questions';
import { GetQuestionList } from './Components/get-question-list/get-question-list';
import { AllStudentComponent } from './Components/all-student/all-student';
import { Edit } from './Components/edit/edit';
import { StudentComponent } from './Components/student-component/student-component';
import { Exams } from './pages/exams/exams';
import { ExamDetails } from './pages/exam-details/exam-details';
import { ExamForm } from './pages/exam-form/exam-form';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {path: 'login',component : Login},
    {path: 'register',component : Registeration},
    //add path to check authenticatin Guard 
    //this mesn if user have token he can go to exams component
    //{path: 'exams',component: Exams ,canActivate : [authGuard]},
    {path: '',redirectTo : '/register',pathMatch : 'full'},
     {path : 'Add' , component : AddQuestion } ,
    {path : 'Get' , component : ExamQuestions} , 
    {path : 'GetList' , component : GetQuestionList} , 
    { path: 'Questions/:id/edit', component: Edit } , 
    {path :'AllStudents' , component : AllStudentComponent} , 
    {path: 'student/:id' , component :StudentComponent} ,
     { path: 'exams', component: Exams },
     { path: 'exams/:id', component: ExamDetails },
      { path: 'exams/:id/edit', component: ExamForm },
      { path: '**', component: NotFound }
   
];
