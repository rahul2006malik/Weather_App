const apiKey = "f87fbef9c8be4e5580c134604251003";

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`City not found (Error: ${response.status})`);
    }

    const data = await response.json();
    console.log(data);

    document.getElementById("weather-info").innerHTML = `
            <h2>${data.location.name}, ${data.location.country} 🌍</h2>
            <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
            <p><strong>🌡 Temperature:</strong> ${data.current.temp_c}°C (${data.current.temp_f}°F)</p>
            <p><strong>🌞 Condition:</strong> ${data.current.condition.text}</p>
            <p><strong>💨 Wind:</strong> ${data.current.wind_kph} km/h, ${data.current.wind_dir}</p>
            <p><strong>💧 Humidity:</strong> ${data.current.humidity}%</p>
            <p><strong>🌍 Air Quality Index:</strong> US-EPA Index ${data.current.air_quality["us-epa-index"]}</p>
        `;
  } catch (error) {
    document.getElementById(
      "weather-info"
    ).innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}
