<template>
  <div class="counter">
    <h1>Counter</h1>
    <p>This is a simple counter demonstration.</p>
    
    <div class="counter-display">
      <h2>Current count: {{ count }}</h2>
      <div class="counter-buttons">
        <button @click="increment" class="btn btn-primary">+</button>
        <button @click="decrement" class="btn btn-secondary">-</button>
        <button @click="reset" class="btn btn-outline">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Counter',
  setup() {
    const count = ref(0)

    const increment = () => {
      count.value++
    }

    const decrement = () => {
      count.value--
    }

    const reset = () => {
      count.value = 0
    }

    return {
      count,
      increment,
      decrement,
      reset
    }
  }
}
</script>

<style scoped>
.counter {
  text-align: center;
  padding: 2rem;
}

.counter-display {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-top: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.counter-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

.btn-outline {
  background-color: transparent;
  color: #3498db;
  border: 2px solid #3498db;
}

.btn-outline:hover {
  background-color: #3498db;
  color: white;
}
</style>
