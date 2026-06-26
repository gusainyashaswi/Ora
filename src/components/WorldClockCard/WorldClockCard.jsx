import { useEffect, useState } from "react";

function WorldClockCard({ city, country, timezone, flag }) {

  function getCurrentTime() {
    return new Date().toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }

  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 p-8">

      <div className="flex items-center gap-3 mb-6">
        <span className="text-5xl">{flag}</span>

        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {city}
          </h2>

          <p className="text-gray-500">
            {country}
          </p>
        </div>
      </div>

      <h1 className="text-5xl font-bold text-[#0b57d0] mb-5">
        {time}
      </h1>

      <p className="text-gray-500">
        {timezone}
      </p>

    </div>
  );
}

export default WorldClockCard;