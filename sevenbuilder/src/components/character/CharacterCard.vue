<template>
  <div 
    class="character-card" 
    :class="{ 
      'in-formation': isInFormation,
      'is-dragging': isDragging,
      'is-selected': isSelected
    }"
    @click="$emit('select')"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <div class="card-image">
      <img
        :src="character.image"
        :alt="character.name"
        @error="handleImageError"
      />
      <div class="class-badge">
        <img
          :src="getClassIcon(character.class)"
          :alt="character.class"
          class="class-badge-img"
          @error="handleClassIconError"
          @load="handleClassIconLoad"
        />
      </div>
      <div v-if="isInFormation" class="in-formation-badge" title="In Formation">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
    </div>
    
    <div class="card-info">
      <div class="card-header">
        <span class="character-name">{{ character.name }}</span>
        <div class="stars" :class="`stars-${getRarityClass(character.rarity)}`">
          <span v-for="n in getStarCount(character.maxStarRank)" :key="n" class="star">★</span>
        </div>
      </div>
      
      <div class="card-meta">
        <span class="level">Lv.{{ character.level }}</span>
        <span class="rarity" :class="`rarity-${getRarityClass(character.rarity)}`">
          {{ character.rarity }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Character } from '../../types';

interface Props {
  character: Character;
  isInFormation?: boolean;
  isSelected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isInFormation: false,
  isSelected: false,
});



const emit = defineEmits<{
  select: [];
  dragStart: [character: Character];
}>();

const isDragging = ref(false);

function getStarCount(starRank: string): number {
  return parseInt(starRank.replace('★', ''));
}

function getClassIcon(characterClass: string): string {
  return `/icons/class-${characterClass.toLowerCase()}.svg`;
}

function getRarityClass(rarity: string): string {
  return rarity.toLowerCase().replace(/\s+/g, '-');
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = '/placeholder-character.svg';
}

function handleClassIconError(event: Event) {
  const img = event.target as HTMLImageElement;
  const badge = img.closest('.class-badge') as HTMLElement;
  if (badge) {
    badge.style.display = 'none';
  }
}

function handleClassIconLoad(event: Event) {
  const img = event.target as HTMLImageElement;
  const badge = img.closest('.class-badge') as HTMLElement;
  if (badge) {
    badge.classList.add('show');
  }
}

function handleDragStart(event: DragEvent) {
  if (props.isInFormation) {
    event.preventDefault();
    return;
  }
  
  isDragging.value = true;
  emit('dragStart', props.character);
  
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify({
      item: props.character,
      type: 'character',
      source: 'roster',
    }));
    event.dataTransfer.effectAllowed = 'move';
    
    // Create custom drag image
    const dragImage = createDragImage();
    event.dataTransfer.setDragImage(dragImage, 50, 50);
  }
}

function handleDragEnd() {
  isDragging.value = false;
}

function createDragImage(): HTMLElement {
  const dragImage = document.createElement('div');
  dragImage.style.cssText = `
    position: absolute;
    top: -1000px;
    width: 100px;
    height: 120px;
    background: var(--color-bg-secondary, #1a1a2e);
    border: 2px solid var(--color-primary, #7c3aed);
    border-radius: 8px;
    padding: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;
  `;
  
  dragImage.innerHTML = `
    <img src="${props.character.image}" alt="${props.character.name}" style="width: 100%; height: 80px; object-fit: cover; border-radius: 4px;">
    <div style="text-align: center; font-size: 12px; color: white; margin-top: 4px; font-weight: 600;">
      ${props.character.name}
    </div>
  `;
  
  document.body.appendChild(dragImage);
  
  // Clean up after a short delay
  setTimeout(() => {
    if (dragImage.parentNode) {
      dragImage.parentNode.removeChild(dragImage);
    }
  }, 100);
  
  return dragImage;
}
</script>

<style scoped>
.character-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: 0.75rem 1rem;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(71, 85, 105, 0.4);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.character-card:hover {
  background: rgba(30, 41, 59, 0.7);
  border-color: rgba(71, 85, 105, 0.8);
}

.character-card:active {
  transform: scale(0.98);
}

/* In Formation State */
.character-card.in-formation {
  opacity: 0.6;
  border-color: var(--color-success);
}

.character-card.in-formation:hover {
  opacity: 0.8;
  border-color: var(--color-success);
}

/* Dragging State */
.character-card.is-dragging {
  opacity: 0.5;
  transform: scale(0.95);
  cursor: grabbing;
}

.character-card.in-formation {
  cursor: not-allowed;
}

.character-card.in-formation[draggable="true"] {
  cursor: not-allowed;
}

/* Selected state for click-to-place */
.character-card.is-selected {
  border-color: var(--color-success);
  background: rgba(34, 197, 94, 0.1);
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
  animation: pulse-selected 2s ease-in-out infinite;
}

@keyframes pulse-selected {
  0%, 100% {
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(34, 197, 94, 0.7);
  }
}

.card-image {
  position: relative;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  border-radius: var(--radius-md);
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(71, 85, 105, 0.3);
  position: relative;
  z-index: 1;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: high-quality;
}

.class-badge {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid var(--color-bg-secondary);
  z-index: 2;
  pointer-events: none;
  background: var(--color-bg-secondary);
  display: none; /* Hidden by default */
}

.class-badge.show {
  display: block;
}

.class-badge-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
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
  z-index: 2;
}

.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.375rem;
  min-width: 0;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

.character-name {
  font-size: var(--font-md);
  font-weight: 600;
  color: #f1f5f9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Star colors based on rarity */
.stars {
  display: flex;
  gap: 1px;
  font-size: 0.625rem;
  flex-shrink: 0;
}

.star {
  color: #fbbf24;
  transition: all var(--transition-fast);
}

/* Legendary SP - Gold/Orange */
.stars-legendary-sp .star {
  color: #fbbf24;
}

/* Legendary - Purple */
.stars-legendary .star {
  color: #a855f7;
}

/* Rare - Yellow/Gold */
.stars-rare .star {
  color: #fbbf24;
}

/* Uncommon - Green */
.stars-uncommon .star {
  color: #84cc16;
}

/* Common - Gray */
.stars-common .star {
  color: #6b7280;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-xs);
}

.level {
  color: #94a3b8;
  font-size: var(--font-xs);
  font-weight: 400;
}

.rarity {
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius-sm);
  font-weight: 500;
  font-size: 0.625rem;
  text-transform: capitalize;
}

.rarity-common {
  background: rgba(156, 163, 175, 0.15);
  color: #9ca3af;
}

.rarity-uncommon {
  background: rgba(132, 204, 22, 0.15);
  color: #84cc16;
}

.rarity-rare {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}

.rarity-legendary {
  background: rgba(168, 85, 247, 0.15);
  color: #a855f7;
}

.rarity-legendary-sp {
  background: rgba(251, 191, 36, 0.15);
  color: #fbbf24;
}
</style>

