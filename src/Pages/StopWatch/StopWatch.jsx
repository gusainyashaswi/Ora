import { useEffect, useState, useCallback } from "react";

function StopWatch() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 10);
    }, 10);
    return () => clearInterval(interval);
  }, [isRunning]);

  const hours = String(Math.floor(elapsed / 3600000)).padStart(2, "0");
  const minutes = String(Math.floor((elapsed % 3600000) / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, "0");
  const centiseconds = String(Math.floor((elapsed % 1000) / 10)).padStart(2, "0");

  const handleStartStop = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setElapsed(0);
    setLaps([]);
  }, []);

  const handleLap = useCallback(() => {
    setLaps((prev) => [elapsed, ...prev]);
  }, [elapsed]);

  const formatLapTime = (ms) => {
    const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
    const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${h}:${m}:${s}.${cs}`;
  };

  const showHours = elapsed >= 3600000;

  return (
    <div className="min-h-[calc(100vh-82px)]">
      <div className="flex flex-col justify-between items-center w-full min-h-[calc(100vh-82px)] px-12 py-16 text-black select-none">
        <div className="h-4" />

        <div className="flex-1 flex items-center justify-center w-full">
          <div className="flex items-baseline justify-center">
            {showHours && (
              <>
                <h1 className="font-sans font-bold text-[17vw] tracking-tighter leading-none font-mono tabular-nums text-black">
                  {hours}
                </h1>
                <span className="font-sans font-bold text-[17vw] tracking-tighter leading-none font-mono text-black">:</span>
              </>
            )}
            <h1 className="font-sans font-bold text-[17vw] tracking-tighter leading-none font-mono tabular-nums text-black">
              {minutes}:{seconds}
            </h1>
            <span className="text-[5vw] font-bold ml-[0.5vw] text-gray-400 font-mono tabular-nums self-end pb-[2.2vw]">
              .{centiseconds}
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-300/30 pt-8 mt-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Status</span>
            <span className="block text-sm font-bold text-gray-600 mt-0.5">
              {isRunning ? "Running" : elapsed > 0 ? "Paused" : "Ready"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isRunning && (
              <button
                onClick={handleLap}
                className="px-5 py-2 text-xs font-extrabold rounded-full cursor-pointer transition-all duration-150 border border-gray-300/60 bg-white/70 text-gray-500 hover:text-black hover:border-gray-400 active:scale-95"
              >
                Lap
              </button>
            )}

            <button
              onClick={handleStartStop}
              className={`px-8 py-2.5 text-sm font-extrabold rounded-full cursor-pointer transition-all duration-150 active:scale-95 shadow-sm ${
                isRunning
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isRunning ? "Stop" : elapsed > 0 ? "Resume" : "Start"}
            </button>

            {!isRunning && elapsed > 0 && (
              <button
                onClick={handleReset}
                className="px-5 py-2 text-xs font-extrabold rounded-full cursor-pointer transition-all duration-150 border border-gray-300/60 bg-white/70 text-gray-500 hover:text-black hover:border-gray-400 active:scale-95"
              >
                Reset
              </button>
            )}
          </div>

          <div className="text-center sm:text-right">
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Laps</span>
            <span className="block text-sm font-bold text-gray-600 mt-0.5">
              {laps.length > 0 ? laps.length : "—"}
            </span>
          </div>
        </div>

        {laps.length > 0 && (
          <div className="w-full max-w-md mt-8 flex flex-col gap-1">
            {laps.map((lapTime, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-5 py-2.5 rounded-2xl text-sm bg-white/50 border border-gray-200/50"
              >
                <span className="font-bold text-gray-400 text-xs">
                  Lap {laps.length - index}
                </span>
                <span className="font-mono font-bold text-gray-700 tabular-nums">
                  {formatLapTime(lapTime)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StopWatch;