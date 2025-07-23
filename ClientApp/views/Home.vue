<template>
  <div class="home">
    <h1>Welcome to MyWebApp</h1>
    <p>This is a modern .NET 8 and Vue 3 application with secure authentication.</p>
    
    <div class="features">
      <div class="feature-card">
        <h3>🔐 Secure Authentication</h3>
        <p>Cookie-based authentication with HTTP-only cookies for security.</p>
      </div>
      
      <div class="feature-card">
        <h3>🛡️ Protected Routes</h3>
        <p>Automatic redirection to login for protected pages.</p>
      </div>
      
      <div class="feature-card">
        <h3>⚡ Modern Stack</h3>
        <p>.NET 8 backend with Vue 3 frontend using Composition API.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.feature-card h3 {
  color: #34495e;
  margin-bottom: 1rem;
}
</style>
