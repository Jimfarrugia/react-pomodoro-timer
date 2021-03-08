import { useState, useEffect, useRef } from "react";
import Break from "./components/Break";
import Session from "./components/Session";
import Timer from "./components/Timer";

function App() {
	const audioElement = useRef(null);
	const [intervalId, setIntervalId] = useState(null);
	const [isBreakTime, setIsBreakTime] = useState(false);
	const [breakLength, setBreakLength] = useState(300);
	const [sessionLength, setSessionLength] = useState(60 * 25);
	const [timeLeft, setTimeLeft] = useState(sessionLength);
	const isActive = intervalId !== null;

	useEffect(() => setTimeLeft(sessionLength), [sessionLength]);

	const decrementBreakLength = () => {
		const newBreakLength = breakLength - 60;
		if (newBreakLength > 0) {
			setBreakLength(newBreakLength);
		}
	};

	const decrementSessionLength = () => {
		const newSessionLength = sessionLength - 60;
		if (newSessionLength > 0) {
			setSessionLength(newSessionLength);
		}
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
					audioElement.current.volume = 0.1;
					audioElement.current.play();
					if (!isBreakTime) {
						setIsBreakTime(true); //! this switch doesn't seem to be working -> break timer repeats
						setTimeLeft(breakLength);
					}
					if (isBreakTime) {
						setIsBreakTime(false); //! this switch doesn't seem to be working -> break timer repeats
						setTimeLeft(sessionLength);
					}
				});
			}, 10); // TODO: change to '1000'
			setIntervalId(newIntervalId);
		}
	};

	const onReset = () => {
		audioElement.current.load();
		clearInterval(intervalId);
		setIntervalId(null);
		setIsBreakTime(false);
		setSessionLength(60 * 25);
		setBreakLength(60 * 5);
		setTimeLeft(60 * 25);
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
				isBreakTime={isBreakTime}
				isActive={isActive}
				timeLeft={timeLeft}
				onStartStop={onStartStop}
				onReset={onReset}
			/>
			<audio id="beep" ref={audioElement}>
				<source
					src="https://onlineclock.net/audio/options/default.mp3"
					type="audio/mpeg"
				/>
			</audio>
		</div>
	);
}

export default App;
