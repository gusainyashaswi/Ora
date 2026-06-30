import { useEffect, useState, useMemo } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(() => {
    const saved = localStorage.getItem("home_clock_24h");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("home_clock_24h", JSON.stringify(is24Hour));
  }, [is24Hour]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const year = time.getFullYear();
  const month = time.getMonth();
  const date = time.getDate();

  const solar = useMemo(() => {
    const start = new Date(year, 0, 0);
    const diff = new Date(year, month, date) - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);

    const angle = (2 * Math.PI * (day - 172)) / 365;
    
    // Estimates sunrise (base ~6:06 AM, ±48 mins)
    const sunriseHour = 6.1 - Math.cos(angle) * 0.8;
    // Estimates sunset (base ~6:24 PM, ±54 mins)
    const sunsetHour = 18.4 + Math.cos(angle) * 0.9;

    const formatSolarTime = (decimalHour) => {
      const hours = Math.floor(decimalHour);
      const minutes = Math.floor((decimalHour - hours) * 60);
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    };

    const diffHours = sunsetHour - sunriseHour;
    const lengthHrs = Math.floor(diffHours);
    const lengthMins = Math.floor((diffHours - lengthHrs) * 60);

    return {
      sunrise: formatSolarTime(sunriseHour),
      sunset: formatSolarTime(sunsetHour),
      length: `${lengthHrs}h ${String(lengthMins).padStart(2, "0")}m`
    };
  }, [year, month, date]);

  const formattedHours = is24Hour 
    ? String(time.getHours()).padStart(2, "0")
    : String(time.getHours() % 12 || 12).padStart(2, "0");
  const formattedMinutes = String(time.getMinutes()).padStart(2, "0");
  const formattedSeconds = String(time.getSeconds()).padStart(2, "0");
  const ampm = time.getHours() >= 12 ? "PM" : "AM";

  return (
    <div className="flex flex-col justify-between items-center w-full min-h-[calc(100vh-82px)] px-12 py-16 text-black select-none">
      {/* Top spacing helper */}
      <div className="h-4" />

      {/* Giant Clock display */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="flex items-baseline justify-center">
          <h1 className="font-sans font-bold text-[17vw] tracking-tighter leading-none font-mono tabular-nums text-black">
            {formattedHours}:{formattedMinutes}:{formattedSeconds}
          </h1>
          {!is24Hour && (
            <span className="text-[3vw] font-bold ml-[1vw] uppercase text-gray-400 font-mono self-end pb-[2.2vw]">
              {ampm}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Information Row */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-300/30 pt-8 mt-4">
        {/* Left: Location */}
        <div className="text-center sm:text-left">
          <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Location</span>
          <span className="block text-sm font-bold text-gray-600 mt-0.5">
            Current ({Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[1]?.replace("_", " ") || "Local"})
          </span>
        </div>

        {/* Middle: Sun info and Date */}
        <div className="text-center flex flex-col items-center gap-0.5">
          <span className="text-sm font-bold text-gray-700">
            Sun ☀️: {solar.sunrise} - {solar.sunset} ({solar.length})
          </span>
          <span className="text-xs font-bold text-gray-400">
            {time.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>

        {/* Right: 12h/24h Toggle Pill */}
        <div className="flex bg-white/70 border border-gray-300/60 p-0.5 rounded-full shadow-sm">
          <button 
            onClick={() => setIs24Hour(false)}
            className={`px-4 py-1.5 text-xs font-extrabold rounded-full cursor-pointer transition-all duration-150 ${
              !is24Hour ? "bg-black text-white" : "text-gray-400 hover:text-black"
            }`}
          >
            12h
          </button>
          <button 
            onClick={() => setIs24Hour(true)}
            className={`px-4 py-1.5 text-xs font-extrabold rounded-full cursor-pointer transition-all duration-150 ${
              is24Hour ? "bg-black text-white" : "text-gray-400 hover:text-black"
            }`}
          >
            24h
          </button>
        </div>
      </div>
    </div>
  );
}

export default Clock;