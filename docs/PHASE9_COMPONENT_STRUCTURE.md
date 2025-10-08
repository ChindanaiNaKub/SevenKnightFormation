# Character Selection Modal - Component Structure

## 🏗️ Architecture

```
App.vue (Main Controller)
├── Manages modal state
├── Handles character/pet selection
└── Coordinates with formation state

CharacterSelectionModal.vue
├── Character list display
├── Class filtering tabs
├── Selection handling
└── Visual indicators

PetSelectionModal.vue
├── Pet list display
├── Selection handling
└── Visual indicators
```

## 📦 Component Details

### CharacterSelectionModal.vue

#### Props
```typescript
interface Props {
  characters: Character[];        // All available characters
  placedCharacters: Character[];  // Currently in formation
  targetPosition: CharacterPosition; // 1-5
}
```

#### Events
```typescript
emit('close')              // User closes modal
emit('select', character)  // User selects a character
```

#### State
```typescript
const activeTab = ref('all');  // Current filter tab
const tabs = [                  // Tab configuration
  { id: 'all', label: 'All' },
  { id: 'attack', label: 'Attack', filter: ... },
  { id: 'magic', label: 'Magic', filter: ... },
  // ... more tabs
];
```

#### Computed
```typescript
const filteredCharacters = computed(() => {
  // Apply active tab filter
  // Returns filtered character list
});
```

#### Methods
```typescript
isCharacterPlaced(character)      // Check if already in formation
handleSelectCharacter(character)  // Handle click
handleOverlayClick()              // Close on overlay click
getClassIcon(class)               // Get icon path
getStarCount(rank)                // Parse star rank
handleImageError(event)           // Fallback placeholder
```

### PetSelectionModal.vue

#### Props
```typescript
interface Props {
  pets: Pet[];           // All available pets
  placedPet: Pet | null; // Currently placed pet
}
```

#### Events
```typescript
emit('close')        // User closes modal
emit('select', pet)  // User selects a pet
```

#### Methods
```typescript
isPetPlaced(pet)           // Check if already placed
handleSelectPet(pet)       // Handle click
handleOverlayClick()       // Close on overlay click
handleImageError(event)    // Fallback placeholder
```

## 🔄 Data Flow

### Opening Character Modal

```
User clicks empty slot (position 3)
         ↓
App.vue: handleCharacterSlotClick(3)
         ↓
Check: Is selection mode active?
         ↓ No
openCharacterModal(3)
         ↓
showCharacterModal = true
modalTargetPosition = 3
         ↓
Modal renders with:
  - All characters
  - Placed characters
  - Target position = 3
```

### Selecting a Character

```
User clicks character in modal
         ↓
CharacterSelectionModal: handleSelectCharacter(leo)
         ↓
Check: Is character already placed?
         ↓ No
emit('select', leo)
         ↓
App.vue: handleModalCharacterSelect(leo)
         ↓
addCharacter(leo, modalTargetPosition)
         ↓
closeCharacterModal()
         ↓
Formation updated, modal closes
```

### Closing Modal

```
User clicks X or overlay
         ↓
CharacterSelectionModal: emit('close')
         ↓
App.vue: closeCharacterModal()
         ↓
showCharacterModal = false
```

## 🎨 Styling Structure

### Modal Layout
```
.modal-overlay (Fixed, full-screen)
  └── .modal-container (Centered, max-width)
        ├── .modal-header
        │     ├── .modal-title
        │     │     └── .position-badge
        │     └── .close-button
        ├── .modal-tabs
        │     └── .tab-button (x6)
        └── .character-list (Scrollable)
              ├── .character-item
              │     ├── .character-portrait
              │     │     ├── img
              │     │     └── .placed-overlay
              │     ├── .character-details
              │     │     ├── .character-name
              │     │     └── .character-meta
              │     │           ├── .character-class
              │     │           └── .character-rarity
              │     └── .character-stats
              │           ├── .class-icon
              │           └── .stars
              ├── .character-item
              └── ...
```

### Key CSS Features

#### Dark Theme Gradient
```css
background: linear-gradient(135deg, #1a1f2e 0%, #252b3d 100%);
```

#### Overlay with Blur
```css
background: rgba(0, 0, 0, 0.85);
backdrop-filter: blur(4px);
```

#### Smooth Transitions
```css
transition: all 0.2s ease;
```

#### Hover Effects
```css
.character-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(4px);
}
```

#### Disabled State
```css
.character-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

## 🔧 Integration Points

### App.vue Changes

#### Added Imports
```typescript
import CharacterSelectionModal from './components/ui/CharacterSelectionModal.vue';
import PetSelectionModal from './components/ui/PetSelectionModal.vue';
import { computed } from 'vue';
```

#### Added State
```typescript
const showCharacterModal = ref(false);
const showPetModal = ref(false);
const modalTargetPosition = ref<CharacterPosition>(1);
const placedCharacters = computed(() => { ... });
```

#### Added Functions
```typescript
openCharacterModal(position)
closeCharacterModal()
openPetModal()
closePetModal()
handleModalCharacterSelect(character)
handleModalPetSelect(pet)
```

#### Modified Functions
```typescript
handleCharacterSlotClick(position)
  - Added modal logic for empty slots
  - Preserved click-to-place for selection mode

handlePetSlotClick()
  - Added modal logic for empty slot
  - Preserved click-to-place for selection mode
```

## 🧪 Testing Scenarios

### Character Modal Tests
```
✓ Click empty slot → Modal opens
✓ Modal shows correct position badge
✓ All characters displayed
✓ Class tabs filter correctly
✓ Placed characters show checkmark
✓ Placed characters are disabled
✓ Click character → Placed correctly
✓ Modal closes after selection
✓ X button closes modal
✓ Overlay click closes modal
✓ Character appears in formation
```

### Pet Modal Tests
```
✓ Click empty pet slot → Modal opens
✓ All pets displayed
✓ Placed pet shows checkmark
✓ Placed pet is disabled
✓ Click pet → Placed correctly
✓ Modal closes after selection
✓ X button closes modal
✓ Overlay click closes modal
✓ Pet appears in formation
```

### Integration Tests
```
✓ Modal doesn't interfere with drag-and-drop
✓ Modal doesn't interfere with click-to-place
✓ Can use all three methods interchangeably
✓ Filled slots don't open modal
✓ No TypeScript errors
✓ Responsive on all screen sizes
```

## 📊 Performance Considerations

### Optimizations
- ✅ Teleport to body (prevents z-index issues)
- ✅ Computed for filtered characters (cached)
- ✅ v-if for conditional rendering (not in DOM when closed)
- ✅ Scoped styles (no global pollution)
- ✅ Efficient event handling

### Potential Improvements
- [ ] Virtual scrolling for 100+ characters
- [ ] Lazy load images
- [ ] Debounce search input (if added)
- [ ] Memoize complex computations

## 🎯 Success Metrics

### UX Improvements
- Fewer clicks to place character (3 vs 5+)
- Clearer user intent
- Better mobile experience
- Familiar interaction pattern

### Code Quality
- Type-safe with TypeScript
- Reusable components
- Clean separation of concerns
- Consistent with existing patterns

### Maintainability
- Well-documented
- Easy to extend (add search, sort, etc.)
- Self-contained components
- Clear props/events interface
