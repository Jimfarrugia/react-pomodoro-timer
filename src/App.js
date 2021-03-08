import { useState, useEffect } from "react";
import Break from "./components/Break";
import Session from "./components/Session";
import Timer from "./components/Timer";

function App() {
	const [intervalId, setIntervalId] = useState(null);
	const [isBreakTime, setIsBreakTime] = useState(false);
	const [breakLength, setBreakLength] = useState(300);
	const [sessionLength, setSessionLength] = useState(60 * 25);
	const [timeLeft, setTimeLeft] = useState(sessionLength);
	const isActive = intervalId !== null;

	useEffect(() => setTimeLeft(sessionLength), [sessionLength]);

	const decrementBreakLength = () => {
		const newBreakLength = breakLength - 60;
		newBreakLength < 0 ? setBreakLength(0) : setBreakLength(newBreakLength);
	};

	const decrementSessionLength = () => {
		const newSessionLength = sessionLength - 60;
		newSessionLength < 0
			? setSessionLength(0)
			: setSessionLength(newSessionLength);
	};

	const incrementBreakLength = () => setBreakLength(breakLength + 60);
	const incrementSessionLength = () => setSessionLength(sessionLength + 60);

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

	const onReset = () => {
		// clear the timer interval
		// set intervalId to null
		// set isBreakTime to false
		// reset sessionLength to 25min
		// reset breakLength to 5min
		// reset the timer to 25min
	};

	return (
		<div className="App">
			<h1>Pomodoro Timer</h1>
			<Break
				breakLength={breakLength}
				decrementBreakLength={decrementBreakLength}
				incrementBreakLength={incrementBreakLength}
			/>
			<Session
				sessionLength={sessionLength}
				decrementSessionLength={decrementSessionLength}
				incrementSessionLength={incrementSessionLength}
			/>
			<Timer
				sessionLength={sessionLength}
				breakLength={breakLength}
				isBreakTime={isBreakTime}
				isActive={isActive}
				timeLeft={timeLeft}
				onStartStop={onStartStop}
				onReset={onReset}
			/>
		</div>
	);
}

export default App;
