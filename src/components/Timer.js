import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

momentDurationFormatSetup(moment);

const Timer = ({ isBreakTime, isActive, timeLeft, onStartStop, onReset }) => {
	const formattedTimeLeft = moment
		.duration(timeLeft, "s")
		.format("mm:ss", { trim: false });

	return (
		<div id="timer" style={isBreakTime ? { backgroundColor: "#19C97D" } : {}}>
			<h2 id="timer-label">{isBreakTime ? "Break" : "Session"}</h2>
			<p id="time-left">{formattedTimeLeft}</p>
			<div id="timer-controls">
				<button id="start_stop" onClick={onStartStop}>
					{isActive ? <FaPause /> : <FaPlay />}
				</button>
				<button id="reset" onClick={onReset} style={{ marginLeft: "30px" }}>
					<FaRedo />
				</button>
			</div>
		</div>
	);
};

export default Timer;
