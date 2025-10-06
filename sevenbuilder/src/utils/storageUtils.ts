import type { Formation } from '../types';

const STORAGE_KEY = 'seven-knights-formations';
const CURRENT_FORMATION_KEY = 'seven-knights-current-formation';

/**
 * Save formation to local storage
 */
export function saveFormation(formation: Formation): void {
  try {
    const formations = getSavedFormations();
    const formationWithTimestamp = {
      ...formation,
      id: formation.id || crypto.randomUUID(),
      updatedAt: new Date(),
      createdAt: formation.createdAt || new Date(),
    };

    const existingIndex = formations.findIndex((f) => f.id === formationWithTimestamp.id);
    if (existingIndex >= 0) {
      formations[existingIndex] = formationWithTimestamp;
    } else {
      formations.push(formationWithTimestamp);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formations));
  } catch (error) {
    console.error('Failed to save formation:', error);
  }
}

/**
 * Get all saved formations from local storage
 */
export function getSavedFormations(): Formation[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load formations:', error);
    return [];
  }
}

/**
 * Delete a saved formation
 */
export function deleteFormation(formationId: string): void {
  try {
    const formations = getSavedFormations();
    const filtered = formations.filter((f) => f.id !== formationId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete formation:', error);
  }
}

/**
 * Auto-save current formation
 */
export function autoSaveCurrentFormation(formation: Formation): void {
  try {
    localStorage.setItem(CURRENT_FORMATION_KEY, JSON.stringify(formation));
  } catch (error) {
    console.error('Failed to auto-save formation:', error);
  }
}

/**
 * Load auto-saved formation
 */
export function loadCurrentFormation(): Formation | null {
  try {
    const data = localStorage.getItem(CURRENT_FORMATION_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load current formation:', error);
    return null;
  }
}

