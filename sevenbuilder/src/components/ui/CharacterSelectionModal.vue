<template>
  <Teleport to="body">
    <div class="modal-overlay" @click="handleOverlayClick">
      <div class="modal-container" @click.stop>
        <!-- Header -->
        <div class="modal-header">
          <h2 class="modal-title">
            Select Character
            <span class="position-badge">Position {{ targetPosition }}</span>
          </h2>
          <button class="close-button" @click="$emit('close')" title="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Tabs -->
        <div class="modal-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['tab-button', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Search Bar -->
        <div class="search-bar">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search characters..."
            class="search-input"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="clear-search"
            title="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Character List -->
        <div class="character-list">
          <div
            v-for="character in filteredCharacters"
            :key="character.id"
            :class="['character-item', { 
              'is-placed': isCharacterPlaced(character),
              'is-disabled': isCharacterPlaced(character)
            }]"
            @click="handleSelectCharacter(character)"
          >
            <!-- Character Portrait -->
            <div class="character-portrait">
              <img
                :src="character.image"
                :alt="character.name"
                @error="handleImageError"
              />
              <div v-if="isCharacterPlaced(character)" class="placed-overlay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>

            <!-- Character Info -->
            <div class="character-details">
              <div class="character-name">{{ character.name }}</div>
              <div class="character-meta">
                <span class="character-class">{{ character.class }}</span>
                <span class="character-rarity">{{ character.rarity }}</span>
              </div>
            </div>

            <!-- Character Stats/Icons -->
            <div class="character-stats">
              <img
                :src="getClassIcon(character.class)"
                :alt="character.class"
                class="class-icon"
              />
              <div class="stars">
                <span v-for="n in getStarCount(character.maxStarRank)" :key="n" class="star">★</span>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredCharacters.length === 0" class="empty-state">
            <p>No characters available</p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Character, CharacterPosition, CharacterClass } from '../../types';

interface Props {
  characters: Character[];
  placedCharacters: Character[];
  targetPosition: CharacterPosition;
}

interface Tab {
  id: string;
  label: string;
  filter?: (character: Character) => boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
  select: [character: Character];
}>();

// Active tab
const activeTab = ref('all');

// Search query
const searchQuery = ref('');

// Tab configuration
const tabs: Tab[] = [
  { id: 'all', label: 'All' },
  { id: 'attack', label: 'Attack', filter: (c) => c.class === 'Attack' },
  { id: 'magic', label: 'Magic', filter: (c) => c.class === 'Magic' },
  { id: 'defence', label: 'Defence', filter: (c) => c.class === 'Defence' },
  { id: 'support', label: 'Support', filter: (c) => c.class === 'Support' },
  { id: 'universal', label: 'Universal', filter: (c) => c.class === 'Universal' },
];

// Filtered characters based on active tab and search
const filteredCharacters = computed(() => {
  let filtered = props.characters;
  
  // Apply tab filter
  const activeTabConfig = tabs.find(tab => tab.id === activeTab.value);
  if (activeTabConfig && activeTabConfig.filter) {
    filtered = filtered.filter(activeTabConfig.filter);
  }
  
  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter(character => 
      character.name.toLowerCase().includes(query) ||
      character.class.toLowerCase().includes(query) ||
      character.rarity.toLowerCase().includes(query)
    );
  }
  
  return filtered;
});

// Check if character is already placed
function isCharacterPlaced(character: Character): boolean {
  return props.placedCharacters.some(c => c.id === character.id);
}

// Handle character selection
function handleSelectCharacter(character: Character) {
  if (isCharacterPlaced(character)) {
    return; // Don't allow selecting already placed characters
  }
  
  emit('select', character);
}

// Handle overlay click to close modal
function handleOverlayClick() {
  emit('close');
}

// Get class icon path
function getClassIcon(characterClass: CharacterClass): string {
  const iconMap: Record<CharacterClass, string> = {
    'Attack': '/icons/class-attack.svg',
    'Magic': '/icons/class-magic.svg',
    'Defence': '/icons/class-defence.svg',
    'Support': '/icons/class-support.svg',
    'Universal': '/icons/class-universal.svg',
  };
  return iconMap[characterClass] || '/icons/class-universal.svg';
}

// Get star count from star rank
function getStarCount(starRank: string): number {
  return parseInt(starRank.charAt(0)) || 3;
}

// Handle image error
function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = '/placeholder-character.svg';
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: linear-gradient(135deg, #1a1f2e 0%, #252b3d 100%);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

/* Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.position-badge {
  font-size: 0.875rem;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
}

.close-button {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* Tabs */
.modal-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  overflow-y: visible;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
  flex-wrap: nowrap;
  width: 100%;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  flex-shrink: 0;
  min-height: 60px;
}

.modal-tabs::-webkit-scrollbar {
  height: 6px;
}

.modal-tabs::-webkit-scrollbar-track {
  background: transparent;
}

.modal-tabs::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.modal-tabs::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.tab-button {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: fit-content;
  display: inline-block;
  box-sizing: border-box;
  line-height: 1.5;
}

.tab-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.3);
}

.tab-button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: white;
}

/* Search Bar */
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
  position: relative;
}

.search-icon {
  color: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
  position: absolute;
  left: 2rem;
  pointer-events: none;
}

.search-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.625rem 2.5rem 0.625rem 2.5rem;
  color: #fff;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.search-input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.clear-search {
  position: absolute;
  right: 2rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.clear-search:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* Character List */
.character-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.character-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.character-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateX(4px);
}

.character-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.character-item.is-placed {
  background: rgba(52, 211, 153, 0.1);
  border-color: rgba(52, 211, 153, 0.3);
}

/* Character Portrait */
.character-portrait {
  position: relative;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
}

.character-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placed-overlay {
  position: absolute;
  inset: 0;
  background: rgba(52, 211, 153, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/* Character Details */
.character-details {
  flex: 1;
  min-width: 0;
}

.character-name {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.character-meta {
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.character-class,
.character-rarity {
  padding: 0.125rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

/* Character Stats */
.character-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.class-icon {
  width: 24px;
  height: 24px;
  opacity: 0.8;
}

.stars {
  color: #fbbf24;
  font-size: 0.75rem;
  letter-spacing: -2px;
}

.star {
  display: inline-block;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Scrollbar Styling */
.character-list::-webkit-scrollbar {
  width: 8px;
}

.character-list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.character-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.character-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Responsive */
@media (max-width: 640px) {
  .modal-container {
    max-height: 90vh;
    border-radius: 12px 12px 0 0;
  }

  .modal-title {
    font-size: 1.25rem;
  }

  .character-portrait {
    width: 50px;
    height: 50px;
  }

  .modal-tabs {
    padding: 0.75rem 1rem;
    gap: 0.375rem;
  }

  .tab-button {
    padding: 0.5rem 0.875rem;
    font-size: 0.8125rem;
    min-width: auto;
  }

  .search-bar {
    padding: 0.75rem 1rem;
  }

  .search-icon {
    left: 1.5rem;
  }

  .clear-search {
    right: 1.5rem;
  }
}

@media (max-width: 480px) {
  .modal-tabs {
    padding: 0.625rem 0.75rem;
  }

  .tab-button {
    padding: 0.4rem 0.75rem;
    font-size: 0.75rem;
  }

  .search-bar {
    padding: 0.625rem 0.75rem;
  }

  .search-input {
    font-size: 0.8125rem;
    padding: 0.5rem 2.25rem 0.5rem 2.25rem;
  }

  .search-icon {
    left: 1.25rem;
    width: 18px;
    height: 18px;
  }

  .clear-search {
    right: 1.25rem;
  }
}
</style>
