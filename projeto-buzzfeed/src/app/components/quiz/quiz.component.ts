import { Component, OnInit } from '@angular/core';
import quiz_questions from 'src/assets/data/quiz_questions.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  title:string = "";

  questions:any;
  selectedQuestion:any;
  
  answers:string[] = [];
  selectedAnswer:string = "";

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(quiz_questions){
      this.finished = false;
      this.title = quiz_questions.title;
      
      this.questionIndex = 0;
      this.questionMaxIndex = quiz_questions.questions.length;
      
      this.questions = quiz_questions.questions;
      this.selectedQuestion = this.questions[this.questionIndex];


    }
  }

  playerChoice(value:string){
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep(){
    ++this.questionIndex;
    if(this.questionMaxIndex > this.questionIndex){
      this.selectedQuestion = this.questions[this.questionIndex];
    } else {
      const finalResult:string = await this.checkResult(this.answers);
      this.finished = true;
      this.selectedAnswer = quiz_questions.results[finalResult as keyof typeof quiz_questions.results];
      console.log(this.answers);
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr) => {
      if( arr.filter(item => item === previous).length > 
          arr.filter(item => item === current).length
      ){
        return previous;
      } else {
        return current;
      }
    })

    return result;
  }

}
