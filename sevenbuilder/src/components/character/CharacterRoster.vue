<template>
  <div class="character-roster">
    <div class="roster-header">
      <h2 class="roster-title">Roster</h2>
      
      <div class="roster-tabs">
        <button
          :class="['tab', { active: activeTab === 'characters' }]"
          @click="activeTab = 'characters'"
        >
          Characters ({{ characters.length }})
        </button>
        <button
          :class="['tab', { active: activeTab === 'pets' }]"
          @click="activeTab = 'pets'"
        >
          Pets ({{ pets.length }})
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

    <div class="roster-content">
      <!-- Characters Tab -->
      <div v-if="activeTab === 'characters'" class="roster-grid">
        <CharacterCard
          v-for="character in filteredCharacters"
          :key="character.id"
          :character="character"
          @select="$emit('selectCharacter', character)"
        />
        
        <div v-if="filteredCharacters.length === 0" class="empty-state">
          <p>No characters found</p>
        </div>
      </div>

      <!-- Pets Tab -->
      <div v-if="activeTab === 'pets'" class="roster-grid">
        <PetCard
          v-for="pet in filteredPets"
          :key="pet.id"
          :pet="pet"
          @select="$emit('selectPet', pet)"
        />
        
        <div v-if="filteredPets.length === 0" class="empty-state">
          <p>No pets found</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Character, Pet } from '../../types';
import CharacterCard from './CharacterCard.vue';
import PetCard from './PetCard.vue';

interface Props {
  characters: Character[];
  pets: Pet[];
}

const props = defineProps<Props>();

defineEmits<{
  selectCharacter: [character: Character];
  selectPet: [pet: Pet];
}>();

const activeTab = ref<'characters' | 'pets'>('characters');
const searchQuery = ref('');

const filteredCharacters = computed(() => {
  if (!searchQuery.value) return props.characters;
  
  const query = searchQuery.value.toLowerCase();
  return props.characters.filter(char =>
    char.name.toLowerCase().includes(query) ||
    char.class.toLowerCase().includes(query) ||
    char.rarity.toLowerCase().includes(query)
  );
});

const filteredPets = computed(() => {
  if (!searchQuery.value) return props.pets;
  
  const query = searchQuery.value.toLowerCase();
  return props.pets.filter(pet =>
    pet.name.toLowerCase().includes(query) ||
    pet.rarity.toLowerCase().includes(query) ||
    pet.passiveSkill.toLowerCase().includes(query)
  );
});
</script>

<style scoped>
.character-roster {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  max-height: 500px;
}

.roster-header {
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
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
  min-width: 200px;
}

.search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.roster-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md) var(--spacing-lg);
}

.roster-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-sm);
}

.empty-state {
  grid-column: 1 / -1;
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-text-muted);
}

/* Responsive */
@media (max-width: 768px) {
  .roster-header {
    padding: var(--spacing-md);
  }

  .roster-title {
    width: 100%;
    order: -1;
  }

  .roster-tabs {
    flex: 1;
  }

  .roster-search {
    flex: 1;
    margin-left: 0;
  }

  .search-input {
    width: 100%;
    min-width: 0;
  }

  .roster-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .roster-header {
    gap: var(--spacing-sm);
  }

  .tab {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-xs);
  }
}
</style>

