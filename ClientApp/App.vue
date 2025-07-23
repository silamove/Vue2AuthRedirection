<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-logo">MyWebApp</router-link>
        <div class="nav-menu">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/counter" class="nav-link">Counter</router-link>
          <router-link to="/fetchdata" class="nav-link">Fetch Data</router-link>
          <template v-if="isAuthenticated">
            <router-link to="/order/edit/123" class="nav-link">Order Edit</router-link>
            <button @click="logout" class="nav-link logout-btn">Logout</button>
          </template>
          <router-link v-else to="/login" class="nav-link">Login</router-link>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'App',
  setup() {
    const isAuthenticated = ref(false)
    const router = useRouter()

    const checkAuth = async () => {
      try {
        await axios.get('/account/me')
        isAuthenticated.value = true
      } catch {
        isAuthenticated.value = false
      }
    }

    const logout = async () => {
      try {
        await axios.post('/account/logout')
        isAuthenticated.value = false
        router.push('/login')
      } catch (error) {
        console.error('Logout failed:', error)
      }
    }

    onMounted(checkAuth)

    return {
      isAuthenticated,
      logout
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.navbar {
  background-color: #2c3e50;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.nav-logo {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-menu {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #34495e;
}

.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
}

.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>
