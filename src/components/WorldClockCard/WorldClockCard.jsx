import { useCallback, useEffect, useState } from "react";

function WorldClockCard({ city, country, timezone, is24Hour, onRemove }) {
  // Function to format current time
  const getCurrentTime = useCallback(() => {
    try {
      return new Date().toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: !is24Hour,
      });
    } catch {
      return new Date().toLocaleTimeString();
    }
  }, [timezone, is24Hour]);

  // Function to get ISO local date comparison
  const getRelativeDateInfo = useCallback(() => {
    try {
      const date = new Date();
      // YYYY-MM-DD format in target timezone
      const targetDateStr = date.toLocaleDateString("en-CA", { timeZone: timezone });
      const localDateStr = date.toLocaleDateString("en-CA");

      const targetTime = new Date(targetDateStr).getTime();
      const localTime = new Date(localDateStr).getTime();
      const diffDays = Math.round((targetTime - localTime) / (1000 * 60 * 60 * 24));

      let relativeLabel = "";
      if (diffDays === 0) relativeLabel = "Now";
      else if (diffDays === 1) relativeLabel = "Tomorrow, +1d";
      else if (diffDays === -1) relativeLabel = "Yesterday, -1d";
      else if (diffDays > 1) relativeLabel = `+${diffDays} days`;
      else if (diffDays < -1) relativeLabel = `${diffDays} days`;

      const formattedDate = date.toLocaleDateString("en-US", {
        timeZone: timezone,
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      return { relativeLabel, formattedDate };
    } catch {
      return { relativeLabel: "Today", formattedDate: new Date().toDateString() };
    }
  }, [timezone]);

  // Function to get UTC Offset
  const getUTCOffset = useCallback(() => {
    try {
      const date = new Date();
      const parts = date.toLocaleDateString("en-US", { timeZone: timezone, timeZoneName: "longOffset" });
      const match = parts.match(/GMT([+-]\d{1,2}):?(\d{2})?/);
      if (match) {
        const hours = parseInt(match[1], 10);
        const mins = match[2] || "00";
        const minutes = parseInt(mins, 10);
        if (hours === 0 && minutes === 0) return "UTC 0";
        return `UTC ${hours > 0 ? "+" : ""}${hours}${minutes > 0 ? `:${mins}` : ""}`;
      }
      return "UTC 0";
    } catch {
      return "UTC 0";
    }
  }, [timezone]);

  // Determine if it is Day or Night (6 AM to 6 PM)
  const getIsDay = useCallback(() => {
    try {
      const hourStr = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "numeric",
        hour12: false,
      }).format(new Date());
      const hour = parseInt(hourStr, 10);
      return hour >= 6 && hour < 18;
    } catch {
      return true;
    }
  }, [timezone]);

  const [time, setTime] = useState(getCurrentTime());
  const [isDay, setIsDay] = useState(getIsDay());
  const [dateInfo, setDateInfo] = useState(getRelativeDateInfo());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
      setIsDay(getIsDay());
      setDateInfo(getRelativeDateInfo());
    }, 1000);

    return () => clearInterval(interval);
  }, [getCurrentTime, getIsDay, getRelativeDateInfo]);

  const utcOffset = getUTCOffset();

  // Split standard time into digits & AM/PM if 12h
  let displayTime = time;
  let ampm = "";
  if (!is24Hour) {
    const parts = time.split(" ");
    displayTime = parts[0] || "";
    ampm = parts[1] || "";
  }

  // Choose styling classnames based on day/night
  const cardBgClass = isDay 
    ? "bg-slate-100 text-slate-800 border border-slate-200/60 hover:bg-slate-200/50 hover:shadow-md" 
    : "bg-zinc-950 text-zinc-100 border border-zinc-900 hover:bg-zinc-900 hover:shadow-2xl hover:shadow-black/45";

  const labelColorClass = isDay ? "text-slate-500" : "text-zinc-400";
  const titleColorClass = isDay ? "text-slate-800" : "text-zinc-100";
  const offsetColorClass = isDay ? "text-slate-400" : "text-zinc-500";
  const dateColorClass = isDay ? "text-slate-500 font-medium" : "text-zinc-400 font-medium";

  return (
    <div className={`group relative rounded-[2.2rem] p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 ${cardBgClass}`}>
      {/* Top row */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-wide uppercase opacity-75">{country}</span>
          <h2 className={`text-3xl font-black tracking-tight mt-1 ${titleColorClass}`}>
            {city}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold tracking-wider uppercase font-mono ${offsetColorClass}`}>
            {utcOffset}
          </span>
          <button 
            onClick={onRemove}
            className={`opacity-0 group-hover:opacity-100 cursor-pointer p-1.5 rounded-full hover:bg-red-500/10 text-red-500 hover:text-red-600 transition-all duration-200`}
            title={`Remove ${city}`}
            aria-label={`Remove ${city}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Middle row: Day / Night Status */}
      <div className="mt-4 flex items-center">
        <span className={`text-sm font-bold flex items-center gap-1.5 ${labelColorClass}`}>
          {isDay ? (
            <>
              Day 
            </>
          ) : (
            <>
              Night
            </>
          )}
        </span>
      </div>

      {/* Time Display */}
      <div className="mt-4 mb-2 flex items-baseline">
        <h1 className="text-5xl font-black tracking-tighter font-mono tabular-nums">
          {displayTime}
        </h1>
        {ampm && (
          <span className="text-xl font-bold ml-1.5 tracking-wider font-mono opacity-80 uppercase select-none">
            {ampm}
          </span>
        )}
      </div>

      {/* Bottom row: Dates */}
      <div className="flex justify-between items-center text-xs border-t border-current/10 pt-4 mt-2">
        <span className={dateColorClass}>
          {dateInfo.formattedDate}
        </span>
        <span className={`font-black tracking-wide uppercase px-2 py-0.5 rounded-md text-[10px] ${
          dateInfo.relativeLabel.includes("Tomorrow") 
            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
            : dateInfo.relativeLabel.includes("Yesterday")
            ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
            : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
        }`}>
          {dateInfo.relativeLabel}
        </span>
      </div>
    </div>
  );
}

export default WorldClockCard;