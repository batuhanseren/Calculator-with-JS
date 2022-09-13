// const container = document.querySelector(".container");

// for (let i = 0; i <= 9; i++) {
//   let div = document.createElement("div");
//   div.className = "btn";
//   container.append(div);
//   div.innerHTML = i;
// }
class Calculator {
  constructor(conclusionPreviousTextElement, conclusionCurrentTextElement) {
    this.conclusionPreviousTextElement = conclusionPreviousTextElement;
    this.conclusionCurrentTextElement = conclusionCurrentTextElement;
    this.clear();
  }

  clear() {
    this.conclusionCurrent = "";
    this.conclusionPrevious = "";
    this.operation = undefined;
  }

  delete() {
    this.conclusionCurrent = this.conclusionCurrent.toString().slice(0, -1)
  }
  appendNumber(number) {
    if(number === "." && this.conclusionCurrent.includes("."))return
  
      this.conclusionCurrent = this.conclusionCurrent.toString() + number.toString()
  }

  chooseOperation(operation) {
    if(this.conclusionCurrent === "") return
    if(this.conclusionPrevious !== ""){
      this.compute()
    }
    this.operation = operation
    this.conclusionPrevious = this.conclusionCurrent
    this.conclusionCurrent = ""
  }
  compute() {

    let computation
    const prev = parseFloat(this.conclusionPrevious)
    const current = parseFloat(this.conclusionCurrent)
    if(isNaN(prev) || isNaN(current)) return
    switch(this.operation){
      case "+" : 
        computation = prev + current
        break
     case "-" : 
        computation = prev - current
        break
      case "*" : 
        computation = prev * current
        break
      case "/" : 
        computation = prev / current
        break
      default:
        return
       
    }
    this.conclusionCurrent = computation
    this.operation = undefined
    this.conclusionPrevious = ""
  }
  getDisplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split(".")[0])
    const decimalDigits = stringNumber.split(".")[1]
    let integerDisplay
    if(isNaN(integerDigits)){
      integerDisplay = ""
    } else{
      integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0})
    }
    if (decimalDigits != null) {
      return  `${integerDisplay}.${decimalDigits}`
    }else{
      return integerDisplay
    }
    
    
  }
  updateDisplay() {
    this.conclusionCurrentTextElement.innerText =this.getDisplayNumber (this.conclusionCurrent)
    if (this.operation != null) {
      this.conclusionPreviousTextElement.innerText = 
        `${this.getDisplayNumber(this.conclusionPrevious)} ${this.operation}`
    }else{
      this.conclusionPreviousTextElement.innerText = ""
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-allClear]");

const conclusionPreviousTextElement = document.querySelector(
  "[data-conclusion-Previous]"
);
const conclusionCurrentTextElement = document.querySelector(
  "[data-conclusion-current]"
);
const calculator = new Calculator(
  conclusionPreviousTextElement,
  conclusionCurrentTextElement
);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    
  })
});

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    
  })
});
equalsButton.addEventListener("click", button => {
  calculator.compute()
  calculator.updateDisplay()
})
allClearButton.addEventListener("click", button => {
  calculator.clear()
  calculator.updateDisplay()
})
deleteButton.addEventListener("click", button => {
  calculator.delete()
  calculator.updateDisplay()
})


