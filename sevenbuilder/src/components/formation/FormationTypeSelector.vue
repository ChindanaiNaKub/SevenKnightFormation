<template>
  <div class="formation-type-selector" :class="{ collapsed: isCollapsed }">
    <!-- Collapsed Header (shown when collapsed) -->
    <div v-if="isCollapsed" class="collapsed-header" @click="isCollapsed = false">
      <div class="collapsed-content">
        <div class="collapsed-icon">
          <div class="icon-visual-small">
            <div class="position-indicators-small">
              <div class="front-row-small">
                <div
                  v-for="pos in selectedConfig.frontPositions"
                  :key="`front-${pos}`"
                  class="position-dot-small front"
                ></div>
              </div>
              <div class="back-row-small">
                <div
                  v-for="pos in selectedConfig.backPositions"
                  :key="`back-${pos}`"
                  class="position-dot-small back"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="collapsed-info">
          <span class="collapsed-label">Formation:</span>
          <span class="collapsed-name">{{ selectedConfig.name }}</span>
          <span class="collapsed-stats">
            🛡 {{ selectedConfig.frontPositions.length }} / 🔺 {{ selectedConfig.backPositions.length }}
          </span>
        </div>
      </div>
      <button class="expand-btn" title="Change Formation">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
    </div>

    <!-- Full Selector (shown when expanded) -->
    <template v-else>
      <div class="selector-header">
        <h2 class="selector-title">Formation Type</h2>
        <button 
          v-if="hasSelection" 
          class="collapse-btn" 
          @click="isCollapsed = true"
          title="Collapse"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 15l7-7 7 7"/>
          </svg>
        </button>
      </div>
      <div class="formation-types-grid">
        <button
          v-for="config in formationTypes"
          :key="config.type"
          class="formation-type-card"
          :class="{ 'is-selected': selectedType === config.type }"
          @click="handleSelect(config.type)"
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
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { FormationType } from '../../types';
import { formationConfigs } from '../../data/formationConfigs';

interface Props {
  selectedType: FormationType;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  select: [type: FormationType];
}>();

const isCollapsed = ref(false);

const formationTypes = computed(() => {
  return Object.values(formationConfigs);
});

const selectedConfig = computed(() => {
  return formationConfigs[props.selectedType];
});

const hasSelection = computed(() => {
  return props.selectedType !== undefined && props.selectedType !== null;
});

const handleSelect = (type: FormationType) => {
  emit('select', type);
  // Auto-collapse after selection
  setTimeout(() => {
    isCollapsed.value = true;
  }, 600); // Wait for the selection animation to complete
};

// Watch for selection changes to auto-collapse
watch(() => props.selectedType, (newType) => {
  if (newType && !isCollapsed.value) {
    // Auto-collapse when a type is selected (with delay for animation)
    setTimeout(() => {
      isCollapsed.value = true;
    }, 600);
  }
});
</script>

<style scoped>
.formation-type-selector {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s ease;
}

.formation-type-selector.collapsed {
  padding: 0;
}

/* Collapsed State */
.collapsed-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: var(--radius-xl);
}

.collapsed-header:hover {
  background: rgba(139, 92, 246, 0.1);
}

.collapsed-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex: 1;
}

.collapsed-icon {
  flex-shrink: 0;
}

.icon-visual-small {
  width: 60px;
  height: 40px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-primary);
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
}

.position-indicators-small {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px;
}

.front-row-small,
.back-row-small {
  display: flex;
  gap: 4px;
  justify-content: center;
}

.position-dot-small {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.position-dot-small.front {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  border: 1px solid #93c5fd;
}

.position-dot-small.back {
  background: linear-gradient(135deg, #f87171, #ef4444);
  border: 1px solid #fca5a5;
}

.collapsed-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.collapsed-label {
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
}

.collapsed-name {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--color-primary-light);
}

.collapsed-stats {
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
  background: rgba(139, 92, 246, 0.1);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
}

.expand-btn {
  background: var(--color-primary);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  color: white;
}

.expand-btn:hover {
  background: var(--color-primary-light);
  transform: scale(1.1);
}

/* Expanded State Header */
.selector-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-border);
}

.selector-title {
  font-size: var(--font-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.collapse-btn {
  background: var(--color-bg-tertiary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--color-text-secondary);
}

.collapse-btn:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
  transform: translateY(-2px);
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

  .formation-type-selector.collapsed {
    padding: 0;
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

  .collapsed-header {
    padding: var(--spacing-sm) var(--spacing-md);
  }

  .collapsed-name {
    font-size: var(--font-md);
  }

  .collapsed-info {
    gap: var(--spacing-xs);
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

  .collapsed-header {
    padding: var(--spacing-sm);
  }

  .collapsed-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .collapsed-label {
    font-size: var(--font-xs);
  }

  .collapsed-name {
    font-size: var(--font-sm);
  }

  .collapsed-stats {
    font-size: var(--font-xs);
    padding: 2px 8px;
  }

  .icon-visual-small {
    width: 50px;
    height: 35px;
  }

  .position-dot-small {
    width: 6px;
    height: 6px;
  }

  .expand-btn {
    width: 32px;
    height: 32px;
  }
}
</style>

