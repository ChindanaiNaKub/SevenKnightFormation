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
  };
}

