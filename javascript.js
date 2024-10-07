document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    const apiKey = '128df2faf318320f0665a9a25de23aab';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const weather = data.weather[0].main.toLowerCase();
            updateBackgroundVideo(weather);
            displayWeatherInfo(data);
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
    
});

function updateBackgroundVideo(weather) {
    const video = document.getElementById('weatherVideo');
    let videoSource;

    switch (weather) {
        case 'clear':
            videoSource = '/videos/clearsky.mp4';
            break;
        case 'clouds':
            videoSource = '/videos/cloudy.mp4';
            break;
        case 'rain':
            videoSource = '/videos/rain.mp4';
            break;
        case 'snow':
            videoSource = '/videos/snow.mp4';
            break;
        case 'thunderstorm':
            videoSource = '/videos/rainstorm.mp4'
            break;
        default:
            videoSource = '/videos/default.mp4'
            break;
        
    }

    video.src = videoSource;
    video.load();

}

function displayWeatherInfo(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <p>Temperature: ${data.main.temp} &deg;C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}