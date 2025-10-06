import type { FormationConfig, FormationType } from '../types';

/**
 * Formation type configurations
 * Defines which positions are front/back for each formation type
 */
export const formationConfigs: Record<FormationType, FormationConfig> = {
  basic: {
    type: 'basic',
    name: 'Basic Formation',
    level: 1,
    frontPositions: [1, 2], // Blue shields
    backPositions: [3, 4, 5], // Red cones
  },
  normal: {
    type: 'normal',
    name: 'Normal Formation',
    level: 1,
    frontPositions: [1, 2, 3], // Blue shields
    backPositions: [4, 5], // Red cones
  },
  attack: {
    type: 'attack',
    name: 'Attack Formation',
    level: 5,
    frontPositions: [1], // Blue shield
    backPositions: [2, 3, 4, 5], // Red cones
  },
  defense: {
    type: 'defense',
    name: 'Defense Formation',
    level: 1,
    frontPositions: [1, 2, 3, 4], // Blue shields
    backPositions: [5], // Red cone
  },
};

/**
 * Get formation configuration by type
 */
export function getFormationConfig(type: FormationType): FormationConfig {
  return formationConfigs[type];
}

