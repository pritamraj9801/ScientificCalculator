// ---------- toggling DEG / RAD / GRAD i.e degree unit
// ---------- by default DEG unit will be selected
let selectedDegreeUnit = "DEG";
const degreeUnitToggleElement = document.querySelector(
  "#toggleButtons #degreeUnit"
);
degreeUnitToggleElement.addEventListener("click", function () {
  if (degreeUnitToggleElement.innerText == "DEG") {
    degreeUnitToggleElement.innerText = "RAD";
    selectedDegreeUnit = "RAD";
  } else if (degreeUnitToggleElement.innerText == "RAD") {
    degreeUnitToggleElement.innerText = "GRAD";
    selectedDegreeUnit = "GRAD";
  } else if (degreeUnitToggleElement.innerText == "GRAD") {
    degreeUnitToggleElement.innerText = "DEG";
    selectedDegreeUnit = "DEG";
  }
});
// ---------- toggle the F-E format button
let exponentialFormatEnabled = false;
var button = document.getElementById("exponentialNotation");
button.addEventListener("click", function () {
  this.classList.toggle("removeAfter");
  if (exponentialFormatEnabled) {
    exponentialFormatEnabled = false;
  } else {
    exponentialFormatEnabled = true;
  }
});

// ---------- memory and history section selection
const choice = ["history", "memory"];
// ----- by default history will be selected
let currentCoice = choice[0];
let history;
let memory;
// ----- style for active and deactive selection
let activeBorderStyle = "5px solid rgb(243,128,100)";
let deactiveBorderStyle="0px solid rgb(243,128,100)";

document.querySelector("#historyBtn").style.borderBottom = activeBorderStyle;
RenderHistoryInfo();

// ---------- event listener for history btn
document.querySelector("#historyBtn").addEventListener("click", function () {
  if (this.style.borderBottom != activeBorderStyle) {
    document.querySelector("#historyBtn").style.borderBottom = activeBorderStyle;
    document.querySelector("#memoryBtn").style.borderBottom = deactiveBorderStyle;
    currentCoice = choice[0];
    RenderHistoryInfo();
  }
});
// ---------- event listener for memory btn
document.querySelector("#memoryBtn").addEventListener("click", function () {
  if (this.style.borderBottom != activeBorderStyle) {
    document.querySelector("#memoryBtn").style.borderBottom = activeBorderStyle;
    document.querySelector("#historyBtn").style.borderBottom = deactiveBorderStyle;
    currentCoice = choice[1];
    RenderMemoryInfo();
  }
});

// ---------- rendering history information
function RenderHistoryInfo() {
  if (currentCoice == choice[0]) {
    if (history == undefined) {
      document.getElementById("memoryAndHistorySection").innerText =
        "There's no history yet";
    } else {
      document.getElementById("memoryAndHistorySection").innerHTML = history;
    }
  }
}
// ---------- rendering memory information
function RenderMemoryInfo() {
  if (currentCoice == choice[1]) {
    if (memory == undefined) {
      document.getElementById("memoryAndHistorySection").innerText =
        "There's nothing saved in memory";
    } else {
      document.getElementById("memoryAndHistorySection").innerText = memory;
    }
  }
}

// ---------- event for collapse trigonometric functions
document
  .querySelector("#trigoFunctions")
  .addEventListener("click", function () {
    document.querySelector("#functionCollapse").style.display = "none";
    if (
      document.querySelector("#trigoCollapseFunctions").style.display != "none"
    ) {
      document.querySelector("#trigoCollapseFunctions").style.display = "none";
    } else {
      document.querySelector("#trigoCollapseFunctions").style.display = "block";
    }
  });

// ---------- event for collpase functions
document.querySelector("#functions").addEventListener("click", function () {
  if (document.querySelector("#functionCollapse").style.display != "none") {
    document.querySelector("#functionCollapse").style.display = "none";
  } else {
    document.querySelector("#functionCollapse").style.display = "block";
  }
});

// -------------- event for collapsing the functions if any function is clicked
let elem = document.querySelectorAll("#functionCollapse div button");
for (let el of elem) {
  el.addEventListener("click", function () {
    document.querySelector("#functionCollapse").style.display = "none";
  });
}

// -------------- handling display / hide of trigo methods group as per the selected choice i.e 2nd and hyp
// ----- toggling the class for bg
let secondButtonClicked = false;
document
  .getElementById("secondTrigoMethods")
  .addEventListener("click", function () {
    if (secondButtonClicked) {
      secondButtonClicked = false;
      this.classList.remove("selected");
    } else {
      secondButtonClicked = true;
      this.classList.add("selected");
    }
    RedefineTrigoMethods();
  });
let hypButtonClicked = false;
document
  .getElementById("hypTrigoMethods")
  .addEventListener("click", function () {
    if (hypButtonClicked) {
      hypButtonClicked = false;
      this.classList.remove("selected");
    } else {
      hypButtonClicked = true;
      this.classList.add("selected");
    }
    RedefineTrigoMethods();
  });

// ----- showing / hiding the trigonometric functions as per the selected choice
function RedefineTrigoMethods() {
  let classToTarget = "trigo";
  if (secondButtonClicked) {
    classToTarget += "1";
  } else {
    classToTarget += "0";
  }
  if (hypButtonClicked) {
    classToTarget += "1";
  } else {
    classToTarget += "0";
  }
  let elementToHide = document.querySelectorAll(
    "#trigoCollapseFunctions .function"
  );
  for (let el of elementToHide) {
    el.classList.remove("displayInitial");
    el.classList.add("displayNone");
  }

  let elementToDisplay = document.querySelectorAll(
    "#trigoCollapseFunctions ." + classToTarget
  );
  for (let el of elementToDisplay) {
    el.classList.remove("displayNone");
    el.classList.add("displayInitial");
  }
}

// -------------- toggling 2nd list of operation
document.querySelector("#secondMethods").addEventListener("click", function () {
  let x = document.querySelectorAll("#operations .displayInitial");
  let y = document.querySelectorAll("#operations .displayNone");
  for (let el of x) {
    el.classList.remove("displayInitial");
    el.classList.add("displayNone");
  }

  for (let el of y) {
    el.classList.remove("displayNone");
    el.classList.add("displayInitial");
  }
});

// ################################# click events on various functions
const inputField = document.querySelector("#currentInput input");
const previousInput = document.querySelector("#previousInput");
let resultDisplayed = false; // keep record whether the input contains user input or result
let FE = false; // keep record whether the user wants the result to be displayed as exponential form or not
let currentResult = ""; // keep record of current input or result
let currentExpression = ""; // keep expression for displaying to the UI
let expression = ""; // keep expression for calculating the result

// ---------- toggling the F-E selection to change the display format
document
  .getElementById("exponentialNotation")
  .addEventListener("click", function () {
    if (FE) {
      FE = false;
    } else {
      FE = true;
    }
    PrintResult();
  });

// ---------- printing the result
function PrintResult() {
  if (FE) {
    inputField.value = parseFloat(currentResult).toExponential(2);
  }
  else {
    inputField.value = currentResult;
  }
}
// ---------- printing the current expression
function PrintExpression() {
  previousInput.innerText = currentExpression;
}
// ---------- handling digits (0 - 9)
// if entered digit is 0
function HandleDigit_0() {
  if (currentResult.length == 0) {
  } else {
    currentResult = currentResult + "0";
    PrintResult();
  }
}
// ----- if entered digit is 1 - 9
let digitHandled = false;
function HandleDigit(value) {
  digitHandled = false;
  if (resultDisplayed) {
    currentResult = value;
    expression = value;
    resultDisplayed = false;
  } else {
    currentResult = currentResult + value;
  }
  PrintResult();
}

// ---------- handle constant
// ----- PI
function Handle_Pi() {
  currentResult = Math.PI;
  resultDisplayed = true;
  PrintResult();
}
// ----- e
function Handle_e() {
  currentResult = Math.E;
  resultDisplayed = true;
  PrintResult();
}
// -------------- handle arithmetic operations (plus, substract, multiply, divide)
function ArithmeticOperation(operation) {
  switch (operation) {
    case "add": {
      if (currentExpression.length == 0) {
        if (currentResult.length == 0) {
          currentExpression = "0+";
          expression = "0+";
        } else {
          currentExpression = currentResult + "+";
          expression = currentResult + "+";
        }
      } else {
        if (
          IsArithmeticOperatorInLast(
            currentExpression[currentExpression.length - 1]
          )
        ) {
          if (digitHandled) {
            currentExpression = currentExpression.slice(0, -1) + "+";
            expression = expression.slice(0, -1) + "+";
          } else {
            currentExpression += currentResult + "+";
            expression += currentResult + "+";
          }
        } else {
          if (resultDisplayed) {
            if (currentExpression[currentExpression.length - 1] == "=") {
              currentExpression = currentResult + "+";
              expression = currentResult + "+";
            } else {
              currentExpression += `+`;
              expression += `+`;
            }
          } else {
            currentExpression += currentResult + `+`;
            expression += currentResult + `+`;
          }
        }
      }
      break;
    }
    case "substract": {
      if (currentExpression.length == 0) {
        if (currentResult.length == 0) {
          currentExpression = "0-";
          expression = "0-";
        } else {
          currentExpression = currentResult + "-";
          expression = currentResult + "-";
        }
      } else {
        if (
          IsArithmeticOperatorInLast(
            currentExpression[currentExpression.length - 1]
          )
        ) {
          if (digitHandled) {
            currentExpression = currentExpression.slice(0, -1) + "-";
            expression = expression.slice(0, -1) + "-";
          } else {
            currentExpression += currentResult + "-";
            expression += currentResult + "-";
          }
        } else {
          if (resultDisplayed) {
            if (currentExpression[currentExpression.length - 1] == "=") {
              currentExpression = currentResult + "-";
              expression = expression + "-";
            } else {
              currentExpression += `-`;
              expression += `-`;
            }
          } else {
            currentExpression += currentResult + `-`;
            expression += currentResult + `-`;
          }
        }
      }
      break;
    }
    case "multiply": {
      if (currentExpression.length == 0) {
        if (currentResult.length == 0) {
          currentExpression = "0*";
          expression = "0*";
        } else {
          currentExpression = currentResult + "*";
          expression = currentResult + "*";
        }
      } else {
        if (
          IsArithmeticOperatorInLast(
            currentExpression[currentExpression.length - 1]
          )
        ) {
          if (digitHandled) {
            currentExpression = currentExpression.slice(0, -1) + "*";
            expression = expression.slice(0, -1) + "*";
          } else {
            currentExpression += currentResult + "*";
            expression += currentResult + "*";
          }
        } else {
          if (resultDisplayed) {
            if (currentExpression[currentExpression.length - 1] == "=") {
              currentExpression = currentResult + "*";
              expression = currentResult + "*";
            } else {
              currentExpression += `*`;
              expression += `*`;
            }
          } else {
            currentExpression += currentResult + `*`;
            expression += currentResult + `*`;
          }
        }
      }
      break;
    }
    case "divide": {
      if (currentExpression.length == 0) {
        if (currentResult.length == 0) {
          currentExpression = "0/";
          expression = "0/";
        } else {
          currentExpression = currentResult + "/";
          expression = currentResult + "/";
        }
      } else {
        if (
          IsArithmeticOperatorInLast(
            currentExpression[currentExpression.length - 1]
          )
        ) {
          if (digitHandled) {
            currentExpression = currentExpression.slice(0, -1) + "/";
            expression = expression.slice(0, -1) + "/";
          } else {
            currentExpression += currentResult + "/";
            expression += currentResult + "/";
          }
        } else {
          if (resultDisplayed) {
            if (currentExpression[currentExpression.length - 1] == "=") {
              currentExpression = currentResult + "/";
              expression = currentResult + "/";
            } else {
              currentExpression += `/`;
              expression += `/`;
            }
          } else {
            currentExpression += currentResult + `/`;
            expression += currentResult + `/`;
          }
        }
      }
      break;
    }
  }
  digitHandled = true;
  PrintExpression();
  currentResult = "";
}
function IsArithmeticOperatorInLast(value) {
  if (value == "+" || value == "-" || value == "*" || value == "/") {
    return true;
  }
  return false;
}
// -------------- handle trigonometric functions
function TrigonometricFunctions(operation) {
  let result;
  let value = inputField.value;
  switch (operation) {
    case "sin": {
      if (resultDisplayed) {
        currentExpression = `sin(${currentExpression})`;
      } else {
        currentExpression += `sin(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = Math.sin(degreesToRadians(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = Math.sin(gradsToRadians(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.sin(value);
      }
      break;
    }
    case "cos": {
      if (resultDisplayed) {
        currentExpression = `cos(${currentExpression})`;
      } else {
        currentExpression += `cos(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = Math.cos(degreesToRadians(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = Math.cos(gradsToRadians(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.cos(value);
      }
      break;
    }
    case "tan": {
      if (resultDisplayed) {
        currentExpression = `tan(${currentExpression})`;
      } else {
        currentExpression += `tan(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = Math.tan(degreesToRadians(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = Math.tan(gradsToRadians(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.tan(value);
      }
      break;
    }
    case "sec": {
      if (resultDisplayed) {
        currentExpression = `sec(${currentExpression})`;
      } else {
        currentExpression += `sec(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = 1 / Math.cos(degreesToRadians(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = 1 / Math.cos(gradsToRadians(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = 1 / Math.cos(value);
      }
      break;
    }
    case "csc": {
      if (resultDisplayed) {
        currentExpression = `csc(${currentExpression})`;
      } else {
        currentExpression += `csc(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = 1 / Math.sin(degreesToRadians(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = 1 / Math.sin(gradsToRadians(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = 1 / Math.sin(value);
      }
      break;
    }
    case "cot": {
      if (resultDisplayed) {
        currentExpression = `cot(${currentExpression})`;
      } else {
        currentExpression += `cot(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = 1 / Math.tan(degreesToRadians(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = 1 / Math.tan(gradsToRadians(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = 1 / Math.tan(value);
      }
      break;
    }
    case "sin-1": {
      if (resultDisplayed) {
        currentExpression = `SinInverse(${currentExpression})`;
      } else {
        currentExpression += `SinInverse(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = radiansToDegrees(Math.asin(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = radiansToGrads(Math.asin(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.asin(value);
      }
      break;
    }
    case "cos-1": {
      if (resultDisplayed) {
        currentExpression = `CosInverse(${currentExpression})`;
      } else {
        currentExpression += `CosInverse(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = radiansToDegrees(Math.acos(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = radiansToGrads(Math.acos(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.acos(value);
      }
      break;
    }
    case "tan-1": {
      if (resultDisplayed) {
        currentExpression = `TanInverse(${currentExpression})`;
      } else {
        currentExpression += `TanInverse(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = radiansToDegrees(Math.atan(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = radiansToGrads(Math.atan(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.atan(value);
      }
      break;
    }
    case "sec-1": {
      if (resultDisplayed) {
        currentExpression = `SecInverse(${currentExpression})`;
      } else {
        currentExpression += `SecInverse(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = radiansToDegrees(Math.acos(1 / value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = radiansToGrads(Math.acos(1 / value));
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.acos(1 / value);
      }
      break;
    }
    case "csc-1": {
      if (resultDisplayed) {
        currentExpression = `CscInverse(${currentExpression})`;
      } else {
        currentExpression += `CscInverse(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = radiansToDegrees(Math.asin(1 / value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = radiansToGrads(Math.asin(1 / value));
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.asin(1 / value);
      }
      break;
    }
    case "cot-1": {
      if (resultDisplayed) {
        currentExpression = `CotInverse(${currentExpression})`;
      } else {
        currentExpression += `CotInverse(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = radiansToDegrees(Math.atan(1 / value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = radiansToGrads(Math.atan(1 / value));
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.atan(1 / value);
      }
      break;
    }
    case "sinh": {
      if (resultDisplayed) {
        currentExpression = `sinh(${currentExpression})`;
      } else {
        currentExpression += `sinh(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = Math.sinh(degreesToRadians(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = Math.sinh(gradsToRadians(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.sinh(value);
      }
      break;
    }
    case "cosh": {
      if (resultDisplayed) {
        currentExpression = `cosh(${currentExpression})`;
      } else {
        currentExpression += `cosh(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = Math.cosh(degreesToRadians(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = Math.cosh(gradsToRadians(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.cosh(value);
      }
      break;
    }
    case "tanh": {
      if (resultDisplayed) {
        currentExpression = `tanh(${currentExpression})`;
      } else {
        currentExpression += `tanh(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = Math.tanh(degreesToRadians(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = Math.tanh(gradsToRadians(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.tanh(value);
      }
      break;
    }
    case "sech": {
      if (resultDisplayed) {
        currentExpression = `sech(${currentExpression})`;
      } else {
        currentExpression += `sech(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = 1 / Math.cosh(degreesToRadians(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = 1 / Math.cosh(gradsToRadians(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = 1 / Math.cosh(value);
      }
      break;
    }
    case "csch": {
      if (resultDisplayed) {
        currentExpression = `csch(${currentExpression})`;
      } else {
        currentExpression += `csch(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = 1 / Math.sinh(degreesToRadians(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = 1 / Math.sinh(gradsToRadians(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = 1 / Math.sinh(value);
      }
      break;
    }
    case "coth": {
      if (resultDisplayed) {
        currentExpression = `coth(${currentExpression})`;
      } else {
        currentExpression += `coth(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = 1 / Math.tanh(degreesToRadians(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = 1 / Math.tanh(gradsToRadians(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = 1 / Math.tanh(value);
      }
      break;
    }
    case "sinh-1": {
      if (resultDisplayed) {
        currentExpression = `asinh(${currentExpression})`;
      } else {
        currentExpression += `asinh(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = Math.asinh(degreesToRadians(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = Math.asinh(gradsToRadians(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.asinh(value);
      }
      break;
    }
    case "cosh-1": {
      if (resultDisplayed) {
        currentExpression = `acosh(${currentExpression})`;
      } else {
        currentExpression += `acosh(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = Math.acosh(degreesToRadians(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = Math.acosh(gradsToRadians(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.acosh(value);
      }
      break;
    }
    case "tanh-1": {
      if (resultDisplayed) {
        currentExpression = `atanh(${currentExpression})`;
      } else {
        currentExpression += `atanh(${value})`;
      }
      if (selectedDegreeUnit == "DEG") {
        result = Math.atanh(degreesToRadians(value));
      } else if (selectedDegreeUnit == "GRAD") {
        result = Math.atanh(gradsToRadians(value));
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.atanh(value);
      }
      break;
    }
    case "sech-1": {
      if (resultDisplayed) {
        currentExpression = `asech(${currentExpression})`;
      } else {
        currentExpression += `asech(${value})`;
      }
      const x = value;
      const sechValue = 1 / Math.cosh(x);

      if (selectedDegreeUnit == "DEG") {
        result = Math.acosh(1 / sechValue) * (180 / Math.PI);
      } else if (selectedDegreeUnit == "GRAD") {
        result = Math.acosh(1 / sechValue) * (200 / Math.PI);
      } else if (selectedDegreeUnit == "RAD") {
        result = Math.acosh(1 / sechValue);
      }
      break;
    }
    case "csch-1": {
      if (resultDisplayed) {
        currentExpression = `acsch(${currentExpression})`;
      } else {
        currentExpression += `acsch(${value})`;
      }
      const x = value;
      const cschValue = 1 / Math.sinh(x);

      if (cschValue === 0) {
        result = NaN;
      } else {
        result = Math.log(
          1 / cschValue + Math.sqrt(1 / (cschValue * cschValue) + 1)
        );
      }

      if (selectedDegreeUnit == "DEG") {
        result = result * (180 / Math.PI);
      } else if (selectedDegreeUnit == "GRAD") {
        result = result * (200 / Math.PI);
      } else if (selectedDegreeUnit == "RAD") {
        // result is already in radians, no need for conversion
      }
      break;
    }
    case "coth-1": {
      if (resultDisplayed) {
        currentExpression = `acoth(${currentExpression})`;
      } else {
        currentExpression += `acoth(${value})`;
      }
      const x = value;

      if (Math.abs(x) === 1) {
        // Handling error condition when x equals 1 or -1
        result = NaN;
      } else {
        result = 0.5 * Math.log((x + 1) / (x - 1));
      }

      if (selectedDegreeUnit == "DEG") {
        result = result * (180 / Math.PI);
      } else if (selectedDegreeUnit == "GRAD") {
        result = result * (200 / Math.PI);
      } else if (selectedDegreeUnit == "RAD") {
        // result is already in radians, no need for conversion
      }
      break;
    }
  }
  currentResult = result;
  expression += currentResult; // expression
  PrintResult();
  PrintExpression();
  resultDisplayed = true;
  document.querySelector("#trigoCollapseFunctions").style.display = "none";
}

// -------------- handle C / CE
function Handle_ce() {
  currentExpression = "";
  currentResult = "";
  expression = "";
  PrintResult();
  PrintExpression();
  resultDisplayed = false;
  invalidOperation = false;
}

// -------------- handle memory functions (MC, MR, M+, M-, MS)
function Handle_memoryClear() {
  memory = undefined;
  if (currentCoice == choice[1]) {
    RenderMemoryInfo();
  }
}
function Handle_memoryRead() {
  if (memory == undefined) {
  } else {
    currentResult = memory;
    PrintResult();
  }
}
function Handle_memoryPlus() {
  if (memory == undefined) {
    if (inputField.value.length == 0) {
      memory = 0;
    } else {
      memory = inputField.value;
    }
  } else {
    memory = parseFloat(memory) + parseFloat(inputField.value);
  }
  if (currentCoice == choice[1]) {
    RenderMemoryInfo();
  }
}
function Handle_memoryMinus() {
  if (memory == undefined) {
    if (inputField.value.length == 0) {
      memory = 0;
    } else {
      memory = 0 - inputField.value;
    }
  } else {
    memory = parseFloat(memory) - parseFloat(inputField.value);
  }
  if (currentCoice == choice[1]) {
    RenderMemoryInfo();
  }
}
function Handle_store() {
  if (inputField.value.length == 0) {
    memory = 0;
  } else {
    memory = currentResult;
  }
  if (currentCoice == choice[1]) {
    RenderMemoryInfo();
  }
}
// -------------- handle one character delete
function Handle_back() {
  if (resultDisplayed) {
    currentExpression = "";
    expression = "";
    PrintExpression();
    resultDisplayed = false;
  } else {
    currentResult = currentResult.slice(0, -1);
    PrintResult();
  }
}

// -------------- handle square
function Handle_square() {
  if (resultDisplayed) {
    currentExpression = `sqr(${currentExpression})`;
  } else {
    if (currentResult.length == 0) {
      currentExpression += `sqr(0)`;
    } else {
      currentExpression += `sqr(${currentResult})`;
    }
  }
  currentResult = Math.pow(inputField.value, 2);
  expression = currentResult; // expression
  PrintResult();
  PrintExpression();
  resultDisplayed = true;
}

// -------------- handle cube
function Handle_cube() {
  if (resultDisplayed) {
    currentExpression = `cube(${currentExpression})`;
  } else {
    if(currentResult.length==0){
      currentExpression += `cube(0)`;
    }else{
      currentExpression += `cube(${currentResult})`;
    }
  }
  currentResult = Math.pow(inputField.value, 3);
  expression += currentResult; // expression
  PrintResult(); 
  PrintExpression();
  resultDisplayed = true;
}
// -------------- handle x ^ y
function Handle_XPowerY() {
  currentExpression += `${currentResult}^`;
  expression += `${currentResult}^`; // expression
  currentResult = "";
  PrintResult();
  PrintExpression();
}
// -------------- handle 10PowerX
function Handle_10PowerX() {
  if (resultDisplayed) {
    currentExpression = `10^(${currentExpression})`;
  } else {
    if(currentResult.length==0){
      currentExpression += `10^(0)`;
    }else{
      currentExpression += `10^(${currentResult})`;
    }
  }
  currentResult = Math.pow(10, currentResult);
  expression += currentResult; // expression
  PrintResult();
  PrintExpression();
  resultDisplayed = true;
}
// -------------- handle equal
function Handle_Equal() {
  if (currentExpression != 0) {
    if (currentExpression[currentExpression.length - 1] == ")") {
      currentExpression += "=";
      expression += "=";
    } else {
      currentExpression += currentResult + "=";
      expression += currentResult + "=";
    }
    resultDisplayed = true;
  }
  if (history == undefined) {
    history = currentExpression + "<br/>";
  } else {
    history += currentExpression + "<br/>";
  }

  currentResult = evaluate(expression);
  history += currentResult + "<br/>";
  RenderHistoryInfo();
  PrintResult();
  PrintExpression();
  resultDisplayed = true;
}
// -------------- handle x root y
function Handle_YRootX() {
  currentExpression += `${inputField.value}yroot`;
  expression += `${inputField.value}yroot`;
  PrintExpression();
  resultDisplayed = true;
}
// -------------- handle Cubic root
function Handle_cubicRoot() {
  if (resultDisplayed) {
    currentExpression = `cuberoot(${currentExpression})`;
  } else {
    if(currentResult.length==0){
      currentExpression += `cuberoot(0)`;
    }else{
      currentExpression += `cuberoot(${currentResult})`;
    }
  }
  currentResult = Math.cbrt(inputField.value);
  expression += currentResult; // expression
  PrintResult();
  PrintExpression();
  resultDisplayed = true;
}
// -------------- handle 2 power x
function Handle_2PowerX() {
  if (resultDisplayed) {
    currentExpression = `2^(${currentExpression})`;
  } else {
    if(currentResult.length==0){
      currentExpression += `2^(0)`;
    }else{
      currentExpression += `2^(${currentResult})`;
    }
  }
  currentResult = Math.pow(2, currentResult);
  expression += currentResult; // expression
  PrintResult();
  PrintExpression();
  resultDisplayed = true;
}
let invalidOperation = false;
// -------------- handle 1 / x
function Handle_1byx() {
  if (resultDisplayed) {
    currentExpression = `1/(${currentExpression})`;
  } else {
    if (currentResult.length == 0) {
      currentExpression += `1/(0)`;
      //--- can not divide by zero
      invalidOperation = true;
      inputField.value = "Cannot divide by zero";
    } else {
      currentExpression += `1/(${currentResult})`;
    }
  }
  if (!invalidOperation) {
    currentResult = evaluate(currentExpression);
    expression += currentResult; //expression
    PrintResult();
  }
  PrintExpression();
  resultDisplayed = true;
}
// -------------- handle logyPowerx
function Handle_logYPowerX() {
  currentExpression += `${currentResult} log base`;
  PrintExpression();
  resultDisplayed = true;
}
// -------------- handle e Power x
function Handle_ePowerX() {
  if (resultDisplayed) {
    currentExpression = `e^(${currentExpression})`;
  } else {
    if(currentResult.length == 0){
      currentExpression += `e^(0)`;
    }else{
      currentExpression += `e^(${currentResult})`;
    }
  }
  currentResult = Math.pow(Math.E, currentResult);
  expression += currentResult; // expression
  PrintResult();
  PrintExpression();
  resultDisplayed = true;
}
// -------------- handle log
function Handle_log() {
  if (resultDisplayed) {
    currentExpression = `log(${currentExpression})`;
  } else {
    if(currentResult.length==0){
      currentExpression += `log(0)`;
      invalidOperation = true;
      inputField.value="Invalid input";
    }else{
      currentExpression += `log(${currentResult})`;
    }
  }
  if(!invalidOperation){
    currentResult = Math.log10(parseFloat(currentResult));
    expression += currentResult; // expression
    PrintResult();
  }
  PrintExpression();
  resultDisplayed = true;
}
// -------------- handle ln
function Handle_ln() {
  if (resultDisplayed) {
    currentExpression = `ln(${currentExpression})`;
  } else {
    if(currentResult.length==0){
      currentExpression += `ln(0)`; 
      inputField.value="Invalid input";
      invalidOperation = true;
    }else{
      currentExpression += `ln(${currentResult})`;
    }
  }
  if(!invalidOperation){
    currentResult = Math.log(parseFloat(currentResult));
    expression += currentResult; // expression
    PrintResult();
  }
  PrintExpression();
  resultDisplayed = true;
}
// -------------- handle exp
// ------ it only converts the input value in F-E format on UI
// ------ only convert when value is not zero
function Handle_exp() {
  if (!(currentResult.length == 0 || currentResult == "0")) {
    inputField.value = parseFloat(currentResult).toExponential(2);
  }
}
// -------------- handle mod
function Handle_mod() {
  currentExpression += `${currentResult}mod`;
  expression += `mod${currentResult},`; // expression
  currentResult = "";
  PrintResult();
  PrintExpression();
}
// -------------- handle starting round braces
function Handle_startingRoundBraces() {
  if (!resultDisplayed) {
    currentExpression += currentResult + "(";
    expression += currentResult + "*(";
  } else {
    currentExpression += "(";
    expression += "(";
  }
  currentResult = "";
  PrintResult();
  PrintExpression();
}
// -------------- handle ending round braces
function Handle_endingRoundBraces() {
  currentExpression += currentResult + ")";
  expression += currentResult + ")"; // expression
  PrintExpression();
}
// -------------- handle +/- button
function Handle_togglePlusMinus() {
  // remaining
  AlertNotImpleted();
}
// -------------- handling decimal
function Handle_decimal() {
  if (currentResult.length == 0) {
    currentResult = "0.";
  } else {
    currentResult += ".";
  }
  resultDisplayed = false;
  PrintResult();
}
// -------------- handle abs()
function Handle_abs() {
  if (resultDisplayed) {
    currentExpression = `abs(${currentExpression})`;
  } else {
    if (currentResult.length == 0) {
      currentExpression += `abs(0)`;
    } else {
      currentExpression += `abs(${currentResult})`;
    }
  }
  currentResult = Math.abs(currentResult);
  expression += currentResult; // expression
  PrintResult();
  PrintExpression();
  resultDisplayed = true;
}

// -------------- handle sqrt()
function Handle_sqrt() {
  if (resultDisplayed) {
    currentExpression = `squareroot(${currentExpression})`;
  } else {
    if (currentResult.length == 0) {
      currentExpression += `squareroot(0)`;
    } else {
      currentExpression += `squareroot(${currentResult})`;
    }
  }
  currentResult = Math.sqrt(currentResult);
  expression += currentResult; // expression
  PrintResult();
  PrintExpression();
  resultDisplayed = true;
}

// -------------- handle factorial()
function Handle_fact() {
  if (resultDisplayed) {
    currentExpression = `fact(${currentResult})`;
  } else {
    if (currentResult.length == 0) {
      console.log("cr: " + currentResult);
      currentExpression = `fact(0)`;
      currentResult = 0;
    } else {
      if (parseFloat(currentResult) < 0) {
        inputField.value = "Invalid input";
      } else {
        currentExpression += `fact(${currentResult})`;
      }
    }
  }
  currentResult = Factroial(parseFloat(currentResult));
  expression += currentResult; // expression
  PrintResult();
  PrintExpression();
  resultDisplayed = true;
}

// ----- handle floor
function Handle_floor() {
  if (resultDisplayed) {
    currentExpression = `floor(${currentExpression})`;
  } else {
    if (currentResult.length == 0) {
      currentExpression += `floor(0)`;
    } else {
      currentExpression += `floor(${currentResult})`;
    }
  }
  currentResult = Math.floor(currentResult);
  expression += currentResult; // expression
  PrintResult();
  PrintExpression();
  resultDisplayed = true;
}
// ----- handle ceil
function Handle_ceil() {
  if (resultDisplayed) {
    currentExpression = `ceil(${currentExpression})`;
  } else {
    if (currentResult.length == 0) {
      currentExpression += `ceil(0)`;
    } else {
      currentExpression += `ceil(${currentResult})`;
    }
  }
  currentResult = Math.ceil(currentResult);
  expression += currentResult; // expression
  PrintResult();
  PrintExpression();
  resultDisplayed = true;
}
// ----- handle random
function Handle_random() {
  currentResult = Math.random();
  PrintResult();
  resultDisplayed = true;
}
// ----- handle dms
function Handle_dms() {
  if (resultDisplayed) {
    currentExpression = `dms(${currentExpression})`;
  } else {
    currentExpression += `dms(${currentResult})`;
  }
  var degrees = Math.floor(parseFloat(currentResult));
  var minutesNotTruncated = (currentResult - degrees) * 60;
  var minutes = Math.floor(minutesNotTruncated);
  var seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);
  currentResult = degrees + "." + minutes + "." + seconds;
  //expression += currentResult; // expression
  PrintResult();
  PrintExpression();
  resultDisplayed = true;
}
// ----- handle deg
function Handle_deg() {
  AlertNotImpleted();
}
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
function Factroial(n) {
  if (!Number.isInteger(n) || n < 0) {
    return "Factorial is defined only for non-negative integers.";
  }
  if (n === 0) {
    return 1;
  }
  if (!Number.isInteger(n)) {
    return gamma(n + 1);
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function gamma(x) {
  let g = 7;
  let p = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];

  if (x < 0.5) {
    return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x));
  }

  x -= 1;

  let a = p[0];
  let t = x + g + 0.5;
  for (let i = 1; i < p.length; i++) {
    a += p[i] / (x + i);
  }

  return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
}
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}
function gradsToRadians(grads) {
  return grads * (Math.PI / 200);
}
function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}

function AlertNotImpleted() {
  alert("working on it, yet not implemented");
}

// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
function precedence(operate) {
  if (operate === "+" || operate === "-") return 1;
  else if (operate === "*" || operate === "/") return 2;
  else if (operate === "^") return 3;
  return 0;
}

function isOperand(x) {
  return x >= "0" && x <= "9";
}

function isOperator(x) {
  return x === "+" || x === "-" || x === "*" || x === "/" || x === "^";
}

function performOperation(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        console.log("Cannot divide by zero");
        return 0;
      } else {
        return a / b;
      }
    case "^":
      return Math.pow(a, b);
    default:
      console.log("Invalid operator");
      return 0;
  }
}

function evaluate(expression) {
  console.log("current expression for evaluation: "+ expression);
  expression =  convertModExpression(expression);
  console.log("current expression after changing for evaluation: "+ expression);

  //------------ converting mod expression

  let length = expression.length;
  let result = 0;
  let values = new Array(length);
  let resultIndex = 0;
  let operators = new Array(length);
  let operatorIndex = 0;
  let firstOperator = " ";
  let firstOperatorCome = false;
  let index = 0;

  while (index < length) {
    if (isOperand(expression[index])) {
      let thisNumber = 0;
      let decimalPointEncountered = false;
      let decimalMultiplier = 0.1;

      while (
        index < length &&
        (isOperand(expression[index]) ||
          (!decimalPointEncountered && expression[index] === "."))
      ) {
        if (expression[index] === ".") {
          decimalPointEncountered = true;
          index++;
          continue;
        }

        if (!decimalPointEncountered) {
          thisNumber =
            thisNumber * 10 +
            (expression[index].charCodeAt(0) - "0".charCodeAt(0));
        } else {
          thisNumber =
            thisNumber +
            (expression[index].charCodeAt(0) - "0".charCodeAt(0)) *
              decimalMultiplier;
          decimalMultiplier *= 0.1;
        }

        index++;
      }

      if (firstOperatorCome) {
        if (firstOperator === "-") {
          thisNumber = 0 - thisNumber;
          firstOperatorCome = false;
        }
      }
      values[resultIndex++] = thisNumber;
      index--;
    } else if (expression[index] === "(") {
      try {
        if (isOperand(expression[index - 1])) {
          operators[operatorIndex++] = "*";
        }
      } catch (ex) {
        console.log("Exception occurred:", ex.message);
      }
      operators[operatorIndex++] = "(";
    } else if (expression[index] === ")") {
      while (operatorIndex > 0 && operators[operatorIndex - 1] !== "(") {
        let number1 = values[--resultIndex];
        let number2 = values[--resultIndex];
        let op = operators[--operatorIndex];

        let resultTemp = performOperation(number2, number1, op);

        values[resultIndex++] = resultTemp;
      }
      operatorIndex--; // Pop '('
      if (
        index < expression.length - 1 &&
        (isOperand(expression[index + 1]) || expression[index + 1] === " ")
      ) {
        operators[operatorIndex++] = "*";
      }
    } else if (isOperator(expression[index])) {
      while (
        operatorIndex > 0 &&
        precedence(operators[operatorIndex - 1]) >=
          precedence(expression[index])
      ) {
        let number1 = values[--resultIndex];
        let number2 = values[--resultIndex];
        let op = operators[--operatorIndex];

        let resultTemp = performOperation(number2, number1, op);
        values[resultIndex++] = resultTemp;
      }
      if (
        index === 0 &&
        (expression[index] === "+" || expression[index] === "-")
      ) {
        firstOperator = expression[index];
        firstOperatorCome = true;
      } else {
        operators[operatorIndex++] = expression[index];
      }
    }
    index++;
  }
  while (operatorIndex > 0) {
    let number1 = values[--resultIndex];
    let number2 = values[--resultIndex];
    let op = operators[--operatorIndex];
    let resultTemp = performOperation(number2, number1, op);
    values[resultIndex++] = resultTemp;
  }
  result = values[0];
  console.log("current evaluated result: "+result);
  return result;
}
function convertModExpression(expression) {
  let regex = /mod(\d+(\.\d+)?),(\d+(\.\d+)?)/;
  let convertedExpression = expression.replace(regex, (match, dividend, _, divisor) => {
      dividend = parseFloat(dividend);
      divisor = parseFloat(divisor);
      return `${dividend}-${Math.floor(dividend/divisor)}*${divisor}`;
  });

  return convertedExpression;
}
// end
