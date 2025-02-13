const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';
; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherDetails = document.getElementById('weatherDetails');
const errorMessage = document.getElementById('errorMessage');
const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const description = document.getElementById('description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const toggleTempBtn = document.getElementById('toggleTemp');

let isCelsius = true;

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        showError("Please enter a city name.");
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found.");
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        showError(error.message);
    }
}

function updateWeatherUI(data) {
    errorMessage.classList.add('hidden');
    weatherDetails.classList.remove('hidden');

    cityName.textContent = data.name;
    description.textContent = data.weather[0].description;
    temperature.textContent = data.main.temp.toFixed(1);
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    isCelsius = true;
}

toggleTempBtn.addEventListener('click', () => {
    let temp = parseFloat(temperature.textContent);
    if (isCelsius) {
        temp = (temp * 9/5) + 32; // Convert to Fahrenheit
        temperature.textContent = temp.toFixed(1);
        toggleTempBtn.textContent = "°F/°C";
    } else {
        temp = (temp - 32) * 5/9; // Convert to Celsius
        temperature.textContent = temp.toFixed(1);
        toggleTempBtn.textContent = "°C/°F";
    }
    isCelsius = !isCelsius;
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    weatherDetails.classList.add('hidden');
}
