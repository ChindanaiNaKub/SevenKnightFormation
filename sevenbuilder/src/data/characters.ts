import type { Character } from '../types';

/**
 * Character database
 * TODO: Add actual Seven Knights Rebirth characters with proper data
 */
export const characters: Character[] = [
  // Placeholder characters - will be replaced with actual game data
  {
    id: 'char_1',
    name: 'Shane',
    image: '/placeholder-character.png',
    level: 50,
    rarity: 6,
    class: 'warrior',
    enhancementLevel: 5,
  },
  {
    id: 'char_2',
    name: 'Rudy',
    image: '/placeholder-character.png',
    level: 50,
    rarity: 6,
    class: 'tank',
    enhancementLevel: 5,
  },
  {
    id: 'char_3',
    name: 'Rachel',
    image: '/placeholder-character.png',
    level: 50,
    rarity: 6,
    class: 'mage',
    enhancementLevel: 5,
  },
  {
    id: 'char_4',
    name: 'Espada',
    image: '/placeholder-character.png',
    level: 50,
    rarity: 5,
    class: 'assassin',
    enhancementLevel: 3,
  },
  {
    id: 'char_5',
    name: 'Lina',
    image: '/placeholder-character.png',
    level: 50,
    rarity: 5,
    class: 'support',
    enhancementLevel: 3,
  },
  {
    id: 'char_6',
    name: 'Aragon',
    image: '/placeholder-character.png',
    level: 48,
    rarity: 4,
    class: 'ranger',
    enhancementLevel: 2,
  },
];

/**
 * Get character by ID
 */
export function getCharacterById(id: string): Character | undefined {
  return characters.find((char) => char.id === id);
}

/**
 * Get all characters
 */
export function getAllCharacters(): Character[] {
  return characters;
}

