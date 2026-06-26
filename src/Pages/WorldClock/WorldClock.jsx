import WorldClockCard from "../../components/WorldClockCard/WorldClockCard";

function WorldClock() {
  const cities = [
    {
      id: 1,
      city: "New Delhi",
      country: "India",
      timezone: "Asia/Kolkata",
      flag: "🇮🇳",
    },
    {
      id: 2,
      city: "London",
      country: "United Kingdom",
      timezone: "Europe/London",
      flag: "🇬🇧",
    },
    {
      id: 3,
      city: "New York",
      country: "United States",
      timezone: "America/New_York",
      flag: "🇺🇸",
    },
    {
      id: 4,
      city: "Tokyo",
      country: "Japan",
      timezone: "Asia/Tokyo",
      flag: "🇯🇵",
    },
    {
      id: 5,
      city: "Sydney",
      country: "Australia",
      timezone: "Australia/Sydney",
      flag: "🇦🇺",
    },
    {
      id: 6,
      city: "Dubai",
      country: "UAE",
      timezone: "Asia/Dubai",
      flag: "🇦🇪",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-5xl font-bold text-center text-[#0b57d0] mb-12">
        World Clock
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {cities.map((city) => (
          <WorldClockCard key={city.id} {...city} />
        ))}
      </div>
    </div>
  );
}

export default WorldClock;