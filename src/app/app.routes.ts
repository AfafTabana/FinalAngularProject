import { Routes } from '@angular/router';
import { Login } from './AuthComponent/login/login';
import { Registeration } from './AuthComponent/registeration/registeration';
import { authGuard } from './Guards/auth-guard';
import { adminGuard } from './Guards/admin-guard';
import { userGuard } from './Guards/user-guard';
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
import { Unauthorizesd } from './pages/unauthorizesd/unauthorizesd';

// export const routes: Routes = [
//     {path: 'login',component : Login},
//     {path: 'register',component : Registeration},
//     //add path to check authenticatin Guard 
//     //this mesn if user have token he can go to exams component
//     //{path: 'exams',component: Exams ,canActivate : [authGuard]},
//     {path: '',redirectTo : '/register',pathMatch : 'full'},
//      {path : 'Add' , component : AddQuestion } ,
//     {path : 'Get' , component : ExamQuestions} , 
//     {path : 'GetList' , component : GetQuestionList} ,
//     { path: 'Questions/:id/edit', component: Edit},
//     {path :'AllStudents' , component : AllStudentComponent} , 
//     {path: 'student/:id' , component :StudentComponent} ,
//     { path: 'exams', component: Exams},
//     { path: 'exams/:id', component: ExamDetails },
//     { path: 'exams/:id/edit', component: ExamForm },
//     {path:'unauthorized',component:Unauthorizesd},
//     { path: '**', component: NotFound }
   
   
// ];
export const routes: Routes = [
  // -------------------------
  // Public Routes
  // -------------------------
  { path: 'login', component: Login },
  { path: 'register', component: Registeration },
  { path: '', redirectTo: '/register', pathMatch: 'full' },

  // -------------------------
  // Protected - Authenticated Only (User OR Admin)
  // -------------------------
  { path: 'exams', component: Exams, canActivate: [authGuard] },
  { path: 'exams/:id', component: ExamDetails, canActivate: [authGuard] },
  { path: 'exams/:id/edit', component: ExamForm, canActivate: [authGuard] },
  { path: 'student/:id', component: StudentComponent, canActivate: [authGuard] },

  // -------------------------
  // Admin Only
  // -------------------------
  { path: 'Add', component: AddQuestion, canActivate: [authGuard, adminGuard] },
  { path: 'Get', component: ExamQuestions, canActivate: [authGuard, adminGuard] },
  { path: 'GetList', component: GetQuestionList, canActivate: [authGuard, adminGuard] },
  { path: 'Questions/:id/edit', component: Edit, canActivate: [authGuard, adminGuard] },
  { path: 'AllStudents', component: AllStudentComponent, canActivate: [authGuard, adminGuard] },

  // -------------------------
  // Unauthorized + Not Found
  // -------------------------
  { path: 'unauthorized', component: Unauthorizesd },
  { path: '**', component: NotFound }
];

