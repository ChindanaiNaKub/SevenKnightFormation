import { ref, computed } from 'vue';
import type { Formation, Character, Pet, CharacterPosition, FormationType } from '../types';
import { createEmptyFormation, validateFormation, getPositionType } from '../utils/formationUtils';
import { autoSaveCurrentFormation, loadCurrentFormation } from '../utils/storageUtils';

/**
 * Composable for managing formation state
 */
export function useFormation() {
  // Load saved formation or create empty one
  const savedFormation = loadCurrentFormation();
  const formation = ref<Formation>(savedFormation || createEmptyFormation('basic'));

  // Current formation type
  const formationType = computed(() => formation.value.formationType);

  // Character slots
  const characterSlots = computed(() => formation.value.characterSlots);

  // Pet slot
  const petSlot = computed(() => formation.value.petSlot);

  /**
   * Change formation type
   */
  function changeFormationType(newType: FormationType) {
    const newFormation = createEmptyFormation(newType);
    
    // Try to preserve character assignments
    formation.value.characterSlots.forEach((slot) => {
      if (slot.character) {
        const newSlot = newFormation.characterSlots.find((s) => s.position === slot.position);
        if (newSlot) {
          newSlot.character = slot.character;
          newSlot.positionType = getPositionType(slot.position, newType);
        }
      }
    });

    // Preserve pet
    newFormation.petSlot = formation.value.petSlot;
    
    formation.value = newFormation;
    autoSave();
  }

  /**
   * Add character to position
   */
  function addCharacter(character: Character, position: CharacterPosition) {
    const slot = formation.value.characterSlots.find((s) => s.position === position);
    if (slot) {
      slot.character = character;
      autoSave();
    }
  }

  /**
   * Remove character from position
   */
  function removeCharacter(position: CharacterPosition) {
    const slot = formation.value.characterSlots.find((s) => s.position === position);
    if (slot) {
      slot.character = null;
      autoSave();
    }
  }

  /**
   * Add pet
   */
  function addPet(pet: Pet) {
    formation.value.petSlot.pet = pet;
    autoSave();
  }

  /**
   * Remove pet
   */
  function removePet() {
    formation.value.petSlot.pet = null;
    autoSave();
  }

  /**
   * Clear entire formation
   */
  function clearFormation() {
    formation.value = createEmptyFormation(formation.value.formationType);
    autoSave();
  }

  /**
   * Validate current formation
   */
  function validate() {
    return validateFormation(formation.value);
  }

  /**
   * Auto-save to local storage
   */
  function autoSave() {
    autoSaveCurrentFormation(formation.value);
  }

  /**
   * Set formation (for loading saved formations)
   */
  function setFormation(newFormation: Formation) {
    formation.value = newFormation;
    autoSave();
  }

  /**
   * Move character from one position to another (for drag-and-drop reordering)
   */
  function moveCharacter(fromPosition: CharacterPosition, toPosition: CharacterPosition) {
    const fromSlot = formation.value.characterSlots.find((s) => s.position === fromPosition);
    const toSlot = formation.value.characterSlots.find((s) => s.position === toPosition);
    
    if (fromSlot && toSlot) {
      const character = fromSlot.character;
      fromSlot.character = toSlot.character;
      toSlot.character = character;
      autoSave();
    }
  }

  /**
   * Swap character with another character or empty slot
   */
  function swapCharacters(position1: CharacterPosition, position2: CharacterPosition) {
    const slot1 = formation.value.characterSlots.find((s) => s.position === position1);
    const slot2 = formation.value.characterSlots.find((s) => s.position === position2);
    
    if (slot1 && slot2) {
      const temp = slot1.character;
      slot1.character = slot2.character;
      slot2.character = temp;
      autoSave();
    }
  }

  /**
   * Check if character is already in formation
   */
  function isCharacterInFormation(characterId: string): boolean {
    return formation.value.characterSlots.some(slot => slot.character?.id === characterId);
  }

  /**
   * Check if pet is already in formation
   */
  function isPetInFormation(petId: string): boolean {
    return formation.value.petSlot.pet?.id === petId;
  }

  /**
   * Get character at position
   */
  function getCharacterAtPosition(position: CharacterPosition): Character | null {
    const slot = formation.value.characterSlots.find((s) => s.position === position);
    return slot?.character || null;
  }

  /**
   * Get formation validation errors
   */
  function getValidationErrors(): string[] {
    const errors: string[] = [];
    
    // Check for duplicate characters
    const characterIds = formation.value.characterSlots
      .filter(slot => slot.character)
      .map(slot => slot.character!.id);
    
    const uniqueIds = new Set(characterIds);
    if (characterIds.length !== uniqueIds.size) {
      errors.push('Duplicate characters are not allowed');
    }
    
    // Check character count
    const characterCount = formation.value.characterSlots.filter(slot => slot.character).length;
    if (characterCount > 5) {
      errors.push('Maximum 5 characters allowed');
    }
    
    return errors;
  }

  /**
   * Check if formation is valid
   */
  function isValid(): boolean {
    return getValidationErrors().length === 0;
  }

  return {
    formation,
    formationType,
    characterSlots,
    petSlot,
    changeFormationType,
    addCharacter,
    removeCharacter,
    addPet,
    removePet,
    clearFormation,
    validate,
    setFormation,
    moveCharacter,
    swapCharacters,
    isCharacterInFormation,
    isPetInFormation,
    getCharacterAtPosition,
    getValidationErrors,
    isValid,
  };
}

