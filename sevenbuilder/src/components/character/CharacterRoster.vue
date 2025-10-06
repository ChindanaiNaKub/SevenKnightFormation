<template>
  <div class="character-roster">
    <div class="roster-header">
      <h2 class="roster-title">Roster</h2>
      
      <div class="roster-tabs">
        <button
          :class="['tab', { active: activeTab === 'characters' }]"
          @click="activeTab = 'characters'"
        >
          Characters ({{ filteredCharacters.length }}/{{ characters.length }})
        </button>
        <button
          :class="['tab', { active: activeTab === 'pets' }]"
          @click="activeTab = 'pets'"
        >
          Pets ({{ filteredPets.length }}/{{ pets.length }})
        </button>
      </div>

      <div class="roster-search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="search-input"
        />
      </div>
    </div>

    <div class="roster-controls">
      <!-- Character-specific filters -->
      <div v-if="activeTab === 'characters'" class="controls-row">
        <div class="control-group">
          <label class="control-label">Sort By:</label>
          <select v-model="sortBy" class="control-select">
            <option value="name">Name</option>
            <option value="rarity">Rarity</option>
            <option value="class">Class</option>
            <option value="level">Level</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">Rarity:</label>
          <select v-model="rarityFilter" class="control-select">
            <option value="all">All</option>
            <option value="Legendary (SP)">Legendary (SP)</option>
            <option value="Legendary">Legendary</option>
            <option value="Rare">Rare</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Common">Common</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">Class:</label>
          <select v-model="classFilter" class="control-select">
            <option value="all">All</option>
            <option value="Attack">Attack</option>
            <option value="Magic">Magic</option>
            <option value="Defence">Defence</option>
            <option value="Support">Support</option>
            <option value="Universal">Universal</option>
          </select>
        </div>

        <button @click="clearFilters" class="clear-button" title="Clear filters">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Pet-specific filters -->
      <div v-else class="controls-row">
        <div class="control-group">
          <label class="control-label">Sort By:</label>
          <select v-model="petSortBy" class="control-select">
            <option value="name">Name</option>
            <option value="rarity">Rarity</option>
            <option value="level">Level</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">Rarity:</label>
          <select v-model="petRarityFilter" class="control-select">
            <option value="all">All</option>
            <option value="Legendary">Legendary</option>
            <option value="Rare">Rare</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Common">Common</option>
          </select>
        </div>

        <button @click="clearPetFilters" class="clear-button" title="Clear filters">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="roster-content">
      <!-- Characters Tab -->
      <div v-if="activeTab === 'characters'" class="roster-grid">
        <CharacterCard
          v-for="character in sortedAndFilteredCharacters"
          :key="character.id"
          :character="character"
          :is-in-formation="isCharacterInFormation(character.id)"
          :is-selected="selectedItemType === 'character' && selectedItem?.id === character.id"
          @select="$emit('selectCharacter', character)"
          @drag-start="$emit('characterDragStart', character)"
        />
        
        <div v-if="sortedAndFilteredCharacters.length === 0" class="empty-state">
          <p>No characters found</p>
        </div>
      </div>

      <!-- Pets Tab -->
      <div v-if="activeTab === 'pets'" class="roster-grid">
        <PetCard
          v-for="pet in sortedAndFilteredPets"
          :key="pet.id"
          :pet="pet"
          :is-in-formation="isPetInFormation(pet.id)"
          :is-selected="selectedItemType === 'pet' && selectedItem?.id === pet.id"
          @select="$emit('selectPet', pet)"
          @drag-start="$emit('petDragStart', pet)"
        />
        
        <div v-if="sortedAndFilteredPets.length === 0" class="empty-state">
          <p>No pets found</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Character, Pet, CharacterSlot, PetSlot } from '../../types';
import CharacterCard from './CharacterCard.vue';
import PetCard from './PetCard.vue';

interface Props {
  characters: Character[];
  pets: Pet[];
  characterSlots?: CharacterSlot[];
  petSlot?: PetSlot;
  selectedItem?: Character | Pet | null;
  selectedItemType?: 'character' | 'pet' | null;
}

const props = withDefaults(defineProps<Props>(), {
  characterSlots: () => [],
  petSlot: () => ({ pet: null }),
});

defineEmits<{
  selectCharacter: [character: Character];
  selectPet: [pet: Pet];
  characterDragStart: [character: Character];
  petDragStart: [pet: Pet];
}>();

// State
const activeTab = ref<'characters' | 'pets'>('characters');
const searchQuery = ref('');
const sortBy = ref<'name' | 'rarity' | 'class' | 'level'>('name');
const petSortBy = ref<'name' | 'rarity' | 'level'>('name');
const rarityFilter = ref<string>('all');
const classFilter = ref<string>('all');
const petRarityFilter = ref<string>('all');

// Helper functions
const rarityOrder: Record<string, number> = {
  'Legendary (SP)': 5,
  'Legendary': 4,
  'Rare': 3,
  'Uncommon': 2,
  'Common': 1,
};

function isCharacterInFormation(characterId: string): boolean {
  return props.characterSlots.some(slot => slot.character?.id === characterId);
}

function isPetInFormation(petId: string): boolean {
  return props.petSlot.pet?.id === petId;
}

// Search and filter characters
const filteredCharacters = computed(() => {
  let result = props.characters;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(char =>
      char.name.toLowerCase().includes(query) ||
      char.class.toLowerCase().includes(query) ||
      char.rarity.toLowerCase().includes(query)
    );
  }

  // Rarity filter
  if (rarityFilter.value !== 'all') {
    result = result.filter(char => char.rarity === rarityFilter.value);
  }

  // Class filter
  if (classFilter.value !== 'all') {
    result = result.filter(char => char.class === classFilter.value);
  }

  return result;
});

// Sort characters
const sortedAndFilteredCharacters = computed(() => {
  const result = [...filteredCharacters.value];

  switch (sortBy.value) {
    case 'name':
      return result.sort((a, b) => a.name.localeCompare(b.name));
    case 'rarity':
      return result.sort((a, b) => (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0));
    case 'class':
      return result.sort((a, b) => a.class.localeCompare(b.class));
    case 'level':
      return result.sort((a, b) => b.level - a.level);
    default:
      return result;
  }
});

// Search and filter pets
const filteredPets = computed(() => {
  let result = props.pets;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(pet =>
      pet.name.toLowerCase().includes(query) ||
      pet.rarity.toLowerCase().includes(query) ||
      pet.passiveSkill.toLowerCase().includes(query)
    );
  }

  // Rarity filter
  if (petRarityFilter.value !== 'all') {
    result = result.filter(pet => pet.rarity === petRarityFilter.value);
  }

  return result;
});

// Sort pets
const sortedAndFilteredPets = computed(() => {
  const result = [...filteredPets.value];

  switch (petSortBy.value) {
    case 'name':
      return result.sort((a, b) => a.name.localeCompare(b.name));
    case 'rarity':
      return result.sort((a, b) => (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0));
    case 'level':
      return result.sort((a, b) => b.level - a.level);
    default:
      return result;
  }
});

// Clear filters
function clearFilters() {
  sortBy.value = 'name';
  rarityFilter.value = 'all';
  classFilter.value = 'all';
  searchQuery.value = '';
}

function clearPetFilters() {
  petSortBy.value = 'name';
  petRarityFilter.value = 'all';
  searchQuery.value = '';
}
</script>

<style scoped>
.character-roster {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.roster-header {
  padding: var(--spacing-md);
  border-bottom: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  flex-shrink: 0;
}

.roster-title {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--color-text-primary);
}

.roster-tabs {
  display: flex;
  gap: var(--spacing-xs);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  padding: 0.25rem;
}

.tab {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-sm);
  font-weight: 600;
  background: transparent;
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.tab:hover {
  color: var(--color-text-primary);
}

.tab.active {
  background: var(--color-primary);
  color: var(--color-text-primary);
}

.roster-search {
  margin-left: auto;
}

.search-input {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-size: var(--font-sm);
  outline: none;
  transition: all var(--transition-normal);
  width: 180px;
}

.search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

/* Controls Section */
.roster-controls {
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-tertiary);
  flex-shrink: 0;
}

.controls-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.control-label {
  font-size: var(--font-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.control-select {
  padding: 0.375rem var(--spacing-sm);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-primary);
  font-size: var(--font-xs);
  outline: none;
  transition: all var(--transition-fast);
  cursor: pointer;
  min-width: 100px;
}

.control-select:hover {
  border-color: var(--color-primary);
}

.control-select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.1);
}

.clear-button {
  padding: 0.375rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

.clear-button:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.roster-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: var(--spacing-md);
  min-height: 0;
}

.roster-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-sm);
  padding-bottom: var(--spacing-md);
}

.empty-state {
  grid-column: 1 / -1;
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-text-muted);
}

/* Responsive */
@media (min-width: 1025px) {
  /* Sidebar layout - keep single column */
  .roster-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1024px) {
  /* Full width on mobile/tablet - can use multiple columns */
  .roster-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .roster-title {
    width: 100%;
    order: -1;
  }

  .roster-search {
    flex: 1;
    margin-left: 0;
  }

  .search-input {
    width: 100%;
    min-width: 0;
  }
}

@media (max-width: 768px) {
  .roster-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  .controls-row {
    gap: var(--spacing-sm);
  }
}

@media (max-width: 480px) {
  .roster-header {
    gap: var(--spacing-sm);
  }

  .tab {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.625rem;
  }

  .control-group {
    flex: 1 1 auto;
  }

  .control-select {
    min-width: 80px;
  }

  .roster-grid {
    grid-template-columns: 1fr;
  }
}
</style>

