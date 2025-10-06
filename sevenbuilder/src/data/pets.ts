import type { Pet } from '../types';

/**
 * Pet database
 * TODO: Add actual Seven Knights Rebirth pets with proper data
 */
export const pets: Pet[] = [
  // Placeholder pets - will be replaced with actual game data
  {
    id: 'pet_1',
    name: 'Mini Shane',
    image: '/placeholder-pet.png',
    level: 30,
    rarity: 5,
    abilities: ['ATK Boost', 'Crit Damage'],
  },
  {
    id: 'pet_2',
    name: 'Mini Rudy',
    image: '/placeholder-pet.png',
    level: 30,
    rarity: 5,
    abilities: ['DEF Boost', 'HP Regen'],
  },
  {
    id: 'pet_3',
    name: 'Mini Rachel',
    image: '/placeholder-pet.png',
    level: 25,
    rarity: 4,
    abilities: ['Magic Damage', 'MP Regen'],
  },
];

/**
 * Get pet by ID
 */
export function getPetById(id: string): Pet | undefined {
  return pets.find((pet) => pet.id === id);
}

/**
 * Get all pets
 */
export function getAllPets(): Pet[] {
  return pets;
}

