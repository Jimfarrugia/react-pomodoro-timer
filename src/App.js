import { useState, useEffect, useRef } from "react";
import Break from "./components/Break";
import Session from "./components/Session";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

function App() {
	const audioElement = useRef(null);
	const [intervalId, setIntervalId] = useState(null);
	const [isBreakTime, setIsBreakTime] = useState(false);
	const [breakLength, setBreakLength] = useState(60 * 5);
	const [sessionLength, setSessionLength] = useState(60 * 25);
	const [timeLeft, setTimeLeft] = useState(sessionLength);
	const isActive = intervalId !== null;

	useEffect(() => setTimeLeft(sessionLength), [sessionLength]);

	useEffect(() => {
		if (timeLeft === 0) {
			audioElement.current.play();
			if (!isBreakTime) {
				setIsBreakTime(true);
				setTimeLeft(breakLength);
			}
			if (isBreakTime) {
				setIsBreakTime(false);
				setTimeLeft(sessionLength);
			}
		}
	}, [breakLength, sessionLength, timeLeft, isBreakTime]);

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

	const incrementBreakLength = () => {
		const newBreakLength = breakLength + 60;
		if (newBreakLength <= 60 * 60) {
			setBreakLength(newBreakLength);
		}
	};

	const incrementSessionLength = () => {
		const newSessionLength = sessionLength + 60;
		if (newSessionLength <= 60 * 60) {
			setSessionLength(newSessionLength);
		}
	};

	const onStartStop = () => {
		if (isActive) {
			clearInterval(intervalId);
			setIntervalId(null);
		} else {
			const newIntervalId = setInterval(() => {
				setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
			}, 1000);
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
		<div id="container">
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
			<Footer />
			<audio id="beep" ref={audioElement}>
				<source src="/beep.mp3" type="audio/mpeg" />
			</audio>
		</div>
	);
}

export default App;
