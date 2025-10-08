<template>
  <div id="app">
    <!-- Header -->
    <AppHeader
      @reset="handleReset"
      @manage="openManager"
      @save="handleSave"
      @share="handleShare"
      @export="handleExportPng"
    />

    <!-- Main Content -->
    <main class="main-content">
      <div class="content-wrapper">
        <!-- Left Side: Formation Area -->
        <div class="formation-area">
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
        </div>

        <!-- Right Side: Character Roster -->
        <aside class="roster-sidebar" :class="{ collapsed: isRosterCollapsed }">
          <button 
            class="roster-toggle" 
            @click="isRosterCollapsed = !isRosterCollapsed"
            :title="isRosterCollapsed ? 'Show Roster' : 'Hide Roster'"
          >
            <svg v-if="isRosterCollapsed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
          
          <div class="roster-content-wrapper">
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
          </div>
        </aside>
      </div>
    </main>

    <!-- Formation Manager Modal -->
    <FormationManager
      v-if="showManager"
      @close="closeManager"
      @load="handleLoadFormation"
    />

    <!-- Character Selection Modal -->
    <CharacterSelectionModal
      v-if="showCharacterModal"
      :characters="allCharacters"
      :placed-characters="placedCharacters"
      :target-position="modalTargetPosition"
      @close="closeCharacterModal"
      @select="handleModalCharacterSelect"
    />

    <!-- Pet Selection Modal -->
    <PetSelectionModal
      v-if="showPetModal"
      :pets="allPets"
      :placed-pet="petSlot.pet"
      @close="closePetModal"
      @select="handleModalPetSelect"
    />

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import AppHeader from './components/ui/AppHeader.vue';
import FormationManager from './components/ui/FormationManager.vue';
import CharacterSelectionModal from './components/ui/CharacterSelectionModal.vue';
import PetSelectionModal from './components/ui/PetSelectionModal.vue';
import FormationTypeSelector from './components/formation/FormationTypeSelector.vue';
import FormationDisplay from './components/formation/FormationDisplay.vue';
import CharacterRoster from './components/character/CharacterRoster.vue';
import { useFormation } from './composables/useFormation';
import { useClickToPlace } from './composables/useClickToPlace';
import { characters as allCharacters } from './data/characters';
import { pets as allPets } from './data/pets';
import type { Character, Pet, FormationType, CharacterPosition } from './types';
import { generateShareUrl, copyToClipboard, getFormationFromUrl } from './utils/shareUtils';

const isLoading = ref(true);
const isRosterCollapsed = ref(localStorage.getItem('rosterCollapsed') === 'true');

// Watch for collapse state changes and save to localStorage
watch(isRosterCollapsed, (newValue) => {
  localStorage.setItem('rosterCollapsed', String(newValue));
});

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

// Modal state for character/pet selection
const showCharacterModal = ref(false);
const showPetModal = ref(false);
const modalTargetPosition = ref<CharacterPosition>(1);

// Get currently placed characters
const placedCharacters = computed(() => {
  return characterSlots.value
    .map(slot => slot.character)
    .filter((char): char is Character => char !== null);
});

function openCharacterModal(position: CharacterPosition) {
  modalTargetPosition.value = position;
  showCharacterModal.value = true;
}

function closeCharacterModal() {
  showCharacterModal.value = false;
}

function openPetModal() {
  showPetModal.value = true;
}

function closePetModal() {
  showPetModal.value = false;
}

function handleModalCharacterSelect(character: Character) {
  addCharacter(character, modalTargetPosition.value);
  closeCharacterModal();
}

function handleModalPetSelect(pet: Pet) {
  addPet(pet);
  closePetModal();
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
  const url = generateShareUrl({
    formationType: formationType.value,
    characterSlots: characterSlots.value,
    petSlot: petSlot.value,
  } as any);
  copyToClipboard(url).then((ok) => {
    if (ok) {
      alert('Share link copied to clipboard!');
    } else {
      // Fallback: show prompt with URL
      window.prompt('Copy this link:', url);
    }
  });
}

async function handleExportPng() {
  const section = document.querySelector('.formation-section') as HTMLElement | null;
  if (!section) return;
  const { default: html2canvas } = await import('html2canvas');
  const canvas = await html2canvas(section, { backgroundColor: '#0b0b1a' });
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'formation.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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

// Click-to-place handlers (with modal support)
function handleCharacterSlotClick(position: number) {
  const pos = position as CharacterPosition;
  
  // Check if we're in selection mode (click-to-place from roster)
  if (isSelecting.value && selectedItemType.value === 'character') {
    const result = ctpHandleCharacterSlotClick(pos);
    
    if (result.action === 'place' && result.item) {
      const character = result.item as Character;
      if (!isCharacterInFormation(character.id)) {
        addCharacter(character, pos);
        clearSelection();
      }
    }
  } else {
    // No selection active - check if slot is empty, then open modal
    const slot = characterSlots.value.find(s => s.position === pos);
    if (slot && !slot.character) {
      openCharacterModal(pos);
    }
  }
}

function handlePetSlotClick() {
  // Check if we're in selection mode (click-to-place from roster)
  if (isSelecting.value && selectedItemType.value === 'pet') {
    const result = ctpHandlePetSlotClick();
    
    if (result.action === 'place' && result.item) {
      const pet = result.item as Pet;
      if (!isPetInFormation(pet.id)) {
        addPet(pet);
        clearSelection();
      }
    }
  } else {
    // No selection active - check if slot is empty, then open modal
    if (!petSlot.value.pet) {
      openPetModal();
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
  // Load from URL if present
  const shareData = getFormationFromUrl();
  if (shareData) {
    // Build a formation object from share data using existing state as base
    const current = {
      formationType: shareData.formationType,
      characterSlots: characterSlots.value.map((slot) => ({ ...slot, character: null })),
      petSlot: { ...petSlot.value, pet: null },
    } as any;

    // Map characters by id from roster
    const charById = new Map(allCharacters.map((c: any) => [c.id, c]));
    for (const { position, characterId } of shareData.characters) {
      const slot = current.characterSlots.find((s: any) => s.position === position);
      const character = charById.get(characterId);
      if (slot && character) slot.character = character;
    }

    if (shareData.petId) {
      const pet = allPets.find((p: any) => p.id === shareData.petId) || null;
      current.petSlot = { ...current.petSlot, pet };
    }

    setFormation(current);
  }

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
  display: flex;
  overflow: hidden;
}

.content-wrapper {
  flex: 1;
  display: flex;
  gap: var(--spacing-md);
  overflow: hidden;
}

.formation-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl);
  overflow-y: auto;
  animation: fadeIn 0.5s ease;
}

.roster-sidebar {
  width: 420px;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-secondary);
  border-left: 1px solid var(--color-border);
  position: relative;
  transition: width 0.3s ease, transform 0.3s ease;
  animation: slideInRight 0.5s ease;
}

.roster-sidebar.collapsed {
  width: 40px;
}

.roster-toggle {
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 80px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-right: none;
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.roster-toggle:hover {
  background: var(--color-bg-tertiary);
  box-shadow: var(--shadow-md);
}

.roster-toggle svg {
  color: var(--color-text-primary);
}

.roster-content-wrapper {
  flex: 1;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.roster-sidebar.collapsed .roster-content-wrapper {
  opacity: 0;
  pointer-events: none;
}

.selector-section,
.formation-section {
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

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
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
@media (max-width: 1200px) {
  .roster-sidebar {
    width: 360px;
  }
}

@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
  }

  .formation-area {
    padding: var(--spacing-md);
    overflow-y: visible;
  }

  .roster-sidebar {
    width: 100%;
    max-height: 600px;
    border-left: none;
    border-top: 2px solid var(--color-border);
    animation: slideInUp 0.5s ease;
  }

  .roster-sidebar.collapsed {
    max-height: 60px;
    width: 100%;
  }

  .roster-toggle {
    left: 50%;
    top: -20px;
    transform: translateX(-50%);
    width: 80px;
    height: 40px;
    border: 2px solid var(--color-border);
    border-bottom: none;
    border-radius: 8px 8px 0 0;
  }

  .roster-toggle svg {
    transform: rotate(90deg);
  }
}

@media (max-width: 768px) {
  .formation-area {
    padding: var(--spacing-sm);
  }

  .roster-sidebar {
    max-height: 500px;
  }
}

@media (max-width: 480px) {
  .formation-area {
    padding: var(--spacing-xs);
  }

  .roster-sidebar {
    max-height: 400px;
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
