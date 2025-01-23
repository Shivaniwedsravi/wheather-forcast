const apiKey = "51d9322c4d2e5cdbe051838b2c059d31"; // Your OpenWeatherMap API key
const form = document.getElementById("locationForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const location = document.getElementById("location").value.trim();
    if (!location) {
        resultDiv.innerHTML = "<p>Please enter a valid location.</p>";
        return;
    }

    try {
        const weatherData = await fetchWeather(location);
        displayWeather(weatherData);
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = `<p>Error: Could not find weather for "${location}". Please try again.</p>`;
    }
});

async function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Location not found");
    }

    return await response.json();
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;

    resultDiv.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Description:</strong> ${weather[0].description}</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
    `;
}
