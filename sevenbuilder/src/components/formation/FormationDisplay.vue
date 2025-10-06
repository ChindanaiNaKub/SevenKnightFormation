<template>
  <div class="formation-display">
    <div class="formation-header">
      <h2 class="formation-title">Formation</h2>
      <div class="formation-type">
        <span class="type-label">Type:</span>
        <span class="type-value">{{ formationTypeName }}</span>
      </div>
    </div>

    <div class="formation-grid">
      <!-- Character Slots -->
      <div class="character-slots">
        <CharacterSlot
          v-for="slot in characterSlots"
          :key="slot.position"
          :position="slot.position"
          :position-type="slot.positionType"
          :character="slot.character"
          @remove="$emit('removeCharacter', slot.position)"
        />
      </div>

      <!-- Pet Slot -->
      <div class="pet-slot-container">
        <PetSlot
          :pet="petSlot.pet"
          @remove="$emit('removePet')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CharacterSlot as CharacterSlotType, PetSlot as PetSlotType, FormationType } from '../../types';
import CharacterSlot from './CharacterSlot.vue';
import PetSlot from './PetSlot.vue';

interface Props {
  formationType: FormationType;
  characterSlots: CharacterSlotType[];
  petSlot: PetSlotType;
}

const props = defineProps<Props>();

defineEmits<{
  removeCharacter: [position: number];
  removePet: [];
}>();

const formationTypeName = computed(() => {
  const names: Record<FormationType, string> = {
    basic: 'Basic Formation',
    normal: 'Normal Formation',
    attack: 'Attack Formation',
    defense: 'Defense Formation',
  };
  return names[props.formationType];
});
</script>

<style scoped>
.formation-display {
  background: linear-gradient(135deg, var(--color-bg-secondary) 0%, rgba(124, 58, 237, 0.08) 100%);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(124, 58, 237, 0.2);
  position: relative;
  overflow: hidden;
}

.formation-display::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%);
  pointer-events: none;
  animation: pulse 8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

.formation-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-border);
  position: relative;
  z-index: 1;
}

.formation-title {
  font-size: var(--font-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
}

.formation-type {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
}

.type-label {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
}

.type-value {
  font-size: var(--font-md);
  font-weight: 600;
  color: var(--color-primary-light);
}

.formation-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xl);
  position: relative;
  z-index: 1;
  padding: var(--spacing-md);
  background: rgba(15, 15, 35, 0.3);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
}

.character-slots {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  max-width: 500px;
}

.pet-slot-container {
  display: flex;
  align-items: center;
}

/* Responsive */
@media (max-width: 1024px) {
  .formation-grid {
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .pet-slot-container {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .formation-display {
    padding: var(--spacing-md);
  }

  .formation-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .formation-title {
    font-size: var(--font-xl);
  }

  .character-slots {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }
}

@media (max-width: 480px) {
  .character-slots {
    grid-template-columns: repeat(2, 1fr);
    max-width: 100%;
  }

  .formation-type {
    width: 100%;
    justify-content: space-between;
  }
}
</style>

