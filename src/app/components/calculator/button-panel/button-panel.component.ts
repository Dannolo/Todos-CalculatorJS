import { Component, OnInit } from '@angular/core';

// Math Library to get more accurate operations

import Big from "big.js";

import { State } from '../../../models/state';

 /** Create the clickable panel part of the calculator.
 * @param value: string     contains current value;
 * 
 * @function setDisplay(Button): void   core function where we get the button.name that we clicked and we update the Display going throught calculate function.
 * Same logic used in react Calculator, but modified in some lines to get it working with Angular and to modify how 
 * the calculator works.
 * 
 * Some auxiliary functions are imported like IsNumber (used to understand if that value is a Number)
 * and operate (used to operate the calculator with the Big library)
 * 
 * @param state:State   class that contains all our numbers
 * @param buttonName:string    What we clicked
 */




@Component({
  selector: 'app-button-panel',
  templateUrl: './button-panel.component.html',
  styleUrls: ['./button-panel.component.css']
})
export class ButtonPanelComponent implements OnInit {

    value: string;

    state: State = {
    total: "0",
    next: null,
    operation: null
  };

  constructor() {
  }

  ngOnInit(): void {

  }

  catchButton(button): void {

    this.setDisplay(this.calculate(this.state, button.target.innerText))

  }

  setDisplay(obj): void {

    this.setValue(obj.total)
    this.setNext(obj.next)
    this.setOperation(obj.operation)

    if(obj.total == null && obj.next == null && obj.operation == null){
      this.state = this.clearDisplay()
    }

    if(obj.next != null){
      this.setShowedValue(this.state.next)
    }else{
      this.setShowedValue(this.state.total)
    }
  }

//  Auxiliary function for Calculate

isNumber(item) {
  return /[0-9]+/.test(item);
}

operate(numberOne, numberTwo, operation) {
  const one = Big(numberOne || "0");
  const two = Big(numberTwo || (operation === "÷" || operation === 'x' ? "1": "0")); //If dividing or multiplying, then 1 maintains current value in cases of null
  
  if (operation === "+") {
    return one.plus(two).toString();
  }
  if (operation === "-") {
    return one.minus(two).toString();
  }
  if (operation === "x") {
    return one.times(two).toString();
  }
  if (operation === "÷") {
    if (numberTwo === "0") {
      return "0";
    } else {
      return one.div(two).toString();
    }
  }
  throw Error(`Unknown operation '${operation}'`);
}

//  Auxiliary function for setDisplay

setValue(value: string): void {
  this.state.total = value;
}

setNext(value: string): void {
  this.state.next = value;
}

setOperation(value: string): void {
  this.state.operation = value;
}

clearDisplay(): State{
  return {
    total: "0",
    next: null,
    operation: null
  }
}

setShowedValue(value: string): void{
  this.value = value;
}

// Main logic

/** calculate logic
 * 
 * Given a button name and a calculator data state, return an updated
 * calculator data state.
 *
 * Calculator data state contains:
 *   total:String      the running total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 * 
 * USAGE
 * 
 * AC: returns all at starting point with 0 as first number (state.total);
 * 0 - 9: selects that number;
 * . : makes the number decimal;
 * %: does percentage of that number;
 * +/-: change sign;
 * (+, -, x, /, =): do their operations;
 * 
 * Other comments are on written directly in the functions code
 */

calculate(state: State, buttonName: string) {

  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null,
    };
  }

  if (this.isNumber(buttonName)) {
    if (buttonName === "0" && state.next === "0") {
      return {
        total: state.total,
        next: state.next,
        operation: state.operation
      };
    }

    // If there is an operation, update next
    if (state.operation) {
      if (state.next) {
        return {
          total: state.total,
          next: state.next + buttonName,
          operation: state.operation
        };
      }
      return { total: state.total, next: buttonName, operation: state.operation };
    }

    // If there is no operation, update next and clear the value
    if (state.next) {
      const next = state.next === "0" ? buttonName : state.next + buttonName;
      return {
        next,
        total: null,
        operation: state.operation
      };
    }
    return {
      next: buttonName,
      total: null,
      operation: state.operation
    };
  }

  if (buttonName === "%") {
    if (state.next) {
      return {
        total: state.total,
        next: Big(state.next)
          .div(Big("100"))
          .toString(),
        operation: state.operation
      };
    }
    if (state.total && !state.next) {
      return {
        total: Big(state.total)
          .div(Big("100"))
          .toString(),
        next: state.next,
        operation: state.operation
      };
    }
    return {
      total: state.total,
      next: state.next,
      operation: state.operation
    };
  }

  if (buttonName === ".") {
    if (state.next) {
      // ignore a . if the next number already has one
      if (state.next.includes(".")) {
        return {
          total: state.total,
          next: state.next,
          operation: state.operation
        };
      }
      return { total: state.total, next: state.next + ".", operation: state.operation };
    }

    return { total: state.total, next: "0.", operation: state.operation };
  }

  if (buttonName === "=") {
    if (state.next && state.operation) {
      return {
        total: this.operate(state.total, state.next, state.operation),
        next: null,
        operation: null,
      };
    } else {
      // '=' with no operation, nothing to do
      return {
        total: state.total,
        next: state.next,
        operation: state.operation,
      };
    }
  }

  // changing sign, next or total in Float and go back to string
  if (buttonName === "+/-") {
    if (state.next) {
      return { total: state.total, next: (-1 * parseFloat(state.next)).toString(), operation: state.operation };
    }
    if (state.total) {
      return { total: (-1 * parseFloat(state.total)).toString(), next: state.next, operation: state.operation };
    }
    return { total: state.total, next: state.next, operation: state.operation };
  }

  // Button must be an operation

  // User pressed an operation button and there is an existing operation
  // Case when you already put all state value and you want to make another operations to the result

  if (state.operation) {
    return {
      total: this.operate(state.total, state.next, state.operation),
      next: null,
      operation: buttonName,
    };
  }

  // no operation yet, but the user typed one

  // The user hasn't typed a number yet, just save the operation
  if (!state.next) {
    return {
      total: state.total,
      next: state.next,
      operation: buttonName,
    };
  }

  // save the operation and shift 'next' into 'total'
  return {
    total: state.next,
    next: null,
    operation: buttonName,
  };
}


}
