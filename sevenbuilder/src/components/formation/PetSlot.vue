<template>
  <div 
    :class="[
      'pet-slot', 
      { 
        'is-empty': !pet, 
        'is-filled': pet,
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
    <div class="slot-label">Pet</div>

    <!-- Empty State -->
    <div v-if="!pet" class="slot-empty">
      <img
        src="/placeholder-pet.svg"
        alt="Empty pet slot"
        class="placeholder-image"
      />
      <span class="empty-text">No Pet</span>
    </div>

    <!-- Filled State -->
    <div v-else class="slot-filled">
      <img
        :src="pet.image"
        :alt="pet.name"
        class="pet-image"
        @error="handleImageError"
        draggable="true"
        @dragstart="handleDragStart"
      />
      
      <div class="pet-info">
        <div class="pet-header">
          <span class="pet-name">{{ pet.name }}</span>
          <button
            class="remove-button"
            @click="$emit('remove')"
            title="Remove pet"
          >
            <img src="/icons/icon-remove.svg" alt="Remove" />
          </button>
        </div>
        
        
        <div class="pet-skill">
          <span class="skill-name">{{ pet.passiveSkill }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Pet } from '../../types';

interface Props {
  pet: Pet | null;
  isSelecting?: boolean;
  isValidTarget?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  remove: [];
  dragStart: [pet: Pet];
  drop: [data: { item: Pet; type: 'character' | 'pet'; source: string; target: string }];
  click: [];
  mouseEnter: [];
  mouseLeave: [];
}>();

const isDragOver = ref(false);
const isInvalidDrop = ref(false);

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = '/placeholder-pet.svg';
}

function handleDragStart(event: DragEvent) {
  if (!props.pet) return;
  
  emit('dragStart', props.pet);
  
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify({
      item: props.pet,
      type: 'pet',
      source: 'pet-slot',
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
      if (dragData.type === 'pet') {
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
      if (dragData.type === 'pet') {
        emit('drop', {
          item: dragData.item,
          type: dragData.type,
          source: dragData.source,
          target: 'pet-slot',
        });
      }
    } catch {
      // Invalid data, ignore
    }
  }
}

function handleClick() {
  emit('click');
}

function handleMouseEnter() {
  emit('mouseEnter');
}

function handleMouseLeave() {
  emit('mouseLeave');
}
</script>

<style scoped>
.pet-slot {
  position: relative;
  width: 140px;
  height: 180px;
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.2);
}

.pet-slot:hover {
  border-color: var(--color-secondary-light);
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
}

.pet-slot.is-drag-over {
  border-color: var(--color-primary);
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.6);
  transform: scale(1.05);
  z-index: 10;
}

.pet-slot.is-invalid-drop {
  border-color: var(--color-error);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.6);
  background: rgba(239, 68, 68, 0.1);
}

/* Click-to-place states */
.pet-slot.is-selecting {
  cursor: pointer;
}

.pet-slot.is-selectable {
  border-color: var(--color-success);
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
  background: rgba(34, 197, 94, 0.05);
  animation: pulse-select 2s ease-in-out infinite;
}

.pet-slot.is-selectable:hover {
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

.pet-slot.is-filled {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, var(--color-bg-secondary) 100%);
}

.slot-label {
  position: absolute;
  top: var(--spacing-xs);
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-secondary);
  color: var(--color-text-primary);
  padding: 0.125rem var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  font-weight: 700;
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
  position: relative;
}

.pet-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: var(--color-bg-tertiary);
}

.pet-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: var(--spacing-sm);
  padding-top: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.pet-header {
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


.pet-skill {
  margin-top: auto;
  padding-top: 0.25rem;
  border-top: 1px solid var(--color-border);
}

.skill-name {
  font-size: var(--font-xs);
  color: var(--color-secondary-light);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .pet-slot {
    width: 120px;
    height: 160px;
  }
}

@media (max-width: 480px) {
  .pet-slot {
    width: 100px;
    height: 140px;
  }

  .pet-name {
    font-size: var(--font-xs);
  }
}
</style>

