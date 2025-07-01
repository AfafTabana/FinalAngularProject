export interface StudentExam {
  name: string;
  category: string;
  studentGrade: number;
  fullMark: number;
}

export interface Student {
  id: number;
  email: string;
  username: string;
  numberOfFailedExams: number;
  numberOfSuccessfulExams: number;
  studentExams: StudentExam[];
}