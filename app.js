// Get display and button elements.
const calculatorDisplay = document.querySelector("h1");
const inputButtons = document.querySelectorAll("button");
const clearButton = document.getElementById("clear-btn");

// Operator variables.
let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
	// Replace current display value
	// if first value is entered.
	if (awaitingNextValue) {
		calculatorDisplay.textContent = number;
		awaitingNextValue = false;
	} else {
		// If current display value is 0, replace it.
		// If not, add a number (concatenate).
		const displayValue = calculatorDisplay.textContent;
		calculatorDisplay.textContent =
			displayValue === "0" ? number : displayValue + number;
	}
}

function addDecimal() {
	// If operator pressed, don't add decimal.
	if (awaitingNextValue) return;
	// If no decimal, add one.
	if (!calculatorDisplay.textContent.includes(".")) {
		calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
	}
}

function useOperator(operator) {
	// Calculate first and second values
	// depending on operator.
	const calculate = {
		"/": (firstNumber, secondNumber) => firstNumber / secondNumber,
		"*": (firstNumber, secondNumber) => firstNumber * secondNumber,
		"-": (firstNumber, secondNumber) => firstNumber - secondNumber,
		"+": (firstNumber, secondNumber) => firstNumber + secondNumber,
		"=": (firstNumber, secondNumber) => secondNumber
	};

	const currentValue = Number(calculatorDisplay.textContent);

	// Prevent multiple operators at a time.
	if (operatorValue && awaitingNextValue) {
		operatorValue = operator;
		return;
	}

	// Asign firstValue if no value.
	if (!firstValue) {
		firstValue = currentValue;
	} else {
		const calculation = calculate[operatorValue](firstValue, currentValue);
		calculatorDisplay.textContent = calculation;
		firstValue = calculation;
	}
	// Ready for next value, store operator.
	awaitingNextValue = true;
	operatorValue = operator;
}

// Reset all values and display.
function resetAll() {
	firstValue = 0;
	operatorValue = "";
	awaitingNextValue = false;
	calculatorDisplay.textContent = "0";
}

// Add Event Listeners for numbers
// operators and decimal buttons.
inputButtons.forEach((input) => {
	if (input.classList.length === 0) {
		input.addEventListener("click", () => sendNumberValue(input.value));
	} else if (input.classList.contains("operator")) {
		input.addEventListener("click", () => useOperator(input.value));
	} else if (input.classList.contains("decimal")) {
		input.addEventListener("click", addDecimal);
	}
});

// Clear button Event Listener.
clearButton.addEventListener("click", resetAll);

