export interface IQuestion {
  id : number ;
  header: string;          
  correct_Answer: string; 
  fWrong_Answer: string;   
  sWrong_Answer: string;   
  grade: number;           
  type?: string; 
  exam_id : number
}