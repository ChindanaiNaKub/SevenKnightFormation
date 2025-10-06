/**
 * Seven Knights Rebirth Formation Builder - Type Definitions
 */

// Character rarity levels
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Legendary (SP)';

// Character classes/types (icons shown in game)
export type CharacterClass = 'Attack' | 'Magic' | 'Defence' | 'Support' | 'Universal';

// Max Star Rank (awakening level)
export type StarRank = '3★' | '4★' | '5★' | '6★';

// Attack Type
export type AttackType = 'Physical' | 'Magic';

// AoE/Target info
export type TargetType = 'All' | '4' | '3' | '2' | 'Single' | 'Normal Attack';

// Enhancement levels (for items/equipment)
export type EnhancementLevel = 0 | 1 | 2 | 3 | 4 | 5;

// Formation position (1-5 for characters)
export type CharacterPosition = 1 | 2 | 3 | 4 | 5;

// Position type (front or back)
export type PositionType = 'front' | 'back';

// Formation types
export type FormationType = 'basic' | 'normal' | 'attack' | 'defense';

/**
 * Character interface
 */
export interface Character {
  id: string;
  name: string;
  image: string; // URL or path to character portrait
  level: number;
  rarity: Rarity;
  class: CharacterClass;
  maxStarRank: StarRank;
  attackType: AttackType;
  targetType: TargetType;
  enhancementLevel?: EnhancementLevel; // Optional for equipment
}

/**
 * Pet interface
 */
export interface Pet {
  id: string;
  name: string;
  image: string; // URL or path to pet image
  level: number;
  rarity: Rarity;
  passiveSkill: string; // Pet passive skill name
  effect: string; // Pet passive skill effect description
}

/**
 * Formation slot for a character
 */
export interface CharacterSlot {
  position: CharacterPosition;
  character: Character | null;
  positionType: PositionType; // Determined by formation type
}

/**
 * Pet slot
 */
export interface PetSlot {
  pet: Pet | null;
}

/**
 * Formation type configuration
 */
export interface FormationConfig {
  type: FormationType;
  name: string;
  level: number;
  frontPositions: CharacterPosition[]; // Positions with blue shields
  backPositions: CharacterPosition[]; // Positions with red cones
  icon?: string; // Optional icon/thumbnail for formation type
}

/**
 * Complete formation (team setup)
 */
export interface Formation {
  id?: string; // Optional for saved formations
  name?: string; // User-defined name for the formation
  formationType: FormationType;
  characterSlots: CharacterSlot[];
  petSlot: PetSlot;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: string[]; // Optional tags (PvP, PvE, Boss, etc.)
  notes?: string; // Optional description
}

/**
 * Formation share data (for URL encoding)
 */
export interface FormationShareData {
  formationType: FormationType;
  characters: Array<{
    position: CharacterPosition;
    characterId: string;
  }>;
  petId?: string;
}

