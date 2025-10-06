<template>
  <div id="app">
    <!-- Header -->
    <AppHeader
      @reset="handleReset"
      @manage="openManager"
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
            :is-selecting="isSelecting"
            :is-valid-placement="uiIsValidPlacement"
            @remove-character="handleRemoveCharacter"
            @remove-pet="handleRemovePet"
            @character-drag-start="handleCharacterDragStart"
            @character-drop="handleCharacterDrop"
            @pet-drag-start="handlePetDragStart"
            @pet-drop="handlePetDrop"
            @character-slot-click="handleCharacterSlotClick"
            @character-slot-mouse-enter="handleCharacterSlotMouseEnter"
            @character-slot-mouse-leave="handleCharacterSlotMouseLeave"
            @pet-slot-click="handlePetSlotClick"
            @pet-slot-mouse-enter="handlePetSlotMouseEnter"
            @pet-slot-mouse-leave="handlePetSlotMouseLeave"
          />
        </section>

        <!-- Character Roster -->
        <section class="roster-section">
          <CharacterRoster
            :characters="allCharacters"
            :pets="allPets"
            :character-slots="characterSlots"
            :pet-slot="petSlot"
            :selected-item="selectedItem"
            :selected-item-type="selectedItemType"
            @select-character="handleSelectCharacter"
            @select-pet="handleSelectPet"
            @character-drag-start="handleCharacterDragStart"
            @pet-drag-start="handlePetDragStart"
          />
        </section>
      </div>
    </main>

    <!-- Formation Manager Modal -->
    <FormationManager
      v-if="showManager"
      @close="closeManager"
      @load="handleLoadFormation"
    />

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
import FormationManager from './components/ui/FormationManager.vue';
import FormationTypeSelector from './components/formation/FormationTypeSelector.vue';
import FormationDisplay from './components/formation/FormationDisplay.vue';
import CharacterRoster from './components/character/CharacterRoster.vue';
import { useFormation } from './composables/useFormation';
import { useClickToPlace } from './composables/useClickToPlace';
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
  swapCharacters,
  isCharacterInFormation,
  isPetInFormation,
  setFormation,
} = useFormation();

// Click-to-place functionality
const {
  selectedItem,
  selectedItemType,
  isSelecting,
  clearSelection,
  setCharacterSlotHover,
  setPetSlotHover,
  isValidPlacement,
  handleCharacterSlotClick: ctpHandleCharacterSlotClick,
  handlePetSlotClick: ctpHandlePetSlotClick,
  handleCharacterCardClick,
  handlePetCardClick,
} = useClickToPlace();
const showManager = ref(false);

function openManager() { showManager.value = true; }
function closeManager() { showManager.value = false; }

function handleLoadFormation(f: any) {
  setFormation(f);
  closeManager();
}


// Handlers
function handleChangeFormationType(type: FormationType) {
  changeFormationType(type);
}

function handleSelectCharacter(character: Character) {
  const result = handleCharacterCardClick(character);
  
  if (result.action === 'select') {
    // Character is now selected, user can click on a slot to place it
    console.log('Character selected for placement:', character.name);
  } else if (result.action === 'cancel') {
    console.log('Character selection cancelled');
  }
}

function handleSelectPet(pet: Pet) {
  const result = handlePetCardClick(pet);
  
  if (result.action === 'select') {
    // Pet is now selected, user can click on pet slot to place it
    console.log('Pet selected for placement:', pet.name);
  } else if (result.action === 'cancel') {
    console.log('Pet selection cancelled');
  }
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
  const defaultName = 'My Formation';
  const name = window.prompt('Save formation as:', defaultName);
  if (!name) return;
  try {
    // Defer to storage utils via dynamic import to avoid circulars
    import('./utils/storageUtils').then(({ saveFormationWithName }) => {
      saveFormationWithName({
        formationType: formationType.value,
        characterSlots: characterSlots.value,
        petSlot: petSlot.value,
      } as any, name.trim());
      alert('Saved formation: ' + name.trim());
    });
  } catch (e) {
    console.error(e);
    alert('Failed to save formation');
  }
}

function handleShare() {
  // TODO: Implement share functionality
  alert('Share functionality coming soon!');
}

// Drag and Drop Handlers
function handleCharacterDragStart(character: Character, sourcePosition?: number) {
  // This is handled by the drag events, but we can add visual feedback here if needed
  console.log('Character drag started:', character.name, 'from position:', sourcePosition);
}

function handlePetDragStart(pet: Pet) {
  // This is handled by the drag events, but we can add visual feedback here if needed
  console.log('Pet drag started:', pet.name);
}

function handleCharacterDrop(dropData: any) {
  const { item: character, type, source, target } = dropData;
  
  if (type !== 'character') return;
  
  // Parse target position
  const targetMatch = target.match(/slot-(\d+)/);
  if (!targetMatch) return;
  
  const targetPosition = parseInt(targetMatch[1]) as CharacterPosition;
  
  // Handle different drop scenarios
  if (source === 'roster') {
    // Dropping from roster to empty slot
    if (!isCharacterInFormation(character.id)) {
      addCharacter(character, targetPosition);
    }
  } else if (source.startsWith('slot-')) {
    // Dropping from one slot to another (reordering)
    const sourceMatch = source.match(/slot-(\d+)/);
    if (sourceMatch) {
      const sourcePosition = parseInt(sourceMatch[1]) as CharacterPosition;
      swapCharacters(sourcePosition, targetPosition);
    }
  }
}

function handlePetDrop(dropData: any) {
  const { item: pet, type, source } = dropData;
  
  if (type !== 'pet') return;
  
  // Handle pet drop
  if (source === 'roster' && !isPetInFormation(pet.id)) {
    addPet(pet);
  }
}

// Click-to-place handlers
function handleCharacterSlotClick(position: number) {
  const pos = position as CharacterPosition;
  const result = ctpHandleCharacterSlotClick(pos);
  
  if (result.action === 'place' && result.item) {
    const character = result.item as Character;
    if (!isCharacterInFormation(character.id)) {
      addCharacter(character, pos);
      clearSelection();
    }
  }
}

function handlePetSlotClick() {
  const result = ctpHandlePetSlotClick();
  
  if (result.action === 'place' && result.item) {
    const pet = result.item as Pet;
    if (!isPetInFormation(pet.id)) {
      addPet(pet);
      clearSelection();
    }
  }
}

function handleCharacterSlotMouseEnter(position: number) {
  setCharacterSlotHover(position as CharacterPosition);
}

function handleCharacterSlotMouseLeave() {
  setCharacterSlotHover(null);
}

function handlePetSlotMouseEnter() {
  setPetSlotHover(true);
}

function handlePetSlotMouseLeave() {
  setPetSlotHover(false);
}

// Initialize
onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});

// Bridge function to align types for template usage
function uiIsValidPlacement(position: number | 'pet') {
  if (position === 'pet') return isValidPlacement('pet');
  return isValidPlacement(position as CharacterPosition);
}
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
