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
	const currentValue = Number(calculatorDisplay.textContent);

	// Prevent multiple operators at a time.
	if (operatorValue && awaitingNextValue) return;

	// Asign firstValue if no value.
	if (!firstValue) {
		firstValue = currentValue;
	} else {
		console.log("currentValue ", currentValue);
	}
	// Ready for next value, store operator.
	awaitingNextValue = true;
	operatorValue = operator;
	console.log("firstValue: ", firstValue);
	console.log("operatorValue: ", operatorValue);
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

// Reset all values and display.
function resetAll() {
	firstValue = 0;
	operatorValue = "";
	awaitingNextValue = false;
	calculatorDisplay.textContent = "0";
}

// Clear button Event Listener.
clearButton.addEventListener("click", resetAll);
