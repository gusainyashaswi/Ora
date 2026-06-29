import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = String(time.getHours() % 12 || 12).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");

  const ampm = time.getHours() >= 12 ? "PM" : "AM";

  const date = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col items-center text-[#0b57d0]">

      <h1 className="text-[320px] font-bold leading-none">
        {hours}:{minutes}:{seconds}
        <span className="text-[50px] font-medium tracking-widest">{ampm}</span>
      </h1>

      <p className="mt-6 text-4xl text-gray-500">
        {date}
      </p>

    </div>
  );
}

export default Clock;