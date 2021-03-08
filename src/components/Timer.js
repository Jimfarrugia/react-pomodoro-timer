import { useState, useEffect } from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

momentDurationFormatSetup(moment);

const Timer = ({ sessionLength, breakLength }) => {
	const [intervalId, setIntervalId] = useState(null);
	const [timeLeft, setTimeLeft] = useState(sessionLength);
	const [isBreakTime, setIsBreakTime] = useState(false);
	const formattedTimeLeft = moment
		.duration(timeLeft, "s")
		.format("mm:ss", { trim: false });
	const isActive = intervalId !== null;

	useEffect(() => setTimeLeft(sessionLength), [sessionLength]);

	const onStartStop = () => {
		if (isActive) {
			clearInterval(intervalId);
			setIntervalId(null);
		} else {
			const newIntervalId = setInterval(() => {
				setTimeLeft(prevTimeLeft => {
					const newTimeLeft = prevTimeLeft - 1;
					if (newTimeLeft >= 0) {
						return newTimeLeft;
					}
					if (!isBreakTime) {
						setTimeLeft(breakLength);
						setIsBreakTime(true); //! this switch doesn't seem to be working
					}
					if (isBreakTime) {
						setTimeLeft(sessionLength);
						setIsBreakTime(false); //! this switch doesn't seem to be working
					}
				});
			}, 100); // TODO: change to '1000'
			setIntervalId(newIntervalId);
		}
	};

	return (
		<div>
			<h2 id="timer-label">{isBreakTime ? "Break" : "Session"}</h2>
			<p id="time-left">{formattedTimeLeft}</p>
			<button onClick={onStartStop}>
				{isActive ? <FaPause /> : <FaPlay />}
			</button>
		</div>
	);
};

export default Timer;
