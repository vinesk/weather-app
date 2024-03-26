import './index.css'

document.getElementById('search-btn').addEventListener('click', function () {
  const city = document.getElementById('search-input').value.trim()
  fetchWeatherData(city)
})

async function fetchWeatherData(city) {
  const apiKey = '83f3df5664574d36931184246242503'
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=fr`
  try {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    displayWeatherData(data)
  } catch (error) {
    console.error('Erreur lors de la récupération des données météo:', error)
  }
}

function displayWeatherData(data) {
  const weatherElement = document.getElementById('weather-result')
  if (data.error) {
    weatherElement.innerHTML = `<p>${data.error.message}</p>`
  } else {
    weatherElement.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <img src="https:${data.current.condition.icon}" alt="Weather Icon" />
      <p>Température: ${data.current.temp_c}°C / ${data.current.temp_f} °F</p>
      <p>Condition: ${data.current.condition.text}</p>
      <p>Humidité: ${data.current.humidity}%</p>`
  }
}
