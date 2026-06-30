import { useEffect, useState, useCallback } from "react";

function Timer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Input state — only used before timer starts
  const [hoursInput, setHoursInput] = useState("");
  const [minutesInput, setMinutesInput] = useState("");
  const [secondsInput, setSecondsInput] = useState("");

  // Preset durations in seconds
  const presets = [
    { label: "1m", value: 60 },
    { label: "5m", value: 300 },
    { label: "10m", value: 600 },
    { label: "15m", value: 900 },
    { label: "30m", value: 1800 },
    { label: "1h", value: 3600 },
  ];

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const remainingAfterHours = timeLeft % 3600;
  const minutes = String(Math.floor(remainingAfterHours / 60)).padStart(2, "0");
  const seconds = String(remainingAfterHours % 60).padStart(2, "0");

  const showHours = timeLeft >= 3600 || Number(hoursInput) > 0;

  const handleStart = useCallback(() => {
    if (timeLeft === 0) {
      const total =
        Number(hoursInput || 0) * 3600 +
        Number(minutesInput || 0) * 60 +
        Number(secondsInput || 0);
      if (total <= 0) return;
      setTimeLeft(total);
    }
    setIsFinished(false);
    setIsRunning(true);
  }, [timeLeft, hoursInput, minutesInput, secondsInput]);

  const handleStop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(0);
    setIsFinished(false);
    setHoursInput("");
    setMinutesInput("");
    setSecondsInput("");
  }, []);

  const handlePreset = useCallback((value) => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(value);
    setHoursInput(String(Math.floor(value / 3600) || ""));
    setMinutesInput(String(Math.floor((value % 3600) / 60) || ""));
    setSecondsInput(String((value % 60) || ""));
  }, []);

  const handleInputChange = (setter) => (e) => {
    const val = e.target.value;
    if (val === "" || Number(val) >= 0) {
      setter(val);
    }
  };

  // Determine if we're in the "set time" mode (not started yet)
  const isSettingTime = timeLeft === 0 && !isRunning && !isFinished;

  return (
    <div className="bg-[#ebebeb] min-h-[calc(100vh-82px)]">
      <div className="flex flex-col justify-between items-center w-full min-h-[calc(100vh-82px)] px-12 py-16 text-black select-none">
        {/* Top spacing helper */}
        <div className="h-4" />

        {/* Giant Timer Display */}
        <div className="flex-1 flex flex-col items-center justify-center w-full gap-10">
          <div className="flex items-baseline justify-center">
            {/* Time display when running or paused or finished */}
            {!isSettingTime ? (
              <>
                {showHours && (
                  <>
                    <h1 className="font-sans font-bold text-[17vw] tracking-tighter leading-none font-mono tabular-nums text-black">
                      {hours}
                    </h1>
                    <span className="font-sans font-bold text-[17vw] tracking-tighter leading-none font-mono text-black">:</span>
                  </>
                )}
                <h1 className={`font-sans font-bold text-[17vw] tracking-tighter leading-none font-mono tabular-nums ${
                  isFinished ? "text-red-500" : "text-black"
                }`}>
                  {minutes}:{seconds}
                </h1>
              </>
            ) : (
              /* Input mode — styled as inline giant text */
              <div className="flex items-baseline gap-[0.5vw]">
                <input
                  type="number"
                  placeholder="00"
                  value={hoursInput}
                  onChange={handleInputChange(setHoursInput)}
                  min="0"
                  className="w-[16vw] bg-transparent text-center font-sans font-bold text-[12vw] tracking-tighter leading-none font-mono tabular-nums text-black placeholder-gray-300 outline-none border-b-4 border-transparent focus:border-gray-300 transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <span className="font-sans font-bold text-[12vw] tracking-tighter leading-none font-mono text-gray-300">:</span>
                <input
                  type="number"
                  placeholder="00"
                  value={minutesInput}
                  onChange={handleInputChange(setMinutesInput)}
                  min="0"
                  className="w-[16vw] bg-transparent text-center font-sans font-bold text-[12vw] tracking-tighter leading-none font-mono tabular-nums text-black placeholder-gray-300 outline-none border-b-4 border-transparent focus:border-gray-300 transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <span className="font-sans font-bold text-[12vw] tracking-tighter leading-none font-mono text-gray-300">:</span>
                <input
                  type="number"
                  placeholder="00"
                  value={secondsInput}
                  onChange={handleInputChange(setSecondsInput)}
                  min="0"
                  className="w-[16vw] bg-transparent text-center font-sans font-bold text-[12vw] tracking-tighter leading-none font-mono tabular-nums text-black placeholder-gray-300 outline-none border-b-4 border-transparent focus:border-gray-300 transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>
            )}
          </div>

          {/* Finished label */}
          {isFinished && (
            <span className="text-sm font-extrabold text-red-500 tracking-widest uppercase animate-pulse">
              Time's up
            </span>
          )}

          {/* Presets row — visible in setting mode */}
          {isSettingTime && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => handlePreset(p.value)}
                  className="px-4 py-1.5 text-xs font-extrabold rounded-full cursor-pointer transition-all duration-150 border border-gray-300/60 bg-white/70 text-gray-500 hover:text-black hover:border-gray-400 active:scale-95"
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Row — matches Home page layout */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-300/30 pt-8 mt-4">
          {/* Left: Status */}
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Status</span>
            <span className="block text-sm font-bold text-gray-600 mt-0.5">
              {isFinished ? "Finished" : isRunning ? "Counting down" : timeLeft > 0 ? "Paused" : "Set a time"}
            </span>
          </div>

          {/* Middle: Controls */}
          <div className="flex items-center gap-3">
            {/* Start / Stop pill */}
            <button
              onClick={isRunning ? handleStop : handleStart}
              className={`px-8 py-2.5 text-sm font-extrabold rounded-full cursor-pointer transition-all duration-150 active:scale-95 shadow-sm ${
                isRunning
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isRunning ? "Pause" : timeLeft > 0 && !isFinished ? "Resume" : "Start"}
            </button>

            {/* Reset button — only when there's something to reset */}
            {(timeLeft > 0 || isFinished) && !isRunning && (
              <button
                onClick={handleReset}
                className="px-5 py-2 text-xs font-extrabold rounded-full cursor-pointer transition-all duration-150 border border-gray-300/60 bg-white/70 text-gray-500 hover:text-black hover:border-gray-400 active:scale-95"
              >
                Reset
              </button>
            )}
          </div>

          {/* Right: Remaining info */}
          <div className="text-center sm:text-right">
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Remaining</span>
            <span className="block text-sm font-bold text-gray-600 mt-0.5 font-mono tabular-nums">
              {timeLeft > 0 ? `${hours}h ${minutes}m ${seconds}s` : "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;