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
      <!-- Character Slots - Grouped by position type -->
      <div class="character-slots" :class="`formation-${formationType}`">
        <!-- Front Row -->
        <div v-if="frontSlots.length > 0" class="position-row front-row">
          <div class="row-label">Front</div>
          <div class="slots-row">
            <CharacterSlot
              v-for="slot in frontSlots"
              :key="slot.position"
              :position="slot.position"
              :position-type="slot.positionType"
              :character="slot.character"
              :is-selecting="isSelecting"
              :is-valid-target="validPlacement(slot.position)"
              @remove="$emit('removeCharacter', slot.position)"
              @drag-start="$emit('characterDragStart', $event, slot.position)"
              @drop="$emit('characterDrop', $event)"
              @click="$emit('characterSlotClick', slot.position)"
              @mouse-enter="$emit('characterSlotMouseEnter', slot.position)"
              @mouse-leave="$emit('characterSlotMouseLeave')"
            />
          </div>
        </div>

        <!-- Back Row -->
        <div v-if="backSlots.length > 0" class="position-row back-row">
          <div class="row-label">Back</div>
          <div class="slots-row">
            <CharacterSlot
              v-for="slot in backSlots"
              :key="slot.position"
              :position="slot.position"
              :position-type="slot.positionType"
              :character="slot.character"
              :is-selecting="isSelecting"
              :is-valid-target="validPlacement(slot.position)"
              @remove="$emit('removeCharacter', slot.position)"
              @drag-start="$emit('characterDragStart', $event, slot.position)"
              @drop="$emit('characterDrop', $event)"
              @click="$emit('characterSlotClick', slot.position)"
              @mouse-enter="$emit('characterSlotMouseEnter', slot.position)"
              @mouse-leave="$emit('characterSlotMouseLeave')"
            />
          </div>
        </div>
      </div>

      <!-- Pet Slot -->
      <div class="pet-slot-container">
        <PetSlot
          :pet="petSlot.pet"
          :is-selecting="isSelecting"
          :is-valid-target="validPlacement('pet')"
          @remove="$emit('removePet')"
          @drag-start="$emit('petDragStart', $event)"
          @drop="$emit('petDrop', $event)"
          @click="$emit('petSlotClick')"
          @mouse-enter="$emit('petSlotMouseEnter')"
          @mouse-leave="$emit('petSlotMouseLeave')"
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
  isSelecting?: boolean;
  isValidPlacement?: (position: number | 'pet') => boolean;
}

const props = defineProps<Props>();

defineEmits<{
  removeCharacter: [position: number];
  removePet: [];
  characterDragStart: [character: any, position: number];
  characterDrop: [data: any];
  petDragStart: [pet: any];
  petDrop: [data: any];
  characterSlotClick: [position: number];
  characterSlotMouseEnter: [position: number];
  characterSlotMouseLeave: [];
  petSlotClick: [];
  petSlotMouseEnter: [];
  petSlotMouseLeave: [];
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

const frontSlots = computed(() => {
  return props.characterSlots.filter(slot => slot.positionType === 'front');
});

const backSlots = computed(() => {
  return props.characterSlots.filter(slot => slot.positionType === 'back');
});

// Local guard to safely call optional validator from props
function validPlacement(position: number | 'pet'): boolean {
  return props.isValidPlacement ? props.isValidPlacement(position) : false;
}
</script>

<style scoped>
.formation-display {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
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
  background: radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 70%);
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
  border-bottom: 1px solid var(--color-border);
  position: relative;
  z-index: 1;
}

.formation-title {
  font-size: var(--font-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.025em;
}

.formation-type {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-elevated);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.type-label {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
}

.type-value {
  font-size: var(--font-md);
  font-weight: 500;
  color: var(--color-primary-light);
}

.formation-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xl);
  position: relative;
  z-index: 1;
  padding: var(--spacing-lg);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-subtle);
}

.character-slots {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  max-width: 600px;
  align-self: center;
}

.position-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.row-label {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--color-text-muted);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.slots-row {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  flex-wrap: nowrap; /* Changed from wrap to nowrap to prevent layout breaking */
}

/* Formation-specific layouts */
.formation-basic .slots-row,
.formation-normal .slots-row {
  gap: var(--spacing-sm);
}

.formation-attack .front-row .slots-row {
  gap: var(--spacing-xl);
}

.formation-attack .back-row .slots-row {
  gap: var(--spacing-xs);
}

.formation-defense .front-row .slots-row {
  gap: var(--spacing-xs);
}

.formation-defense .back-row .slots-row {
  gap: var(--spacing-xl);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .slots-row {
    gap: var(--spacing-sm);
  }

  .formation-attack .front-row .slots-row,
  .formation-defense .back-row .slots-row {
    gap: var(--spacing-lg);
  }
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
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .formation-type {
    width: 100%;
    justify-content: space-between;
  }

  .slots-row {
    justify-content: space-around;
  }
}
</style>

