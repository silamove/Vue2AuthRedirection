<template>
  <div class="fetch-data">
    <h1>Weather Data</h1>
    <p>This component demonstrates fetching data from the server.</p>
    
    <div v-if="loading" class="loading">Loading...</div>
    
    <div v-else-if="error" class="error">
      Error loading data: {{ error }}
    </div>
    
    <div v-else class="weather-table">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature (C)</th>
            <th>Temperature (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="forecast in forecasts" :key="forecast.date">
            <td>{{ formatDate(forecast.date) }}</td>
            <td>{{ forecast.temperatureC }}</td>
            <td>{{ forecast.temperatureF }}</td>
            <td>{{ forecast.summary }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'FetchData',
  setup() {
    const loading = ref(true)
    const error = ref(null)
    const forecasts = ref([])

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/SampleData/WeatherForecasts')
        forecasts.value = response.data
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    onMounted(fetchData)

    return {
      loading,
      error,
      forecasts,
      formatDate
    }
  }
}
</script>

<style scoped>
.fetch-data {
  padding: 2rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
}

.weather-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
  margin-top: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ecf0f1;
}

th {
  background-color: #34495e;
  color: white;
  font-weight: bold;
}

tr:hover {
  background-color: #f8f9fa;
}
</style>
