<template>
  <div class="weather-app">
    <div class="container">
      <header class="header">
        <h1><i class="fas fa-sun"></i> My Weather App</h1>
        <p>Check the weather in your city!</p>
      </header>

      <div class="search-box">
        <input
          v-model="city"
          @keyup.enter="fetchWeather"
          placeholder="Type city name here..."
          class="search-input"
        />
        <button @click="fetchWeather" class="search-btn" :disabled="loading">
          <i class="fas fa-search"></i>
          {{ loading ? 'Loading...' : 'Search' }}
        </button>
      </div>

      <div class="location-section">
        <button @click="getCurrentLocation" class="location-btn" :disabled="loading">
          <i class="fas fa-map-marker-alt"></i> Use My Location
        </button>
      </div>

      <div v-if="error" class="error-box">
        <i class="fas fa-exclamation-triangle"></i>
        {{ error }}
      </div>

      <div v-if="loading" class="loading-box">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Getting weather data...</p>
      </div>

      <div class="weather-display" v-if="weatherData && !loading">
        <div class="city-name">
          <i class="fas fa-map-marker-alt"></i>
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </div>
        
        <div class="main-weather">
          <div class="temperature-box">
            <div class="big-temp">{{ Math.round(weatherData.main.temp - 273.15) }}°C</div>
            <img 
              class="weather-img"
              :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
              :alt="weatherData.weather[0].description"
            />
          </div>
          
          <div class="weather-desc">
            <i class="fas fa-cloud"></i>
            {{ weatherData.weather[0].description }}
          </div>
          <div class="feels-like">
            <i class="fas fa-thermometer-half"></i>
            Feels like {{ Math.round(weatherData.main.feels_like - 273.15) }}°C
          </div>
        </div>
        
        <div class="weather-info">
          <div class="info-box">
            <i class="fas fa-tint"></i>
            <div class="info-title">Humidity</div>
            <div class="info-value">{{ weatherData.main.humidity }}%</div>
          </div>
          
          <div class="info-box">
            <i class="fas fa-wind"></i>
            <div class="info-title">Wind</div>
            <div class="info-value">{{ weatherData.wind.speed }} m/s</div>
          </div>
          
          <div class="info-box">
            <i class="fas fa-compress-arrows-alt"></i>
            <div class="info-title">Pressure</div>
            <div class="info-value">{{ weatherData.main.pressure }} hPa</div>
          </div>
          
          <div class="info-box">
            <i class="fas fa-eye"></i>
            <div class="info-title">Visibility</div>
            <div class="info-value">{{ (weatherData.visibility / 1000).toFixed(1) }} km</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WeatherApp',
  data() {
    return {
      city: '',
      weatherData: null,
      loading: false,
      error: null
    };
  },
  methods: {
    async fetchWeather() {
      if (!this.city.trim()) {
        this.error = 'Please enter a city name';
        return;
      }

      this.loading = true;
      this.error = null;

      const apiKey = 'd4af491c8c861fa065869be6ece4a6a2';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}`;
      
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
        this.city = '';
      } catch (error) {
        console.error('Error fetching weather data:', error);
        this.error = 'City not found. Please check the spelling and try again.';
        this.weatherData = null;
      } finally {
        this.loading = false;
      }
    },

    async fetchWeatherByCoords(lat, lon) {
      this.loading = true;
      this.error = null;

      const apiKey = 'd4af491c8c861fa065869be6ece4a6a2';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        this.error = 'Failed to get weather for your location.';
        this.weatherData = null;
      } finally {
        this.loading = false;
      }
    },

    getCurrentLocation() {
      if (!navigator.geolocation) {
        this.error = 'Geolocation is not supported by this browser.';
        return;
      }

      this.loading = true;
      this.error = null;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          this.loading = false;
          this.error = 'Unable to retrieve your location. Please search for a city manually.';
        }
      );
    }
  },

  mounted() {
    this.city = 'London';
    this.fetchWeather();
  }
};
</script>

<style scoped>
.weather-app {
  background: lightblue;
  min-height: 100vh;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #333;
  font-size: 2.5em;
  margin-bottom: 10px;
}

.header p {
  color: #666;
  font-size: 1.1em;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.search-input {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.search-input:focus {
  border-color: #007bff;
}

.search-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.search-btn:hover:not(:disabled) {
  background: #0056b3;
}

.search-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.location-section {
  text-align: center;
  margin-bottom: 20px;
}

.location-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.location-btn:hover:not(:disabled) {
  background: #1e7e34;
}

.location-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error-box {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
}

.loading-box {
  text-align: center;
  padding: 30px;
  color: #666;
}

.loading-box i {
  font-size: 2em;
  margin-bottom: 10px;
}

.weather-display {
  background: white;
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.city-name {
  text-align: center;
  font-size: 1.3em;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

.main-weather {
  text-align: center;
  margin-bottom: 25px;
}

.temperature-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.big-temp {
  font-size: 3.5em;
  font-weight: bold;
  color: #333;
  margin-right: 20px;
}

.weather-img {
  width: 80px;
  height: 80px;
}

.weather-desc {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 8px;
  text-transform: capitalize;
}

.feels-like {
  color: #888;
  font-size: 1em;
}

.weather-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.info-box {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
}

.info-box i {
  font-size: 1.5em;
  color: #007bff;
  margin-bottom: 8px;
}

.info-title {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 5px;
}

.info-value {
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
}

@media (max-width: 600px) {
  .search-box {
    flex-direction: column;
  }
  
  .temperature-box {
    flex-direction: column;
  }
  
  .big-temp {
    margin-right: 0;
    margin-bottom: 10px;
  }
  
  .weather-info {
    grid-template-columns: 1fr;
  }
}
</style>