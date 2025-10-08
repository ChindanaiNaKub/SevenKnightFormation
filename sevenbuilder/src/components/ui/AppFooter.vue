<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p class="footer-text">
        Built with <span class="heart">❤️</span> by 
        <a 
          href="https://github.com/ChindanaiNaKub/SevenKnightFormation" 
          target="_blank" 
          rel="noopener noreferrer"
          class="github-link"
        >
          ChindanaiNaKub
        </a>
      </p>
      <p class="credits-text">
        Character & pet data sourced from 
        <a 
          href="https://gamewith.net/sevenknights-rebirth/" 
          target="_blank" 
          rel="noopener noreferrer"
          class="credit-link"
        >
          GameWith
        </a>
        <span class="separator">•</span>
        Seven Knights Rebirth © Netmarble
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-footer {
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-md) var(--spacing-xl);
  margin-top: auto;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
}

.footer-text {
  color: var(--color-text-secondary);
  font-size: var(--font-sm);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.heart {
  color: #ff6b6b;
  animation: heartbeat 1.5s ease-in-out infinite;
  display: inline-block;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  10%, 30% {
    transform: scale(1.1);
  }
  20% {
    transform: scale(0.95);
  }
}

.github-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  position: relative;
}

.github-link:hover {
  color: var(--color-primary-hover);
}

.github-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: width 0.2s ease;
}

.github-link:hover::after {
  width: 100%;
}

.credits-text {
  color: var(--color-text-tertiary);
  font-size: var(--font-xs);
  margin: var(--spacing-xs) 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  flex-wrap: wrap;
  opacity: 0.8;
}

.credit-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.credit-link:hover {
  color: var(--color-primary);
}

.separator {
  color: var(--color-text-tertiary);
  padding: 0 0.25rem;
}

@media (max-width: 768px) {
  .app-footer {
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .footer-text {
    font-size: var(--font-xs);
  }

  .credits-text {
    font-size: 0.7rem;
  }
}
</style>
