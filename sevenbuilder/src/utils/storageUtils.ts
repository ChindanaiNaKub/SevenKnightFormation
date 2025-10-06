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
    const parsed: any[] = JSON.parse(data);
    return parsed.map((f) => deserializeFormation(f));
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.map(serializeFormation)));
  } catch (error) {
    console.error('Failed to delete formation:', error);
  }
}

/**
 * Auto-save current formation
 */
export function autoSaveCurrentFormation(formation: Formation): void {
  try {
    localStorage.setItem(CURRENT_FORMATION_KEY, JSON.stringify(serializeFormation(formation)));
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
    return deserializeFormation(JSON.parse(data));
  } catch (error) {
    console.error('Failed to load current formation:', error);
    return null;
  }
}

/**
 * Get a single saved formation by id
 */
export function getFormationById(formationId: string): Formation | null {
  const formations = getSavedFormations();
  return formations.find((f) => f.id === formationId) || null;
}

/**
 * Save formation with a specific name (create or update)
 */
export function saveFormationWithName(formation: Formation, name: string): Formation {
  const toSave: Formation = { ...formation, name };
  saveFormation(toSave);
  const saved = getSavedFormations().find((f) => f.id === toSave.id) ||
    getSavedFormations().find((f) => f.name === name && f.updatedAt && toSave.updatedAt && f.updatedAt >= toSave.updatedAt);
  return saved || toSave;
}

/**
 * Rename a saved formation
 */
export function renameFormation(formationId: string, newName: string): void {
  const formations = getSavedFormations();
  const idx = formations.findIndex((f) => f.id === formationId);
  if (idx === -1) return;
  const existing = formations[idx]!;
  existing.name = newName;
  existing.updatedAt = new Date();
  formations[idx] = existing;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formations.map(serializeFormation)));
}

/**
 * Duplicate a saved formation
 */
export function duplicateFormation(formationId: string): Formation | null {
  const existing = getFormationById(formationId);
  if (!existing) return null;
  const copy: Formation = {
    ...existing,
    id: crypto.randomUUID(),
    name: existing.name ? `${existing.name} (Copy)` : 'Untitled (Copy)',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const all = getSavedFormations();
  all.push(copy);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all.map(serializeFormation)));
  return copy;
}

/**
 * Export a single formation to JSON string
 */
export function exportFormationJson(formationId: string): string | null {
  const formation = getFormationById(formationId);
  if (!formation) return null;
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    formation: serializeFormation(formation),
  };
  return JSON.stringify(payload, null, 2);
}

/**
 * Import a formation from JSON string
 */
export function importFormationJson(json: string): Formation | null {
  try {
    const parsed = JSON.parse(json);
    const raw = parsed.formation ?? parsed;
    const formation = deserializeFormation(raw);
    // Ensure new id on import
    formation.id = crypto.randomUUID();
    formation.createdAt = new Date();
    formation.updatedAt = new Date();
    const all = getSavedFormations();
    all.push(formation);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all.map(serializeFormation)));
    return formation;
  } catch (e) {
    console.error('Failed to import formation JSON:', e);
    return null;
  }
}

/**
 * Serialization helpers to preserve Date types
 */
export function serializeFormation(formation: Formation): any {
  return {
    ...formation,
    createdAt: formation.createdAt ? new Date(formation.createdAt).toISOString() : undefined,
    updatedAt: formation.updatedAt ? new Date(formation.updatedAt).toISOString() : undefined,
  };
}

export function deserializeFormation(raw: any): Formation {
  const normalized: Formation = {
    ...raw,
    formationType: raw.formationType,
    characterSlots: raw.characterSlots,
    petSlot: raw.petSlot,
    createdAt: raw.createdAt ? new Date(raw.createdAt) : undefined,
    updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : undefined,
  };
  return normalized;
}

