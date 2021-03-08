import { useState } from "react";
import Break from "./components/Break";
import Session from "./components/Session";

function App() {
	const [breakLength, setBreakLength] = useState(300);
	const [sessionLength, setSessionLength] = useState(60 * 25);

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
		</div>
	);
}

export default App;
