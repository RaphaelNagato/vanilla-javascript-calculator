// ! Main  variables are defined

// The current output div is defined
const currentDisplay = document.querySelector(".current");
// The previous output div is also defined and it's text content set to null
let previous = document.querySelector(".previous");
previous.textContent = null;
// A boolean value to know when the operator is clicked is also defined
let operatorClicked = false;
// The operator used to compute the arithmetic operations is also set and initialized to null
let operator = null;
const keyValues = document.querySelectorAll(".key");

//! Functions

// * This function set all previously defined values back to default
function initialize() {
  currentDisplay.textContent = "0";
  previous.textContent = null;
  operatorClicked = false;
  operator = null;
}

// * percent() computes the percentage of the current output
function percent() {
  currentDisplay.textContent = `${parseFloat(currentDisplay.textContent) /
    100}`;
}

// * sign() checks if the output is negative, if not appends the '-' at the begining and if it is, removes the '-'
function sign() {
  currentDisplay.textContent =
    currentDisplay.textContent.charAt(0) === "-"
      ? currentDisplay.textContent.slice(1)
      : `-${currentDisplay.textContent}`;
}

// * append function appends a value to the current output
function append(value) {
  // * set the boolean to false if it is true,
  if (operatorClicked === true) {
    operatorClicked = false;
  }

  // if value is zero and the current output is also zero, then output returns as normal to prevent duplicate values.
  if (
    value === "0" &&
    (currentDisplay.textContent === "0" || currentDisplay.textContent === "-0")
  ) {
    currentDisplay.textContent = "0";
  } else if (
    value === "." &&
    (currentDisplay.textContent === "0" || currentDisplay.textContent === "-0")
  ) {
    //else if value is a dot and output = 0 or -0, the dot is appended.
    currentDisplay.textContent = `${currentDisplay.textContent}${value}`;
  } else if (
    value &&
    (currentDisplay.textContent === "0" || currentDisplay.textContent === "-0")
  ) {
    //  else if value is true and output is zero or -0, then output becomes the value.
    currentDisplay.textContent = `${value}`;
  } else {
    // else value is appended.
    currentDisplay.textContent = `${currentDisplay.textContent}${value}`;
  }
}
// * dot() calls on the append method to add a dot if '.' is not present in the output.
function dot() {
  if (currentDisplay.textContent.indexOf(".") === -1) {
    append(".");
  }
}

/* //* setPrevious() is called when either of the operators are clicked so that the previous value is set and ...
 *... the current value is initialized
 */

function setPrevious() {
  // if previous is defined  and output is also, then equal function is called by hoisting
  if (previous.textContent && currentDisplay.textContent) {
    equal();
  }
  operatorClicked = true;
  previous.textContent = currentDisplay.textContent;
  currentDisplay.textContent = "0";
}
// * add() calls on setPrevious() and sets the operator to compute the sum between two values.
function add() {
  setPrevious();
  operator = (a, b) => a + b;
}
// *minus() calls on setPrevious() and sets the operator to compute subtraction between two values.
function minus() {
  setPrevious();
  operator = (a, b) => a - b;
}
// * divide() calls on setPrevious() and sets the operator to compute a division between two values.
function divide() {
  setPrevious();
  operator = (a, b) => a / b;
}
// * multiply() calls on setPrevious() and sets the operator to compute a multiplication between two values.
function multiply() {
  setPrevious();
  operator = (a, b) => a * b;
}
//  * equal() calls on the operator and gives it the previous value and the current value as arguments.
function equal() {
  // The operator is given values
  let equal = operator(
    parseFloat(previous.textContent),
    parseFloat(currentDisplay.textContent)
  );
  // alert 'Math is not computable' if result is infinity[positive or negative] or not a number
  if (isNaN(equal) || equal === Infinity || equal === -Infinity) {
    initialize();
    return alert("Math is not computable");
  }
  // set current output to the result and previous value back to null
  currentDisplay.textContent = `${equal}`;
  previous.textContent = null; // previous is set back to null
}

// ! Adding Event Listeners

//* Event listeners for the numbers are added so as to append them to current output when clicked
for (let i = 0; i < keyValues.length; i++) {
  keyValues[i].addEventListener(
    "click",
    function() {
      append(keyValues[i].textContent);
    },
    false
  );
}
// * dot() function is called when the div with class 'dot' is clicked
document.querySelector(".dot").addEventListener("click", dot, false);

//* initialize() function is called when  the div with class 'initialize' is called
document
  .querySelector(".initialize")
  .addEventListener("click", initialize, false);

//* percent() function is called when  the div with class 'percent' is called
document.querySelector(".percent").addEventListener("click", percent, false);

//* sign() function is called when  the div with class 'sign' is called
document.querySelector(".sign").addEventListener("click", sign, false);

//* divide() function is called when  the div with class 'divide' is called
document.querySelector(".divide").addEventListener("click", divide, false);

//* multiply() function is called when  the div with class 'multiply' is called
document.querySelector(".multiply").addEventListener("click", multiply, false);

//* add() function is called when  the div with class 'add' is called
document.querySelector(".add").addEventListener("click", add, false);

//* minus() function is called when  the div with class 'minus' is called
document.querySelector(".minus").addEventListener("click", minus, false);

//* equal() function is called when  the div with class 'equal' is called
document.querySelector(".equal").addEventListener("click", equal, false);
