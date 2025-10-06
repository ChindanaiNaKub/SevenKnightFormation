import { ref, reactive } from 'vue';
import type { Character, Pet, CharacterPosition } from '../types';

/**
 * Click-to-place composable for mobile-friendly character/pet placement
 */
export function useClickToPlace() {
  // Selection state
  const selectedItem = ref<Character | Pet | null>(null);
  const selectedItemType = ref<'character' | 'pet' | null>(null);
  const isSelecting = ref(false);

  // Visual feedback state
  const hoverState = reactive({
    characterSlot: null as CharacterPosition | null,
    petSlot: false,
  });

  /**
   * Start selection mode for character
   */
  function selectCharacter(character: Character) {
    selectedItem.value = character;
    selectedItemType.value = 'character';
    isSelecting.value = true;
  }

  /**
   * Start selection mode for pet
   */
  function selectPet(pet: Pet) {
    selectedItem.value = pet;
    selectedItemType.value = 'pet';
    isSelecting.value = true;
  }

  /**
   * Place selected item in character slot
   */
  function placeInCharacterSlot(position: CharacterPosition): boolean {
    if (!isSelecting.value || selectedItemType.value !== 'character' || !selectedItem.value) {
      return false;
    }

    const character = selectedItem.value as Character;
    
    // Reset selection
    clearSelection();
    
    return true;
  }

  /**
   * Place selected item in pet slot
   */
  function placeInPetSlot(): boolean {
    if (!isSelecting.value || selectedItemType.value !== 'pet' || !selectedItem.value) {
      return false;
    }

    const pet = selectedItem.value as Pet;
    
    // Reset selection
    clearSelection();
    
    return true;
  }

  /**
   * Clear current selection
   */
  function clearSelection() {
    selectedItem.value = null;
    selectedItemType.value = null;
    isSelecting.value = false;
    hoverState.characterSlot = null;
    hoverState.petSlot = false;
  }

  /**
   * Set hover state for character slot
   */
  function setCharacterSlotHover(position: CharacterPosition | null) {
    if (isSelecting.value && selectedItemType.value === 'character') {
      hoverState.characterSlot = position;
    }
  }

  /**
   * Set hover state for pet slot
   */
  function setPetSlotHover(isHovering: boolean) {
    if (isSelecting.value && selectedItemType.value === 'pet') {
      hoverState.petSlot = isHovering;
    }
  }

  /**
   * Check if position is valid for current selection
   */
  function isValidPlacement(position: CharacterPosition | 'pet'): boolean {
    if (!isSelecting.value || !selectedItemType.value) return false;
    
    if (selectedItemType.value === 'character') {
      return typeof position === 'number' && position >= 1 && position <= 5;
    } else {
      return position === 'pet';
    }
  }

  /**
   * Handle click on character slot
   */
  function handleCharacterSlotClick(position: CharacterPosition): { action: 'place' | 'select' | 'swap' | 'remove'; item?: Character | Pet } {
    if (isSelecting.value && selectedItemType.value === 'character') {
      return { action: 'place', item: selectedItem.value as Character };
    }
    
    return { action: 'select' };
  }

  /**
   * Handle click on pet slot
   */
  function handlePetSlotClick(): { action: 'place' | 'select' | 'remove'; item?: Character | Pet } {
    if (isSelecting.value && selectedItemType.value === 'pet') {
      return { action: 'place', item: selectedItem.value as Pet };
    }
    
    return { action: 'select' };
  }

  /**
   * Handle click on character card
   */
  function handleCharacterCardClick(character: Character): { action: 'select' | 'cancel' } {
    if (isSelecting.value) {
      if (selectedItemType.value === 'character' && selectedItem.value?.id === character.id) {
        clearSelection();
        return { action: 'cancel' };
      }
    }
    
    selectCharacter(character);
    return { action: 'select' };
  }

  /**
   * Handle click on pet card
   */
  function handlePetCardClick(pet: Pet): { action: 'select' | 'cancel' } {
    if (isSelecting.value) {
      if (selectedItemType.value === 'pet' && selectedItem.value?.id === pet.id) {
        clearSelection();
        return { action: 'cancel' };
      }
    }
    
    selectPet(pet);
    return { action: 'select' };
  }

  return {
    // State
    selectedItem,
    selectedItemType,
    isSelecting,
    hoverState,
    
    // Actions
    selectCharacter,
    selectPet,
    placeInCharacterSlot,
    placeInPetSlot,
    clearSelection,
    setCharacterSlotHover,
    setPetSlotHover,
    isValidPlacement,
    
    // Handlers
    handleCharacterSlotClick,
    handlePetSlotClick,
    handleCharacterCardClick,
    handlePetCardClick,
  };
}
