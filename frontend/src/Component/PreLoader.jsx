import React, { useEffect, useState } from "react";

const quotes = [
  "“Travel far enough, you meet yourself.”",
  "“Life is short and the world is wide.”",
  "“Collect moments, not things.”",
  "“Travel makes one modest.”",
  "“To travel is to live.”",
];

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 4));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 text-white flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4 animate-pulse">🌍 Wanderlust</h1>

      <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full mb-4" />

      <div className="w-1/2 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-600 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-gray-300 mt-4 italic text-sm">{quote}</p>
    </div>
  );
};

export default Preloader;
