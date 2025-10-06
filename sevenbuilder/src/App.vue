<template>
  <div id="app">
    <!-- Header -->
    <AppHeader
      @reset="handleReset"
      @save="handleSave"
      @share="handleShare"
    />

    <!-- Main Content -->
    <main class="main-content">
      <div class="content-wrapper">
        <!-- Formation Type Selector -->
        <section class="selector-section">
          <FormationTypeSelector
            :selected-type="formationType"
            @select="handleChangeFormationType"
          />
        </section>

        <!-- Formation Display -->
        <section class="formation-section">
          <FormationDisplay
            :formation-type="formationType"
            :character-slots="characterSlots"
            :pet-slot="petSlot"
            @remove-character="handleRemoveCharacter"
            @remove-pet="handleRemovePet"
          />
        </section>

        <!-- Character Roster -->
        <section class="roster-section">
          <CharacterRoster
            :characters="allCharacters"
            :pets="allPets"
            :character-slots="characterSlots"
            :pet-slot="petSlot"
            @select-character="handleSelectCharacter"
            @select-pet="handleSelectPet"
          />
        </section>
      </div>
    </main>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AppHeader from './components/ui/AppHeader.vue';
import FormationTypeSelector from './components/formation/FormationTypeSelector.vue';
import FormationDisplay from './components/formation/FormationDisplay.vue';
import CharacterRoster from './components/character/CharacterRoster.vue';
import { useFormation } from './composables/useFormation';
import { characters as allCharacters } from './data/characters';
import { pets as allPets } from './data/pets';
import type { Character, Pet, FormationType, CharacterPosition } from './types';

const isLoading = ref(true);

// Formation state management
const {
  formationType,
  characterSlots,
  petSlot,
  changeFormationType,
  addCharacter,
  removeCharacter,
  addPet,
  removePet,
  clearFormation,
} = useFormation();

// Handlers
function handleChangeFormationType(type: FormationType) {
  changeFormationType(type);
}

function handleSelectCharacter(character: Character) {
  // Find first empty slot
  const emptySlot = characterSlots.value.find(slot => !slot.character);
  if (emptySlot) {
    addCharacter(character, emptySlot.position);
  } else {
    // TODO: Show notification that all slots are full
    console.log('All character slots are full');
  }
}

function handleSelectPet(pet: Pet) {
  addPet(pet);
}

function handleRemoveCharacter(position: number) {
  removeCharacter(position as CharacterPosition);
}

function handleRemovePet() {
  removePet();
}

function handleReset() {
  if (confirm('Are you sure you want to reset the formation?')) {
    clearFormation();
  }
}

function handleSave() {
  // TODO: Implement save to named formations
  alert('Formation auto-saved! Named saves coming soon.');
}

function handleShare() {
  // TODO: Implement share functionality
  alert('Share functionality coming soon!');
}

// Initialize
onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-primary);
}

.main-content {
  flex: 1;
  padding: var(--spacing-lg);
  overflow-y: auto;
}

.content-wrapper {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.selector-section,
.formation-section,
.roster-section {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Loading Overlay */
.loading-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  z-index: 1000;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid var(--color-bg-secondary);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: var(--font-lg);
  color: var(--color-text-secondary);
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    padding: var(--spacing-md);
  }

  .content-wrapper {
    gap: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: var(--spacing-sm);
  }
}
</style>
