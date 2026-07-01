import { useEffect, useState } from "react";
import WorldClockCard from "../../components/WorldClockCard/WorldClockCard";
import { AVAILABLE_CITIES } from "../../utils/citiesData";

const DEFAULT_CITIES = [
  { city: "New Delhi", country: "India", timezone: "Asia/Kolkata", flag: "🇮🇳" },
  { city: "London", country: "United Kingdom", timezone: "Europe/London", flag: "🇬🇧" },
  { city: "New York", country: "United States", timezone: "America/New_York", flag: "🇺🇸" },
  { city: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", flag: "🇯🇵" },
];

function WorldClock() {
  const [cities, setCities] = useState(() => {
    const saved = localStorage.getItem("world_clock_cities");
    return saved ? JSON.parse(saved) : DEFAULT_CITIES;
  });

  const [is24Hour, setIs24Hour] = useState(() => {
    const saved = localStorage.getItem("world_clock_24h");
    return saved ? JSON.parse(saved) : false;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("world_clock_cities", JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    localStorage.setItem("world_clock_24h", JSON.stringify(is24Hour));
  }, [is24Hour]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setSearchQuery("");
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const addCity = (cityObj) => {
    setCities((prev) => [...prev, cityObj]);
    setIsModalOpen(false);
    setSearchQuery("");
  };

  const removeCity = (indexToRemove) => {
    setCities((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const filtered = AVAILABLE_CITIES.filter((item) => {
    const query = searchQuery.toLowerCase();
    const isAlreadyAdded = cities.some(
      (c) => c.timezone === item.timezone && c.city === item.city
    );
    if (isAlreadyAdded) return false;

    return (
      item.city.toLowerCase().includes(query) ||
      item.country.toLowerCase().includes(query) ||
      item.timezone.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-20 min-h-[calc(100vh-80px)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-gray-150 pb-8">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            World Clock
          </h1>
          <p className="text-sm font-medium text-gray-400 mt-1">
            Keep track of local times in major cities worldwide
          </p>
        </div>

      
        <div className="flex items-center gap-3 bg-gray-50 border-none px-4 py-2 rounded-2xl w-fit self-start md:self-auto shadow-sm">
          <span className="text-xs font-bold text-gray-400 font-mono">12h</span>
          <button
            onClick={() => setIs24Hour(!is24Hour)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              is24Hour ? "bg-gray-600" : "bg-gray-200"
            }`}
            aria-label="Toggle time format"
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                is24Hour ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-xs font-bold text-gray-400 font-mono">24h</span>
        </div>
      </div>

      {cities.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-[2.2rem] border border-gray-100 mb-8 px-6">
          <p className="text-gray-400 font-bold text-lg">No city clocks added yet.</p>
          <p className="text-sm text-gray-400 mt-1">Add a city to track its local time relative to yours.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-md active:scale-95 cursor-pointer text-sm"
          >
            Add Your First Clock
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {cities.map((cityObj, index) => (
          <WorldClockCard
            key={`${cityObj.city}-${cityObj.timezone}`}
            {...cityObj}
            is24Hour={is24Hour}
            onRemove={() => removeCity(index)}
          />
        ))}

        {cities.length > 0 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="group border-2 border-dashed border-gray-200 hover:border-gray-600 bg-transparent flex flex-col items-center justify-center min-h-[220px] rounded-[2.2rem] cursor-pointer hover:bg-blue-50/10 transition-all duration-300 active:scale-95"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-gray-600 flex items-center justify-center text-gray-400 group-hover:text-white transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <span className="text-base font-bold text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                Add City Clock
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Autocomplete Search Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/30 animate-fade-in"
          onClick={() => {
            setIsModalOpen(false);
            setSearchQuery("");
          }}
        >
          <div
            className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 max-h-[80vh] flex flex-col transform animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-4 border-b border-gray-150 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Add Clock</h3>
                <p className="text-xs font-semibold text-gray-400 mt-0.5">Choose a city from the list below</p>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSearchQuery("");
                }}
                className="text-gray-400 hover:text-gray-650 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-8 py-5 border-b border-gray-150 bg-gray-50/50">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  placeholder="Search by city, country or timezone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-100 focus:ring-1 focus:ring-gray-600 transition-all shadow-sm"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.636Z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-gray-50 max-h-[400px]">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <button
                    key={`${item.city}-${item.timezone}`}
                    onClick={() => addCity(item)}
                    className="w-full text-left px-4 py-4 hover:bg-blue-50/40 rounded-[1.5rem] flex items-center justify-between transition-all duration-200 group cursor-pointer border border-transparent hover:border-blue-100/50"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl select-none"></span>
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                          {item.city}
                        </h4>
                        <p className="text-xs text-gray-450 font-medium mt-0.5">
                          {item.country} • <span className="font-mono text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md">{item.timezone}</span>
                        </p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-gray-600 group-hover:border-blue-650 group-hover:text-white transition-all shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400 text-sm font-semibold">
                  No cities found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorldClock;