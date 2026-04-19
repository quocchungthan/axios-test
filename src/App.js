import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          const res = await axios.get(
            "https://api.open-meteo.com/v1/forecast",
            {
              params: {
                latitude: lat,
                longitude: lon,
                daily: "temperature_2m_max,temperature_2m_min",
                timezone: "auto",
              },
            }
          );

          setWeather(res.data.daily);
        } catch (e) {
          setError("Failed to fetch weather");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Permission denied");
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Weather Forecast</h1>

      {weather.time.map((date, i) => (
        <div key={date}>
          <strong>{date}</strong>
          <div>Max: {weather.temperature_2m_max[i]}°C</div>
          <div>Min: {weather.temperature_2m_min[i]}°C</div>
        </div>
      ))}
    </div>
  );
}