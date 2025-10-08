<template>
  <Teleport to="body">
    <div class="modal-overlay" @click="handleOverlayClick">
      <div class="modal-container" @click.stop>
        <!-- Header -->
        <div class="modal-header">
          <h2 class="modal-title">
            Select Pet
          </h2>
          <button class="close-button" @click="$emit('close')" title="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Pet List -->
        <div class="pet-list">
          <div
            v-for="pet in pets"
            :key="pet.id"
            :class="['pet-item', { 
              'is-placed': isPetPlaced(pet),
              'is-disabled': isPetPlaced(pet)
            }]"
            @click="handleSelectPet(pet)"
          >
            <!-- Pet Portrait -->
            <div class="pet-portrait">
              <img
                :src="pet.image"
                :alt="pet.name"
                @error="handleImageError"
              />
              <div v-if="isPetPlaced(pet)" class="placed-overlay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>

            <!-- Pet Info -->
            <div class="pet-details">
              <div class="pet-name">{{ pet.name }}</div>
              <div class="pet-skill">{{ pet.passiveSkill }}</div>
              <div class="pet-effect">{{ pet.effect }}</div>
            </div>

            <!-- Pet Stats -->
            <div class="pet-stats">
              <span class="pet-rarity">{{ pet.rarity }}</span>
              <span class="pet-level">Lv. {{ pet.level }}</span>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="pets.length === 0" class="empty-state">
            <p>No pets available</p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Pet } from '../../types';

interface Props {
  pets: Pet[];
  placedPet: Pet | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
  select: [pet: Pet];
}>();

// Check if pet is already placed
function isPetPlaced(pet: Pet): boolean {
  return props.placedPet?.id === pet.id;
}

// Handle pet selection
function handleSelectPet(pet: Pet) {
  if (isPetPlaced(pet)) {
    return; // Don't allow selecting already placed pet
  }
  
  emit('select', pet);
}

// Handle overlay click to close modal
function handleOverlayClick() {
  emit('close');
}

// Handle image error
function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = '/placeholder-pet.svg';
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: linear-gradient(135deg, #1a1f2e 0%, #252b3d 100%);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.close-button {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* Pet List */
.pet-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.pet-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.pet-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateX(4px);
}

.pet-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.pet-item.is-placed {
  background: rgba(52, 211, 153, 0.1);
  border-color: rgba(52, 211, 153, 0.3);
}

/* Pet Portrait */
.pet-portrait {
  position: relative;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
}

.pet-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placed-overlay {
  position: absolute;
  inset: 0;
  background: rgba(52, 211, 153, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/* Pet Details */
.pet-details {
  flex: 1;
  min-width: 0;
}

.pet-name {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.25rem;
}

.pet-skill {
  font-size: 0.875rem;
  font-weight: 500;
  color: #a78bfa;
  margin-bottom: 0.125rem;
}

.pet-effect {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Pet Stats */
.pet-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.pet-rarity,
.pet-level {
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Scrollbar Styling */
.pet-list::-webkit-scrollbar {
  width: 8px;
}

.pet-list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.pet-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.pet-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Responsive */
@media (max-width: 640px) {
  .modal-container {
    max-height: 90vh;
    border-radius: 12px 12px 0 0;
  }

  .modal-title {
    font-size: 1.25rem;
  }

  .pet-portrait {
    width: 50px;
    height: 50px;
  }
}
</style>
