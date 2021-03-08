import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import moment from "moment";

const Break = () => {
	const [breakLength, setBreakLength] = useState(300);

	const decrementBreakLength = () => {
		const newBreakLength = breakLength - 60;
		newBreakLength < 0 ? setBreakLength(0) : setBreakLength(newBreakLength);
	};

	const incrementBreakLength = () => {
		setBreakLength(breakLength + 60);
	};

	const breakLengthInMinutes = moment.duration(breakLength, "s").minutes();

	return (
		<div>
			<h3 id="break-label">Break Length</h3>
			<button id="break-decrement" onClick={decrementBreakLength}>
				<FaArrowDown />
			</button>
			<span id="break-length">{breakLengthInMinutes}</span>
			<button id="break-increment" onClick={incrementBreakLength}>
				<FaArrowUp />
			</button>
		</div>
	);
};

export default Break;
