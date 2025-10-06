<template>
  <div class="character-card" @click="$emit('select')">
    <div class="card-image">
      <img
        :src="character.image"
        :alt="character.name"
        @error="handleImageError"
      />
      <img
        :src="getClassIcon(character.class)"
        :alt="character.class"
        class="class-badge"
      />
    </div>
    
    <div class="card-info">
      <div class="card-header">
        <span class="character-name">{{ character.name }}</span>
        <div class="stars">
          <span v-for="n in getStarCount(character.maxStarRank)" :key="n" class="star">★</span>
        </div>
      </div>
      
      <div class="card-meta">
        <span class="level">Lv.{{ character.level }}</span>
        <span class="rarity" :class="`rarity-${character.rarity.toLowerCase().replace(/\s+/g, '-')}`">
          {{ character.rarity }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '../../types';

interface Props {
  character: Character;
}

defineProps<Props>();

defineEmits<{
  select: [];
}>();

function getStarCount(starRank: string): number {
  return parseInt(starRank.replace('★', ''));
}

function getClassIcon(characterClass: string): string {
  return `/icons/class-${characterClass.toLowerCase()}.svg`;
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = '/placeholder-character.svg';
}
</script>

<style scoped>
.character-card {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.character-card:hover {
  border-color: var(--color-primary);
  background: var(--color-bg-tertiary);
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
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

.class-badge {
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--color-bg-secondary);
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

.character-name {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stars {
  display: flex;
  gap: 1px;
  font-size: 0.625rem;
  flex-shrink: 0;
}

.star {
  color: var(--color-rarity-5);
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

.rarity-legendary-sp {
  background: linear-gradient(135deg, rgba(234, 179, 8, 0.3), rgba(249, 115, 22, 0.3));
  color: #f97316;
}
</style>

