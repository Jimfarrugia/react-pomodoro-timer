import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import moment from "moment";

const Session = () => {
	const [sessionLength, setSessionLength] = useState(60 * 25);

	const decrementSessionLength = () => {
		const newSessionLength = sessionLength - 60;
		newSessionLength < 0
			? setSessionLength(0)
			: setSessionLength(newSessionLength);
	};

	const incrementSessionLength = () => {
		setSessionLength(sessionLength + 60);
	};

	const sessionLengthInMinutes = moment.duration(sessionLength, "s").minutes();

	return (
		<div>
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
