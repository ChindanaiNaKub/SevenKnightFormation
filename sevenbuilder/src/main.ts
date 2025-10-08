import { createApp } from 'vue'
import './styles/global.css'
import App from './App.vue'

const app = createApp(App)

// Global error handler for production
app.config.errorHandler = (err, _instance, info) => {
  // In production, you might want to send this to an error tracking service
  if (import.meta.env.PROD) {
    // Error tracking service integration could go here
    // e.g., Sentry.captureException(err)
  } else {
    console.error('Global error:', err, info)
  }
}

// Warn handler for development
app.config.warnHandler = (msg, _instance, trace) => {
  if (!import.meta.env.PROD) {
    console.warn('Warning:', msg, trace)
  }
}

app.mount('#app')
