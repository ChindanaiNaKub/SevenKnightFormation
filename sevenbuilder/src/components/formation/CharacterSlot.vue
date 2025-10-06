<template>
  <div
    :class="[
      'character-slot',
      `position-${positionType}`,
      { 'is-empty': !character, 'is-filled': character }
    ]"
  >
    <!-- Position Number -->
    <div class="position-number">{{ position }}</div>

    <!-- Position Type Indicator -->
    <div class="position-indicator">
      <span v-if="positionType === 'front'" class="indicator-icon">🛡️</span>
      <span v-else class="indicator-icon">📍</span>
    </div>

    <!-- Empty State -->
    <div v-if="!character" class="slot-empty">
      <img
        src="/placeholder-character.svg"
        alt="Empty slot"
        class="placeholder-image"
      />
      <span class="empty-text">Empty</span>
    </div>

    <!-- Filled State -->
    <div v-else class="slot-filled">
      <img
        :src="character.image"
        :alt="character.name"
        class="character-image"
        @error="handleImageError"
      />
      
      <div class="character-info">
        <div class="character-header">
          <span class="character-name">{{ character.name }}</span>
          <button
            class="remove-button"
            @click="$emit('remove')"
            title="Remove character"
          >
            <img src="/icons/icon-remove.svg" alt="Remove" />
          </button>
        </div>
        
        <div class="character-stats">
          <span class="level">Lv.{{ character.level }}</span>
          <span v-if="character.enhancementLevel" class="enhancement">
            +{{ character.enhancementLevel }}
          </span>
        </div>
        
        <div class="character-meta">
          <div class="stars">
            <span v-for="n in getStarCount(character.maxStarRank)" :key="n" class="star">★</span>
          </div>
          <img
            :src="getClassIcon(character.class)"
            :alt="character.class"
            class="class-icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character, CharacterPosition, PositionType } from '../../types';

interface Props {
  position: CharacterPosition;
  positionType: PositionType;
  character: Character | null;
}

defineProps<Props>();

defineEmits<{
  remove: [];
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
.character-slot {
  position: relative;
  width: 140px;
  height: 180px;
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
}

.character-slot:hover {
  border-color: var(--color-border-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.position-front {
  border-color: var(--color-front);
}

.position-back {
  border-color: var(--color-back);
}

.position-number {
  position: absolute;
  top: var(--spacing-xs);
  left: var(--spacing-xs);
  width: 1.5rem;
  height: 1.5rem;
  background: var(--color-bg-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  z-index: 2;
}

.position-indicator {
  position: absolute;
  top: var(--spacing-xs);
  right: var(--spacing-xs);
  font-size: 1rem;
  z-index: 2;
}

/* Empty State */
.slot-empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  opacity: 0.5;
}

.placeholder-image {
  width: 60px;
  height: 60px;
  opacity: 0.3;
}

.empty-text {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
}

/* Filled State */
.slot-filled {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.character-image {
  width: 100%;
  height: 110px;
  object-fit: cover;
  background: var(--color-bg-tertiary);
}

.character-info {
  flex: 1;
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.character-header {
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
  flex: 1;
}

.remove-button {
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  background: var(--color-error);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all var(--transition-fast);
}

.slot-filled:hover .remove-button {
  opacity: 1;
}

.remove-button img {
  width: 0.75rem;
  height: 0.75rem;
  filter: brightness(0) invert(1);
}

.remove-button:hover {
  transform: scale(1.1);
}

.character-stats {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-xs);
}

.level {
  color: var(--color-text-secondary);
}

.enhancement {
  color: var(--color-warning);
  font-weight: 700;
}

.character-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.stars {
  display: flex;
  gap: 1px;
  font-size: var(--font-xs);
}

.star {
  color: var(--color-rarity-5);
}

.class-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Responsive */
@media (max-width: 768px) {
  .character-slot {
    width: 120px;
    height: 160px;
  }

  .character-image {
    height: 95px;
  }
}

@media (max-width: 480px) {
  .character-slot {
    width: 100px;
    height: 140px;
  }

  .character-image {
    height: 80px;
  }

  .character-name {
    font-size: var(--font-xs);
  }
}
</style>

