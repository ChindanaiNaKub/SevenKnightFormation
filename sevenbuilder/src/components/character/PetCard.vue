<template>
  <div class="pet-card" @click="$emit('select')">
    <div class="card-image">
      <img
        :src="pet.image"
        :alt="pet.name"
        @error="handleImageError"
      />
    </div>
    
    <div class="card-info">
      <div class="card-header">
        <span class="pet-name">{{ pet.name }}</span>
        <span class="pet-badge">🐾</span>
      </div>
      
      <div class="card-meta">
        <span class="level">Lv.{{ pet.level }}</span>
        <span class="rarity" :class="`rarity-${pet.rarity.toLowerCase()}`">
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
}

defineProps<Props>();

defineEmits<{
  select: [];
}>();

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
}

.pet-card:hover {
  border-color: var(--color-secondary-light);
  background: var(--color-bg-tertiary);
  transform: translateX(4px);
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.2);
}

.card-image {
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

