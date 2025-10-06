import type { Formation, FormationShareData } from '../types';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

/**
 * Encode formation to URL-safe string
 */
export function encodeFormation(formation: Formation): string {
  const shareData: FormationShareData = {
    formationType: formation.formationType,
    characters: formation.characterSlots
      .filter((slot) => slot.character !== null)
      .map((slot) => ({
        position: slot.position,
        characterId: slot.character!.id,
      })),
    petId: formation.petSlot.pet?.id,
  };

  const json = JSON.stringify(shareData);
  // Compress to URI-safe string for shorter links
  return compressToEncodedURIComponent(json);
}

/**
 * Decode formation from URL-safe string
 */
export function decodeFormation(encoded: string): FormationShareData | null {
  try {
    const json = decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return JSON.parse(json);
  } catch (error) {
    console.error('Failed to decode formation:', error);
    return null;
  }
}

/**
 * Generate shareable URL
 */
export function generateShareUrl(formation: Formation): string {
  const encoded = encodeFormation(formation);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?formation=${encoded}`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Get formation from URL parameters
 */
export function getFormationFromUrl(): FormationShareData | null {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('formation');
  if (!encoded) return null;
  return decodeFormation(encoded);
}

