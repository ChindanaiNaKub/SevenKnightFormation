<template>
  <div :class="['pet-slot', { 'is-empty': !pet, 'is-filled': pet }]">
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
        
        <div class="pet-stats">
          <span class="level">Lv.{{ pet.level }}</span>
        </div>
        
        <div class="pet-skill">
          <span class="skill-name">{{ pet.passiveSkill }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pet } from '../../types';

interface Props {
  pet: Pet | null;
}

defineProps<Props>();

defineEmits<{
  remove: [];
}>();

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = '/placeholder-pet.svg';
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
  display: flex;
  flex-direction: column;
}

.pet-image {
  width: 100%;
  height: 110px;
  object-fit: cover;
  background: var(--color-bg-tertiary);
}

.pet-info {
  flex: 1;
  padding: var(--spacing-sm);
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

.pet-stats {
  font-size: var(--font-xs);
  color: var(--color-text-secondary);
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

  .pet-image {
    height: 95px;
  }
}

@media (max-width: 480px) {
  .pet-slot {
    width: 100px;
    height: 140px;
  }

  .pet-image {
    height: 80px;
  }

  .pet-name {
    font-size: var(--font-xs);
  }
}
</style>

