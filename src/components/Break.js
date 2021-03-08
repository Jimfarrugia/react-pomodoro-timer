import moment from "moment";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Break = ({ breakLength, decrementBreakLength, incrementBreakLength }) => {
	const breakLengthInMinutes = moment.duration(breakLength, "s").asMinutes();

	return (
		<div id="break">
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
