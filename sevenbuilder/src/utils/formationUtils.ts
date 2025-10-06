import type { Formation, CharacterPosition, FormationType } from '../types';
import { getFormationConfig } from '../data/formationConfigs';

/**
 * Create an empty formation
 */
export function createEmptyFormation(formationType: FormationType = 'basic'): Formation {
  const config = getFormationConfig(formationType);
  
  return {
    formationType,
    characterSlots: [1, 2, 3, 4, 5].map((pos) => ({
      position: pos as CharacterPosition,
      character: null,
      positionType: config.frontPositions.includes(pos as CharacterPosition) ? 'front' : 'back',
    })),
    petSlot: {
      pet: null,
    },
  };
}

/**
 * Get position type (front/back) for a given position in a formation type
 */
export function getPositionType(position: CharacterPosition, formationType: FormationType): 'front' | 'back' {
  const config = getFormationConfig(formationType);
  return config.frontPositions.includes(position) ? 'front' : 'back';
}

/**
 * Validate formation (no duplicate characters)
 */
export function validateFormation(formation: Formation): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const characterIds = new Set<string>();

  formation.characterSlots.forEach((slot) => {
    if (slot.character) {
      if (characterIds.has(slot.character.id)) {
        errors.push(`Duplicate character: ${slot.character.name}`);
      }
      characterIds.add(slot.character.id);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Count filled character slots
 */
export function countFilledSlots(formation: Formation): number {
  return formation.characterSlots.filter((slot) => slot.character !== null).length;
}

/**
 * Check if formation has a pet
 */
export function hasPet(formation: Formation): boolean {
  return formation.petSlot.pet !== null;
}

