import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculator';
  input:string = '';
  result:string = '';
  error:string='';
  
 
  appuyerNum(num: string) {
    
    //Do Not Allow . more than once
    if (num==".") {
      if (this.input !="" ) {
 
        const lastNum=this.getLastOperand()
        console.log(lastNum.lastIndexOf("."))
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }
 
    //Do Not Allow 0 at beginning. 
    //Javascript will throw Octal literals are not allowed in strict mode.
    /*if (num=="0") {
      if (this.input=="" ) {
        this.error="You cant start an operand with 0";
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+')  {
          return;
      }
    }*/
 
    this.input = this.input + num
    this.calcAnswer();
  }
 
 
  getLastOperand() {
    let pos:number;
    console.log(this.input)
    pos=this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos=this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos=this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos=this.input.lastIndexOf("/")
    console.log('Last '+this.input.substr(pos+1))
    return this.input.substr(pos+1)
  }
 
 
  appuyerOp(op: string) {
 
    //Interdire d'ecrire deux operateurs de suite
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+'|| lastKey==='%' )  {
      this.error = "You can't write two operators in a row";
      return;
    }
   
    this.input = this.input + op
    this.calcAnswer();
  }
 
 
  effacer() {
    if (this.input !="" ) {
      this.input=this.input.substr(0, this.input.length-1)
    }
  }
 
  toutEffacer() {
    this.result = '';
    this.input = '';
  }
 
  calcAnswer() {
    let formula = this.input;
    this.error='';
    let lastKey = formula[formula.length - 1];
    let twolast = formula.substr(formula.length-2);
    let flast = formula.substr(formula.length-5);
    if (lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    lastKey = formula[formula.length - 1];
 
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.' || lastKey==='(' || lastKey===')' )  {
      formula=formula.substr(0,formula.length - 1);
      if(twolast==='**'){
        formula=formula.substr(0,formula.length - 2);
      }
    }
    
    console.log("Formula " +formula);
    this.result = eval(formula);
    if (formula != ''){
      if(isNaN(parseFloat(this.result))) {
      
        this.result = '';
        this.error = 'Maths Error';
      }
    }
    
  }
 
  getReponse() {
    this.calcAnswer();
    this.input = this.result;
  }
}
