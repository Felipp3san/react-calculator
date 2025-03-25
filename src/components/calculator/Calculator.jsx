import { useState } from "react";
import './styles.css';

const Calculator = () => {
	const [formula, setFormula] = useState("");
	const [output, setOutput] = useState("");
	const [shouldClear, setShouldClear] = useState(false);

	const handleClick = (event) => {
		const operators = ['+', '-', '*', '/'];
		const button = event.target;
		const value = button.textContent || button.innerText;

		if (!button.classList.contains("button")) return; // Ignore clicks outside buttons

		switch (value) {
			case "AC":
				clear();
				break;
			case "=":
				if (shouldClear) return;

				try {
					// Clear formula, removing consecutive minus signs
					const clearFormula = removeDuplicateMinus(formula);
					setFormula(clearFormula);

					const result = eval(clearFormula);
					setFormula((prev) => prev + `=${result}`)
					setOutput(result);
				} catch {
					setFormula("");
					setOutput("Error");
				}

				setShouldClear(true);
				break;
			case "+": case "-": case "/": case "*":
				if (shouldClear) setFormula(output);

				// Limit by 2 signs
				if (!operators.includes(formula[formula.length - 2])) {
				// Swap sign if its not '-'
					if (operators.includes(formula[formula.length - 1]) && value !== '-')
						setFormula(prev => prev.slice(0, -1));

					setFormula(prev => prev + value);
					setOutput(value);
				}

				setShouldClear(false);
				break;
			default:
				if (shouldClear) clear();

				setFormula(prev => prev + value);
				setOutput(prev => {
					return prev + value;
				});

				setShouldClear(false);
		}
	}

	const clear = () => {
		setFormula("");
		setOutput("")
	}

	const removeDuplicateMinus = () => {
		return (formula.split("").filter((value, index, arr) => {
			if (value === '-') {
				return arr[index] !== arr[index - 1];
			} 
			else {
				return value
			}
		}).join(""));
	}

	return (
		<div className="grid grid-cols-4 grid-rows-6 bg-neutral-950 min-w-sm text-2xl p-[3px]" onClick={handleClick}>

			{/* Display */}
			<div className="bg-transparent font-[Digital] px-2 text-right col-span-4 select-none">
				<div className="text-md text-yellow-300 h-6">
					{formula}
				</div>
				<div id="display" className="text-5xl">
					{output || 0}
				</div>
			</div>

			{/* First row*/}
			<div id="clear" className="button bg-rose-600 col-span-2">AC</div>
			<div id="divide" className="button operation-button">/</div>
			<div id="multiply" className="button operation-button">*</div>

			{/* Second row*/}
			<div id="seven" className="button number-button">7</div>
			<div id="eight" className="button number-button">8</div>
			<div id="nine" className="button number-button">9</div>
			<div id="subtract" className="button operation-button">-</div>

			{/* Third row*/}
			<div id="four" className="button number-button">4</div>
			<div id="five" className="button number-button">5</div>
			<div id="six" className="button number-button">6</div>
			<div id="add" className="button operation-button">+</div>

			{/* Fourth row*/}
			<div id="one" className="button number-button">1</div>
			<div id="two" className="button number-button">2</div>
			<div id="three" className="button number-button">3</div>
			<div id="equals" className="button equals-button row-span-2" >=</div>

			{/* Fifth row*/}
			<div id="zero" className="button number-button col-span-2">0</div>
			<div id="decimal" className="button number-button">.</div>
		</div>
	)
}

export default Calculator;