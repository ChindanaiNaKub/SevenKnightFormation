# Seven Knights Rebirth Formation Builder - TODO List

## Phase 1: Project Setup & Planning
- [X] Analyze game formation structure from reference images
  - [X] Formation layout: 5 character slots + 1 pet slot (right side)
  - [X] Single formation only (not multiple teams)
  - [X] Document character data requirements (name, image, level, rarity, class icon, enhancement level)
- [X] Choose tech stack (Vue.js + Bun + TS)
- [X] Set up project structure and initialize repository
- [X] Create basic folder structure (components, assets, styles, utils)
- [X] Set up package manager and install dependencies

## Phase 2: Data & Assets
- [x] Create character database/JSON file
  - [x] **Data Source**: https://gamewith.net/sevenknights-rebirth/70396
  - [x] Extract character names from GameWith character list
  - [x] Download character images/avatars (portrait style) from character pages
  - [x] Character classes/types (icons: Attack, Magic, Defence, Support, Universal)
  - [x] Rarity levels (Legendary (SP), Legendary, Rare, Uncommon, Common)
  - [x] Max Star Rank (6★, 5★, 4★, 3★)
  - [x] Attack Type (Physical, Magic)
  - [x] AoE/Target info (All, 4, 3, 2, Single, Normal Attack)
- [x] Create pet database/JSON file
  - [x] **Data Source**: https://gamewith.net/sevenknights-rebirth/70753
  - [x] Extract pet names from GameWith pet list
  - [x] Download pet images from pet pages
  - [x] Pet passive skills and effects
- [x] Prepare placeholder images for empty character/pet slots
- [x] Design/gather UI icons (reset, share, save, remove, etc.)
- [ ] Create formation background/styling assets

## Phase 3: Core UI Layout
- [x] Design and implement main page layout
  - [x] Header with title and controls
  - [x] Formation display area (5 characters + 1 pet slot on right)
  - [x] Character roster panel/section at bottom
  - [x] Action buttons (reset, share, save, etc.)
- [x] Create responsive design for mobile/tablet/desktop
- [x] Implement dark/purple theme matching game aesthetic
- [x] Add loading states and animations

## Phase 4: Formation Type Selection
- [ ] Create formation type selector UI
  - [ ] 4 formation type cards (Basic, Normal, Attack, Defense)
  - [ ] Display formation icons/thumbnails
  - [ ] Show formation level (Lv.1, Lv.5, etc.)
  - [ ] Highlight selected formation type
  - [ ] Formation type descriptions
- [ ] Implement formation type data structure
  - [ ] Basic: 2 front (pos 1,2), 3 back (pos 3,4,5)
  - [ ] Normal: 3 front (pos 1,2,3), 2 back (pos 4,5)
  - [ ] Attack: 1 front (pos 1), 4 back (pos 2,3,4,5)
  - [ ] Defense: 4 front (pos 1,2,3,4), 1 back (pos 5)
- [ ] Add formation type switching functionality
  - [ ] Change formation layout when type is selected
  - [ ] Preserve character assignments when switching
  - [ ] Validate character positions for new formation type

## Phase 5: Formation Layout Display
- [ ] Build formation display component
  - [ ] Create 5 character slot components (positioned based on formation type)
  - [ ] Create 1 pet slot component (positioned on right side)
  - [ ] Add visual indicators for empty/filled slots
  - [ ] Implement hover states
  - [ ] Add position numbering (1-5 for characters)
  - [ ] Style front positions (blue shields)
  - [ ] Style back positions (red cones)
- [ ] Create character card display
  - [ ] Character portrait/image
  - [ ] Level display (Lv. XX)
  - [ ] Enhancement display (+1 to +5)
  - [ ] Rarity stars (6-star system based on game)
  - [ ] Class icon badge
  - [ ] Remove button (X)
- [ ] Create pet card display with similar structure
- [ ] Add formation background styling
- [ ] Implement responsive positioning that adapts to formation type

## Phase 6: Character & Pet Selection System
- [ ] Build character roster UI (bottom panel)
  - [ ] Create character card components with portraits
  - [ ] Display character info (name, level, rarity, class)
  - [ ] Implement search/filter functionality
  - [ ] Add sorting options (name, rarity, class, level)
  - [ ] Add tabs to switch between Characters and Pets
- [ ] Create scrollable character list
- [ ] Create scrollable pet list
- [ ] Implement rarity visual differentiation (star colors/glow)
- [ ] Add character/pet availability indicators (if needed)

## Phase 7: Interaction & Functionality
- [ ] Implement drag-and-drop functionality
  - [ ] Drag character from roster to character slots (1-5)
  - [ ] Drag pet from roster to pet slot
  - [ ] Drag between character slots to reorder
  - [ ] Drag to remove (to trash/remove zone or outside formation)
  - [ ] Visual feedback during drag operations
- [ ] Alternative: Click-to-place functionality for mobile
  - [ ] Click character/pet to select
  - [ ] Click empty slot to place
  - [ ] Click filled slot to swap/remove
- [ ] Add character/pet removal functionality (X button)
- [ ] Implement undo/redo functionality
- [ ] Add formation validation
  - [ ] No duplicate characters
  - [ ] Max 5 characters + 1 pet
  - [ ] Prevent placing character in pet slot and vice versa

## Phase 8: Save & Load Features
- [ ] Implement local storage for formations
  - [ ] Auto-save current formation (including formation type)
  - [ ] Save multiple formations with names
  - [ ] Load saved formations with correct formation type
  - [ ] Save character positions, pet, and formation type together
- [ ] Create formation management UI
  - [ ] List saved formations with preview
  - [ ] Show formation type in saved formation list
  - [ ] Delete formations
  - [ ] Rename formations
  - [ ] Duplicate formations
- [ ] Add import/export functionality (JSON format)
  - [ ] Include formation type in export data

## Phase 9: Share Functionality
- [ ] Implement URL-based sharing
  - [ ] Encode formation data in URL parameters (characters, pet, formation type)
  - [ ] Generate shareable links
  - [ ] Load formation from URL on page load with correct formation type
  - [ ] Compress URL data for shorter links
- [ ] Add "Copy Link" button with clipboard API
- [ ] Create screenshot/export to image feature
  - [ ] Capture formation grid as PNG (including formation type indicator)
  - [ ] Download image functionality
  - [ ] Include formation name and type in exported image
  - [ ] Optional: Add watermark/branding
- [ ] Social media share buttons (optional)

## Phase 10: Additional Features
- [ ] Add formation templates/presets (popular team comps)
- [ ] Create formation statistics display
  - [ ] Team composition analysis
  - [ ] Rarity distribution
  - [ ] Class balance (tanks, DPS, support, etc.)
  - [ ] Total team power/level
- [ ] Add notes/description field for formations
- [ ] Add formation name/title field
- [ ] Implement multiple saved formations gallery
- [ ] Add formation tags/categories (PvP, PvE, Boss, etc.)

## Phase 11: Polish & Optimization
- [ ] Add animations and transitions
  - [ ] Character placement animations
  - [ ] Page transitions
  - [ ] Micro-interactions
- [ ] Optimize performance
  - [ ] Lazy load character images
  - [ ] Minimize bundle size
  - [ ] Optimize re-renders
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Accessibility improvements
  - [ ] Keyboard navigation
  - [ ] Screen reader support
  - [ ] ARIA labels

## Phase 12: Documentation & Deployment
- [ ] Write user guide/help section
- [ ] Create FAQ page
- [ ] Add tooltips and inline help
- [ ] Write README with setup instructions
- [ ] Deploy to hosting platform (Vercel/Netlify/GitHub Pages)
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (optional)

## Phase 13: Testing & Refinement
- [ ] User testing with friends
- [ ] Gather feedback
- [ ] Fix bugs and issues
- [ ] Performance optimization based on real usage
- [ ] Add requested features from feedback
- [ ] Create changelog

## Optional Advanced Features
- [ ] User accounts and cloud save
- [ ] Community formations gallery
- [ ] Formation rating/voting system
- [ ] AI formation suggestions
- [ ] Integration with game tier lists
- [ ] Multi-language support
- [ ] PWA (Progressive Web App) support for offline use
- [ ] Formation battle simulator (theoretical)

---

## Quick Start Priority (MVP - Minimum Viable Product)
For fastest implementation, focus on these core features first:
1. **Formation Type Selector**: 4 formation types (Basic, Normal, Attack, Defense) with visual cards
2. **Formation Layout**: 5 character slots positioned based on selected formation type + 1 pet slot on right
3. **Character Roster**: Scrollable character/pet list at bottom with portraits
4. **Click-to-Place**: Click character → click slot to place
5. **Character Cards**: Display name, level, rarity stars, class icon, enhancement
6. **Position Styling**: Blue shields for front positions, red cones for back positions
7. **Remove Function**: X button to remove characters/pet from formation
8. **URL Sharing**: Encode formation (including formation type) in URL to share
9. **Basic Styling**: Dark/purple theme matching Seven Knights Rebirth aesthetic
10. **Local Storage**: Auto-save current formation and selected formation type

Once MVP is working, iterate with additional features from the phases above.

---

## Formation Structure Summary

### Formation Types (4 Types)
1. **Basic Formation (รูปแบบพื้นฐาน)** Lv.1
   - Front: Positions 1, 2 (Blue Shields)
   - Back: Positions 3, 4, 5 (Red Cones)
   
2. **Normal/Balanced Formation (รูปแบบสมดุล)** Lv.1
   - Front: Positions 1, 2, 3 (Blue Shields)
   - Back: Positions 4, 5 (Red Cones)
   
3. **Attack Formation (รูปแบบโจมตี)** Lv.5
   - Front: Position 1 (Blue Shield)
   - Back: Positions 2, 3, 4, 5 (Red Cones)
   
4. **Defense Formation (รูปแบบป้องกัน)** Lv.1
   - Front: Positions 1, 2, 3, 4 (Blue Shields)
   - Back: Position 5 (Red Cone)

### Layout Details
- **5 Character Slots**: Positioned based on selected formation type
- **1 Pet Slot**: Positioned on the right side of characters
- **Character Info Display**: Portrait, Level (Lv.XX), Enhancement (+1 to +5), Rarity Stars (★★★★★★), Class Icon, Remove Button (X)
- **Pet Info Display**: Similar display with pet-specific styling
- **Single Formation**: One team only (not multiple teams)
- **Position Types**: Front (Blue Shield icons) vs Back (Red Cone icons)

