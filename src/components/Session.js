import moment from "moment";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Session = ({
	sessionLength,
	decrementSessionLength,
	incrementSessionLength,
}) => {
	const sessionLengthInMinutes = moment
		.duration(sessionLength, "s")
		.asMinutes();

	return (
		<div id="session">
			<h3 id="session-label">Session Length</h3>
			<button id="session-decrement" onClick={decrementSessionLength}>
				<FaArrowDown />
			</button>
			<span id="session-length">{sessionLengthInMinutes}</span>
			<button id="session-increment" onClick={incrementSessionLength}>
				<FaArrowUp />
			</button>
		</div>
	);
};

export default Session;
