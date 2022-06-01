const calculatorDisplay = document.querySelector("h1");
const inputButtons = document.querySelectorAll("button");
const clearButton = document.getElementById("clear-btn");

function sendNumberValue(number) {
	// If current display value is 0, replace it.
	// If not, add a number (concatenate).
	const displayValue = calculatorDisplay.textContent;
	calculatorDisplay.textContent =
		displayValue === "0" ? number : displayValue + number;
}

// Add Event Listeners for numbers
// operators and decimal buttons.
inputButtons.forEach((input) => {
	if (input.classList.length === 0) {
		input.addEventListener("click", () => sendNumberValue(input.value));
	} else if (input.classList.contains("operator")) {
		input.addEventListener("click", () => sendNumberValue(input.value));
	} else if (input.classList.contains("decimal")) {
		input.addEventListener("click", () => sendNumberValue(input.value));
	}
});
