import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // 👇 inject build time (from Vite)
  const buildTime = __BUILD_TIME__;

  useEffect(() => {
    // weather
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const res = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          daily: "temperature_2m_max,temperature_2m_min",
          timezone: "auto",
        },
      });

      setWeather(res.data.daily);
      setLoading(false);
    });

  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", background: "#f5f7fa", minHeight: "100vh" }}>
      
      {/* 🔥 STATUS BAR */}
      <div
        style={{
          background: "#111",
          color: "#fff",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 14,
        }}
      >
        <div>🚀 Deployed: {buildTime}</div>
        <div>📦 Axios downloads (7d): {Number(__AXIOS_DOWNLOADS__).toLocaleString()}</div>
      </div>

      {/* CONTENT */}
      <div style={{ padding: 20 }}>
        <h1>🌤 Weather Forecast</h1>

        {loading && <p>Loading...</p>}

        {weather?.time?.map((date, i) => (
          <div
            key={date}
            style={{
              background: "#fff",
              padding: 12,
              marginBottom: 10,
              borderRadius: 8,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <strong>{date}</strong>
            <div>Max: {weather.temperature_2m_max[i]}°C</div>
            <div>Min: {weather.temperature_2m_min[i]}°C</div>
          </div>
        ))}
      </div>
    </div>
  );
}