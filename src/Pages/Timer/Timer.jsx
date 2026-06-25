import { useEffect, useState } from "react";

function Timer() {

  const [timeLeft, setTimeLeft] = useState(0);

  const [hoursInput, setHoursInput] = useState("");
  const [minutesInput, setMinutesInput] = useState("");
  const [secondsInput, setSecondsInput] = useState("");
  const [classname, setClassname] = useState("bg-blue-100");

  const [isRunning, setIsRunning] = useState(false);

  if(hoursInput<0)
    setHoursInput("")
  if(secondsInput<0)
    setSecondsInput("")
  if(minutesInput<0)
    setMinutesInput("")

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);
      setClassname("bg-blue-100")
      return;
    }
    if(timeLeft>0){
      setClassname("bg-white")
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);


  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");

  const remainingSeconds = timeLeft % 3600;

  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");

  const seconds = String(remainingSeconds % 60).padStart(2, "0");

  function startHandler() {
    if (timeLeft === 0) {
      const totalSeconds =
        Number(hoursInput) * 3600 +
        Number(minutesInput) * 60 +
        Number(secondsInput);

      setTimeLeft(totalSeconds);
    }

    setIsRunning(true);
  }

  function stopHandler() {
    setIsRunning(false);
  }

  function resetHandler() {
    setIsRunning(false);
    setTimeLeft(0);

    setHoursInput("");
    setMinutesInput("");
    setSecondsInput("");
  }

  const btnStyle =
    "px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200";

  const inputStyle =
    "w-28 rounded-lg border border-gray-300 px-4 py-2 text-center outline-none focus:border-blue-600";

  return (
    <>
      <div className={`flex flex-col items-center justify-center gap-10 h-screen ${classname}`}>

        <h1 className="text-[200px] md:text-[260px] lg:text-[320px] font-bold text-[#0b57d0] leading-none">
          {hours}:{minutes}:{seconds}
        </h1>

        <div className="flex gap-4">

          <input
            type="number"
            placeholder="HH"
            value={hoursInput}
            onChange={(e) => setHoursInput(e.target.value)}
            className={inputStyle}
            min="0"
          />

          <input
            type="number"
            placeholder="MM"
            value={minutesInput}
            onChange={(e) => setMinutesInput(e.target.value)}
            className={inputStyle}
            min="0"
          />

          <input
            type="number"
            placeholder="SS"
            value={secondsInput}
            onChange={(e) => setSecondsInput(e.target.value)}
            className={inputStyle}
            min="0"
          />

        </div>

        <div className="flex gap-6">

          {isRunning ? (
            <button
              className={btnStyle}
              onClick={stopHandler}
            >
              Stop
            </button>
          ) : (
            <button
              className={btnStyle}
              onClick={startHandler}
            >
              Start
            </button>
          )}

          <button
            className={btnStyle}
            onClick={resetHandler}
          >
            Reset
          </button>

        </div>

      </div>
    </>
  );
}

export default Timer;