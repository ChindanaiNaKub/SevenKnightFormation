<template>
  <div 
    class="pet-card" 
    :class="{ 'in-formation': isInFormation }"
    @click="$emit('select')"
  >
    <div class="card-image">
      <img
        :src="pet.image"
        :alt="pet.name"
        @error="handleImageError"
      />
      <div v-if="isInFormation" class="in-formation-badge" title="In Formation">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
    </div>
    
    <div class="card-info">
      <div class="card-header">
        <span class="pet-name">{{ pet.name }}</span>
        <span class="pet-badge">🐾</span>
      </div>
      
      <div class="card-meta">
        <span class="level">Lv.{{ pet.level }}</span>
        <span class="rarity" :class="`rarity-${getRarityClass(pet.rarity)}`">
          {{ pet.rarity }}
        </span>
      </div>
      
      <div class="card-skill">
        <span class="skill-text">{{ pet.passiveSkill }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pet } from '../../types';

interface Props {
  pet: Pet;
  isInFormation?: boolean;
}

withDefaults(defineProps<Props>(), {
  isInFormation: false,
});

defineEmits<{
  select: [];
}>();

function getRarityClass(rarity: string): string {
  return rarity.toLowerCase().replace(/\s+/g, '-');
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = '/placeholder-pet.svg';
}
</script>

<style scoped>
.pet-card {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
}

.pet-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity var(--transition-normal);
  pointer-events: none;
}

.pet-card:hover {
  border-color: var(--color-secondary-light);
  background: var(--color-bg-tertiary);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
}

.pet-card:hover::before {
  opacity: 1;
}

.pet-card:active {
  transform: translateX(2px) scale(0.98);
}

/* In Formation State */
.pet-card.in-formation {
  opacity: 0.6;
  border-color: var(--color-success);
}

.pet-card.in-formation:hover {
  opacity: 0.8;
  border-color: var(--color-success);
}

.card-image {
  position: relative;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-sm);
  background: var(--color-bg-tertiary);
}

.in-formation-badge {
  position: absolute;
  top: -4px;
  left: -4px;
  width: 20px;
  height: 20px;
  background: var(--color-success);
  border-radius: 50%;
  border: 2px solid var(--color-bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 1;
}

.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  min-width: 0;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xs);
}

.pet-name {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pet-badge {
  font-size: var(--font-sm);
  flex-shrink: 0;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-xs);
}

.level {
  color: var(--color-text-secondary);
}

.rarity {
  padding: 0.125rem var(--spacing-xs);
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.625rem;
}

.rarity-common {
  background: rgba(156, 163, 175, 0.2);
  color: #9ca3af;
}

.rarity-uncommon {
  background: rgba(132, 204, 22, 0.2);
  color: #84cc16;
}

.rarity-rare {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.rarity-legendary {
  background: rgba(168, 85, 247, 0.2);
  color: #a855f7;
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.3);
}

.card-skill {
  margin-top: 0.125rem;
}

.skill-text {
  font-size: 0.625rem;
  color: var(--color-secondary-light);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

