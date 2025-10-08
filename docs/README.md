# Seven Knights Rebirth - Formation Builder

A web-based formation builder for Seven Knights Rebirth game that allows players to create, customize, and share their team formations.

## Features

- **4 Formation Types**: Basic, Normal, Attack, and Defense formations
- **5 Character Slots + 1 Pet Slot**: Build your complete team
- **Character Management**: Add characters with level, rarity, class, and enhancement details
- **Position Indicators**: Visual indicators for front (blue shields) and back (red cones) positions
- **Save & Load**: Save multiple formations locally
- **Share**: Share your formations via URL with friends
- **Side-by-Side Layout**: Formation and roster visible simultaneously (no scrolling!)
- **Collapsible Sidebar**: Toggle roster visibility for more space
- **Collapsible Formation Selector**: Auto-collapses after selection to maximize focus on building
- **Drag & Drop OR Click-to-Place**: Two ways to build your formation
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Bun** - Fast JavaScript runtime and package manager

## Project Structure

```
sevenbuilder/
├── src/
│   ├── components/        # Vue components
│   │   ├── formation/     # Formation-related components
│   │   ├── character/     # Character-related components
│   │   └── ui/            # Reusable UI components
│   ├── composables/       # Vue composables (reusable logic)
│   ├── data/              # Character/pet databases and formation configs
│   ├── styles/            # Global styles and theme
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.vue            # Root component
│   └── main.ts            # Application entry point
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## Development

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Setup

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Formation Types

1. **Basic Formation (Lv.1)**
   - Front: Positions 1, 2 (Blue Shields)
   - Back: Positions 3, 4, 5 (Red Cones)

2. **Normal Formation (Lv.1)**
   - Front: Positions 1, 2, 3 (Blue Shields)
   - Back: Positions 4, 5 (Red Cones)

3. **Attack Formation (Lv.5)**
   - Front: Position 1 (Blue Shield)
   - Back: Positions 2, 3, 4, 5 (Red Cones)

4. **Defense Formation (Lv.1)**
   - Front: Positions 1, 2, 3, 4 (Blue Shields)
   - Back: Position 5 (Red Cone)

## Contributing

This is a personal project for the Seven Knights Rebirth community. Contributions are welcome!

## License

MIT

## Recent Updates

### Phase 8: Collapsible Formation Selector
- **Auto-Collapse**: Formation selector automatically minimizes after selection
- **Space Efficiency**: Saves ~85% vertical space when collapsed
- **Quick Access**: One-click expansion to change formations
- **Improved Focus**: Formation building area takes center stage
- **Enhanced UX**: Smooth animations and polished transitions

See [PHASE8_COLLAPSIBLE_FORMATION_SELECTOR.md](PHASE8_COLLAPSIBLE_FORMATION_SELECTOR.md) for detailed documentation.

### Phase 7: Enhanced Visual Design
- Beautiful gradient cards with animated selection states
- Improved color scheme and visual hierarchy
- Responsive grid layouts for all screen sizes
- Professional-looking UI with polished animations

See [PHASE7_COMPLETE_GUIDE.md](PHASE7_COMPLETE_GUIDE.md) for complete design documentation.

## Acknowledgments

- Seven Knights Rebirth by Netmarble
- Built for the Seven Knights community
