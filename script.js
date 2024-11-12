$(document).ready(function() {

    const fetchWeather = (city) => {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=temperature_2m,weathercode&timezone=Asia/Tokyo`;
        

        
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(data) {
                const temperature = data.hourly.temperature_2m[0]; // Get current temperature
                const weatherCode = data.hourly.weathercode[0]; // Get current weather code
                
                $('#cityName').text(city);
                $('#temperature').text(`Temperature: ${temperature} °C`);
                $('#description').text(getWeatherDescription(weatherCode));
                $('#weatherIcon').attr('src', getWeatherIcon(weatherCode));
                $('#weatherInfo').removeClass('hidden');
            },
            error: function() {
                alert('City not found or invalid data. Please enter a valid city name.');
            }
        });
    };


    const getWeatherDescription = (code) => {
        switch(code) {
            case 0: return "Clear sky";
            case 1: return "Mainly clear";
            case 2: return "Partly cloudy";
            case 3: return "Overcast";
            case 45: case 48: return "Fog";
            case 61: return "Rain showers";
            case 80: return "Rain showers";
            // Add more codes and descriptions as needed
            default: return "Unknown weather condition";
        }
    };

    const getWeatherIcon = (code) => {
        // Example icon URLs; you can customize these
        switch(code) {
            case 0: return "https://openweathermap.org/img/wn/01d.png"; // Clear sky icon
            case 1: return "https://openweathermap.org/img/wn/02d.png"; // Mainly clear icon
            case 3: return "https://openweathermap.org/img/wn/03d.png"; // Overcast icon
            // Add more icons as needed
            default: return ""; // No icon for unknown conditions
        }
    };

    $('#getWeather').on('click', function() {
        const city = $('#cityInput').val().trim();
        if (city) {
            fetchWeather(city);
        }
    });


    $('#refreshWeather').on('click', function() {
        const city = $('#cityInput').val().trim();
        if (city) {
            fetchWeather(city);
        }
    });
});
