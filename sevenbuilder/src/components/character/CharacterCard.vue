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
      <img
        :src="getClassIcon(character.class)"
        :alt="character.class"
        class="class-badge"
      />
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
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
}

.character-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity var(--transition-normal);
  pointer-events: none;
}

.character-card:hover {
  border-color: var(--color-primary);
  background: var(--color-bg-tertiary);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
}

.character-card:hover::before {
  opacity: 1;
}

.character-card:active {
  transform: translateX(2px) scale(0.98);
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

.character-name {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--color-text-primary);
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
  color: var(--color-rarity-5);
  transition: all var(--transition-fast);
}

/* Legendary SP - Gold/Orange glow */
.stars-legendary-sp .star {
  color: #fbbf24;
  filter: drop-shadow(0 0 3px rgba(251, 191, 36, 0.8));
  animation: pulse-gold 2s ease-in-out infinite;
}

/* Legendary - Purple glow */
.stars-legendary .star {
  color: #a855f7;
  filter: drop-shadow(0 0 2px rgba(168, 85, 247, 0.6));
}

/* Rare - Blue glow */
.stars-rare .star {
  color: #3b82f6;
  filter: drop-shadow(0 0 1px rgba(59, 130, 246, 0.5));
}

/* Uncommon - Green */
.stars-uncommon .star {
  color: #84cc16;
}

/* Common - Gray */
.stars-common .star {
  color: #9ca3af;
}

@keyframes pulse-gold {
  0%, 100% {
    filter: drop-shadow(0 0 3px rgba(251, 191, 36, 0.8));
  }
  50% {
    filter: drop-shadow(0 0 5px rgba(251, 191, 36, 1));
  }
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

.rarity-legendary-sp {
  background: linear-gradient(135deg, rgba(234, 179, 8, 0.3), rgba(249, 115, 22, 0.3));
  color: #f97316;
  box-shadow: 0 0 10px rgba(251, 191, 36, 0.4);
  animation: pulse-gold 2s ease-in-out infinite;
}
</style>

