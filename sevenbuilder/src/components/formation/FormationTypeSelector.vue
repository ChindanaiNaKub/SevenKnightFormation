<template>
  <div class="formation-type-selector">
    <h2 class="selector-title">Formation Type</h2>
    <div class="formation-types-grid">
      <button
        v-for="config in formationTypes"
        :key="config.type"
        class="formation-type-card"
        :class="{ 'is-selected': selectedType === config.type }"
        @click="$emit('select', config.type)"
      >
        <!-- Formation Icon/Visual -->
        <div class="formation-icon">
          <div class="icon-visual" :data-type="config.type">
            <div class="position-indicators">
              <!-- Front positions (blue shields) -->
              <div class="front-row">
                <div
                  v-for="pos in config.frontPositions"
                  :key="`front-${pos}`"
                  class="position-dot front"
                ></div>
              </div>
              <!-- Back positions (red cones) -->
              <div class="back-row">
                <div
                  v-for="pos in config.backPositions"
                  :key="`back-${pos}`"
                  class="position-dot back"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Formation Info -->
        <div class="formation-info">
          <h3 class="formation-name">{{ config.name }}</h3>
          <div class="formation-level">Lv.{{ config.level }}</div>
          <div class="formation-composition">
            <span class="front-count">
              <span class="shield-icon">🛡</span>
              {{ config.frontPositions.length }} Front
            </span>
            <span class="back-count">
              <span class="cone-icon">🔺</span>
              {{ config.backPositions.length }} Back
            </span>
          </div>
        </div>

        <!-- Selected Indicator -->
        <div v-if="selectedType === config.type" class="selected-indicator">
          <span class="checkmark">✓</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FormationType } from '../../types';
import { formationConfigs } from '../../data/formationConfigs';

interface Props {
  selectedType: FormationType;
}

defineProps<Props>();

defineEmits<{
  select: [type: FormationType];
}>();

const formationTypes = computed(() => {
  return Object.values(formationConfigs);
});
</script>

<style scoped>
.formation-type-selector {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-lg);
}

.selector-title {
  font-size: var(--font-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-border);
}

.formation-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.formation-type-card {
  position: relative;
  background: var(--color-bg-tertiary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: center;
  text-align: center;
}

.formation-type-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.formation-type-card.is-selected {
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
  border-color: var(--color-primary-light);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
}

/* Formation Icon Visual */
.formation-icon {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-sm);
}

.icon-visual {
  width: 120px;
  height: 80px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.is-selected .icon-visual {
  background: rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 0 15px rgba(139, 92, 246, 0.3);
}

.position-indicators {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: var(--spacing-sm);
}

.front-row,
.back-row {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.position-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.position-dot.front {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  border: 2px solid #93c5fd;
}

.position-dot.back {
  background: linear-gradient(135deg, #f87171, #ef4444);
  border: 2px solid #fca5a5;
}

/* Formation Info */
.formation-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  width: 100%;
}

.formation-name {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--color-text-primary);
}

.formation-level {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--color-primary-light);
  background: rgba(139, 92, 246, 0.2);
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  display: inline-block;
  align-self: center;
}

.is-selected .formation-level {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.formation-composition {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs);
}

.front-count,
.back-count {
  display: flex;
  align-items: center;
  gap: 4px;
}

.shield-icon {
  font-size: 14px;
}

.cone-icon {
  font-size: 12px;
}

.is-selected .formation-composition {
  color: rgba(255, 255, 255, 0.9);
}

/* Selected Indicator */
.selected-indicator {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  width: 32px;
  height: 32px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.5);
}

.checkmark {
  font-size: 18px;
  font-weight: bold;
  color: white;
}

/* Animations */
@keyframes selectPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.formation-type-card.is-selected {
  animation: selectPulse 0.5s ease;
}

/* Responsive */
@media (max-width: 1024px) {
  .formation-types-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .formation-type-selector {
    padding: var(--spacing-md);
  }

  .selector-title {
    font-size: var(--font-xl);
  }

  .formation-types-grid {
    gap: var(--spacing-sm);
  }

  .formation-type-card {
    padding: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .formation-types-grid {
    grid-template-columns: 1fr;
  }

  .icon-visual {
    width: 100px;
    height: 70px;
  }

  .position-dot {
    width: 14px;
    height: 14px;
  }
}
</style>

