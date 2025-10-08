<template>
  <div
    :class="[
      'character-slot',
      `position-${positionType}`,
      { 
        'is-empty': !character, 
        'is-filled': character,
        'is-drag-over': isDragOver,
        'is-invalid-drop': isInvalidDrop,
        'is-selectable': isSelecting && isValidTarget,
        'is-selecting': isSelecting
      }
    ]"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    @dragenter="handleDragEnter"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Position Number -->
    <div class="position-number">{{ position }}</div>

    <!-- Position Type Indicator -->
    <div class="position-indicator">
      <img 
        v-if="positionType === 'front'" 
        src="/icons/position-front.svg" 
        alt="Front Position" 
        class="indicator-icon"
      />
      <img 
        v-else 
        src="/icons/position-back.svg" 
        alt="Back Position" 
        class="indicator-icon"
      />
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
        draggable="true"
        @dragstart="handleDragStart"
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
import { ref } from 'vue';
import type { Character, CharacterPosition, PositionType } from '../../types';

interface Props {
  position: CharacterPosition;
  positionType: PositionType;
  character: Character | null;
  isSelecting?: boolean;
  isValidTarget?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  remove: [];
  dragStart: [character: Character, position: CharacterPosition];
  drop: [data: { item: Character; type: 'character' | 'pet'; source: string; target: string }];
  click: [position: CharacterPosition];
  mouseEnter: [position: CharacterPosition];
  mouseLeave: [];
}>();

const isDragOver = ref(false);
const isInvalidDrop = ref(false);

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

function handleDragStart(event: DragEvent) {
  if (!props.character) return;
  
  emit('dragStart', props.character, props.position);
  
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify({
      item: props.character,
      type: 'character',
      source: `slot-${props.position}`,
    }));
    event.dataTransfer.effectAllowed = 'move';
  }
}

function handleDragEnter(event: DragEvent) {
  event.preventDefault();
  isDragOver.value = true;
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
  
  if (!event.dataTransfer) return;
  
  // Check if this is a valid drop target for the current drag
  const data = event.dataTransfer.getData('application/json');
  if (data) {
    try {
      const dragData = JSON.parse(data);
      if (dragData.type === 'character') {
        event.dataTransfer.dropEffect = 'move';
        isInvalidDrop.value = false;
      } else {
        event.dataTransfer.dropEffect = 'none';
        isInvalidDrop.value = true;
      }
    } catch {
      event.dataTransfer.dropEffect = 'none';
      isInvalidDrop.value = true;
    }
  }
}

function handleDragLeave(event: DragEvent) {
  // Only clear if we're leaving the element entirely
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const x = event.clientX;
  const y = event.clientY;
  
  if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
    isDragOver.value = false;
    isInvalidDrop.value = false;
  }
}

function handleDrop(event: DragEvent) {
  event.preventDefault();
  isDragOver.value = false;
  isInvalidDrop.value = false;
  
  if (!event.dataTransfer) return;
  
  const data = event.dataTransfer.getData('application/json');
  if (data) {
    try {
      const dragData = JSON.parse(data);
      if (dragData.type === 'character') {
        emit('drop', {
          item: dragData.item,
          type: dragData.type,
          source: dragData.source,
          target: `slot-${props.position}`,
        });
      }
    } catch {
      // Invalid data, ignore
    }
  }
}

function handleClick() {
  emit('click', props.position);
}

function handleMouseEnter() {
  emit('mouseEnter', props.position);
}

function handleMouseLeave() {
  emit('mouseLeave');
}
</script>

<style scoped>
.character-slot {
  position: relative;
  width: 150px;
  height: 190px;
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
}

.character-slot:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.character-slot.is-drag-over {
  border-color: var(--color-primary);
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.6);
  transform: scale(1.05);
  z-index: 10;
}

.character-slot.is-invalid-drop {
  border-color: var(--color-error);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.6);
  background: rgba(239, 68, 68, 0.1);
}

/* Click-to-place states */
.character-slot.is-selecting {
  cursor: pointer;
}

.character-slot.is-selectable {
  border-color: var(--color-success);
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
  background: rgba(34, 197, 94, 0.05);
  animation: pulse-select 2s ease-in-out infinite;
}

.character-slot.is-selectable:hover {
  border-color: var(--color-success);
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.6);
  background: rgba(34, 197, 94, 0.1);
  transform: scale(1.02);
}

@keyframes pulse-select {
  0%, 100% {
    box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
  }
  50% {
    box-shadow: 0 0 25px rgba(34, 197, 94, 0.7);
  }
}

.position-front {
  border-color: var(--color-front);
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
}

.position-front:hover {
  border-color: var(--color-front);
  box-shadow: 0 0 16px rgba(59, 130, 246, 0.5);
}

.position-front.is-filled {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, var(--color-bg-secondary) 100%);
}

.position-back {
  border-color: var(--color-back);
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.3);
}

.position-back:hover {
  border-color: var(--color-back);
  box-shadow: 0 0 16px rgba(239, 68, 68, 0.5);
}

.position-back.is-filled {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, var(--color-bg-secondary) 100%);
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
  z-index: 2;
}

.indicator-icon {
  width: 1.5rem;
  height: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
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
  opacity: 0.4;
  transition: opacity var(--transition-normal);
}

.character-slot:hover .slot-empty {
  opacity: 0.6;
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
  position: relative;
  display: flex;
  flex-direction: column;
}

.character-image {
  width: 100%;
  height: 130px;
  object-fit: cover;
  object-position: center top;
  background: var(--color-bg-tertiary);
  image-rendering: auto;
  image-rendering: -webkit-optimize-contrast;
  -ms-interpolation-mode: bicubic;
  flex-shrink: 0;
}

.character-info {
  flex: 1;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: center;
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
}

@media (max-width: 480px) {
  .character-slot {
    width: 100px;
    height: 140px;
  }

  .character-name {
    font-size: var(--font-xs);
  }
}
</style>

