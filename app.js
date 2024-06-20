function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "x":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
      break;
    default:
      return "error";
  }
}

// Handling user interaction

let calculator = document.querySelector(".calculator");
let input = calculator.querySelector(".input");
let firstOperand = null;
let secondOperand = null;
let operator = null;

function displayInput() {
  let result = ``;
  if (!operator) {
    result = firstOperand ? firstOperand : "0";
  } else {
    result = secondOperand
      ? `${firstOperand}${operator}${secondOperand}`
      : `${firstOperand}${operator}`;
  }
  input.innerHTML = result;
}

calculator.addEventListener("click", (e) => {
  let clickedButton = e.target;
  switch (clickedButton.getAttribute("class")) {
    case "delete":
      if (secondOperand) {
        secondOperand = secondOperand.slice(0, secondOperand.length - 1);
      } else {
        operator = null;
        firstOperand = firstOperand.slice(0, firstOperand.length - 1);
      }
      displayInput();
      break;

    case "clear":
      firstOperand = null;
      secondOperand = null;
      operator = null;
      displayInput();
      break;
    case "number":
      let num = clickedButton.innerHTML;
      if (!operator) {
        if (!firstOperand) {
          firstOperand = num;
        } else {
          firstOperand += num;
        }
      } else {
        if (secondOperand) {
          secondOperand += num;
        } else {
          secondOperand = num;
        }
      }
      displayInput();
      break;
    case "operator":
      operator = clickedButton.innerHTML;
      if (secondOperand) {
        secondOperand = null;
      }
      displayInput();
      break;
    case "calculate":
      let result = operate(
        parseFloat(firstOperand),
        parseFloat(secondOperand),
        operator
      );
      firstOperand = result;
      secondOperand = null;
      operator = null;
      displayInput();
      break;
    default:
      break;
  }
});
