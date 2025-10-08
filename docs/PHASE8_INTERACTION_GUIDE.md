# Formation Selector User Interaction Guide

## Complete User Journey

### Step 1: Initial View (First Visit)
```
┌─────────────────────────────────────────────────────────┐
│                 Seven Knights Rebirth                   │
│                 Formation Builder                       │
│  [Reset] [Manage] [Save] [Share Link] [Export PNG]    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Formation Type                                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   ●  ●      │  │   ● ● ●     │  │      ●       │   │
│  │   ● ● ●     │  │    ● ●      │  │  ● ● ● ●     │   │
│  │             │  │             │  │              │   │
│  │   Basic     │  │   Normal    │  │   Attack     │   │
│  │   Lv.1      │  │   Lv.1      │  │   Lv.5       │   │
│  │ 🛡 2 / 🔺 3 │  │ 🛡 3 / 🔺 2 │  │ 🛡 1 / 🔺 4  │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                         │
│  ┌─────────────┐                                       │
│  │ ● ● ● ●     │                                       │
│  │    ●        │                                       │
│  │             │                                       │
│  │  Defense    │                                       │
│  │   Lv.1      │                                       │
│  │ 🛡 4 / 🔺 1 │                                       │
│  └─────────────┘                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          ↓
              👆 User hovers over Defense card
```

### Step 2: Hover State
```
┌─────────────────────────────────────────────────────────┐
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   Basic     │  │   Normal    │  │   Attack     │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                         │
│  ┌─────────────┐  ← Card lifts up (translateY: -4px)  │
│  │ ● ● ● ●     │  ← Border glows purple                │
│  │    ●        │  ← Shadow expands                     │
│  │             │                                       │
│  │  Defense    │  ← Cursor: pointer                   │
│  │   Lv.1      │                                       │
│  │ 🛡 4 / 🔺 1 │                                       │
│  └─────────────┘                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          ↓
                  👆 User clicks Defense
```

### Step 3: Selection Moment (0ms - 500ms)
```
┌─────────────────────────────────────────────────────────┐
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   Basic     │  │   Normal    │  │   Attack     │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                         │
│  ┌─────────────┐                                       │
│  │ ● ● ● ●     │  ← Checkmark appears: ✓              │
│  │    ●        │  ← Background: purple gradient        │
│  │         ✓   │  ← Card pulses (scale animation)     │
│  │  Defense    │  ← User sees feedback                │
│  │   Lv.1      │                                       │
│  │ 🛡 4 / 🔺 1 │                                       │
│  └─────────────┘                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          ↓
              ⏱️ Wait 600ms for auto-collapse
```

### Step 4: Collapsing Animation (500ms - 900ms)
```
┌─────────────────────────────────────────────────────────┐
│  ┌─────────────┐  ┌─────────────┐                     │
│  │             │  │             │  ← Cards fading out   │
│  └─────────────┘  └─────────────┘                     │
│                                                         │
│  ┌─────────────┐                                       │
│  │ ● ● ● ●     │  ← Defense card shrinking             │
│  │  Defense ✓  │  ← Height reducing                    │
│  └─────────────┘                                       │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ [icon] Formation: Defense...            [▼]     │  │
│  └──────────────────────────────────────────────────┘  │
│                       ↑ Collapsed header appearing      │
└─────────────────────────────────────────────────────────┘
                          ↓
                  Animation complete
```

### Step 5: Collapsed State (Active)
```
┌─────────────────────────────────────────────────────────┐
│                 Seven Knights Rebirth                   │
│                 Formation Builder                       │
│  [Reset] [Manage] [Save] [Share Link] [Export PNG]    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ [●●●●]  Formation: Defense Formation  🛡 4 / 🔺 1  [▼] │ ← Compact!
│  [●]                                                    │
└─────────────────────────────────────────────────────────┘
      ↑ Mini icon            ↑ Name & Stats  ↑ Expand btn

┌─────────────────────────────────────────────────────────┐
│ Formation                  Type: Defense Formation      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                     FRONT                               │
│    ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐    │
│    │ Slot 1 │  │ Slot 2 │  │ Slot 3 │  │ Slot 4 │    │
│    │        │  │        │  │        │  │        │    │
│    │  🛡    │  │  🛡    │  │  🛡    │  │  🛡    │    │
│    └────────┘  └────────┘  └────────┘  └────────┘    │
│                                                         │
│                     BACK                                │
│                    ┌────────┐                           │
│                    │ Slot 5 │                           │
│                    │        │                           │
│                    │  🔺    │                           │
│                    └────────┘                           │
│                                                         │
│                  ┌─────────────┐                        │
│                  │  Pet Slot   │                        │
│                  │             │                        │
│                  └─────────────┘                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
       ↑ MAIN FOCUS: Formation building area is larger!

┌─────────────────────────────────────────────────────────┐
│ Roster              [Characters (34/34)] [Pets (32/32)]│
│                                                         │
│ [Search...                           ]                  │
│                                                         │
│ Sort: [Name ▼]  Rarity: [All ▼]  Class: [All ▼] [✖]   │
│                                                         │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │Alice │  │Aragon│  │Ariel │  │Ballis│              │
│  │★★★★★★│  │★★★★★★│  │★★★★★★│  │★★★★★★│              │
│  │Lv.50 │  │Lv.50 │  │Lv.40 │  │Lv.50 │              │
│  └──────┘  └──────┘  └──────┘  └──────┘              │
│                                                         │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │Bane  │  │Bella │  │Beskin│  │Biscuit│             │
│  └──────┘  └──────┘  └──────┘  └──────┘              │
│                                                         │
│  ┌──────┐  ← MORE CHARACTERS VISIBLE!                  │
│  │Chancl│      (3-4 more rows on screen)               │
│  └──────┘                                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Step 6: Hover on Collapsed Header
```
┌─────────────────────────────────────────────────────────┐
│ [●●●●]  Formation: Defense Formation  🛡 4 / 🔺 1  [▼] │
│  [●]   ← Background tints purple on hover              │
└─────────────────────────────────────────────────────────┘
          ↑ Cursor: pointer (entire header is clickable)
```

### Step 7: Click to Expand
```
┌─────────────────────────────────────────────────────────┐
│ [●●●●]  Formation: Defense Formation  🛡 4 / 🔺 1  [▼] │
│  [●]                                                    │
└─────────────────────────────────────────────────────────┘
                          ↓
                  👆 User clicks anywhere
                          ↓
              🎬 Expanding animation (300ms)
                          ↓
```

### Step 8: Expanded State (Back to Step 1 layout)
```
┌─────────────────────────────────────────────────────────┐
│ Formation Type                                    [▲]   │ ← Collapse btn
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   Basic     │  │   Normal    │  │   Attack     │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                         │
│  ┌─────────────┐                                       │
│  │ ● ● ● ●     │                                       │
│  │    ●    ✓   │  ← Defense still selected             │
│  │  Defense    │                                       │
│  │   Lv.1      │                                       │
│  │ 🛡 4 / 🔺 1 │                                       │
│  └─────────────┘                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
          ↓
    User can now:
    1. Select a different formation
    2. Click [▲] to manually collapse
```

## Interactive Elements Detail

### Collapsed Header Anatomy
```
┌──────────────────────────────────────────────────────────┐
│  ①          ②                    ③            ④         │
│ [●●●●]  Formation: Defense   🛡 4 / 🔺 1    [  🔽  ]    │
│  [●]        Formation                        Button     │
└──────────────────────────────────────────────────────────┘

① Mini Formation Icon
   - Size: 60x40px
   - Shows position dots
   - Blue (front) & Red (back)
   - Glowing border

② Formation Label & Name
   - "Formation: Defense Formation"
   - Primary text color
   - Bold for name

③ Quick Stats
   - Front/Back position count
   - Compact format
   - Badge-style background

④ Expand Button
   - 36x36px circular button
   - Purple background
   - Chevron down icon
   - Hover: scale + lighter purple
```

### Expanded Header Anatomy
```
┌──────────────────────────────────────────────────────────┐
│  Formation Type                                    [  ▲  ]│
│                                                      Button│
└──────────────────────────────────────────────────────────┘

- Left: "Formation Type" heading
- Right: Collapse button (36x36px)
- Border bottom: 2px separator
- Padding: Standard spacing
```

## Timing Breakdown

```
Selection Click
    ↓
    0ms ─────────► Selection animation starts
                   - Checkmark appears
                   - Background changes
                   - Card pulses
    ↓
  500ms ──────────► Selection animation ends
    ↓
  600ms ──────────► Auto-collapse begins
                   - Height transition starts
                   - Cards fade out
                   - Collapsed header fades in
    ↓
  900ms ──────────► Auto-collapse complete
                   - Collapsed state stable
                   - User can interact
```

## Mouse Interaction Zones

### Collapsed State
```
┌──────────────────────────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ▓ CLICK ANYWHERE TO EXPAND                     [▼]▓▓▓▓▓ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
└──────────────────────────────────────────────────────────┘
  ▓ = Clickable area (entire header)
```

### Expanded State
```
┌──────────────────────────────────────────────────────────┐
│ Formation Type                              [▲]▓▓▓▓▓▓▓▓▓ │
│                                             ▓▓▓Collapse▓ │
├──────────────────────────────────────────────────────────┤
│  ╔═══════════╗  ╔═══════════╗  ╔═══════════╗           │
│  ║  CARD 1   ║  ║  CARD 2   ║  ║  CARD 3   ║           │
│  ║ clickable ║  ║ clickable ║  ║ clickable ║           │
│  ╚═══════════╝  ╚═══════════╝  ╚═══════════╝           │
│                                                          │
│  ╔═══════════╗                                          │
│  ║  CARD 4   ║                                          │
│  ║ clickable ║                                          │
│  ╚═══════════╝                                          │
└──────────────────────────────────────────────────────────┘
  ╔═══╗ = Clickable formation cards
  ▓▓▓▓ = Collapse button
```

## Keyboard Navigation Flow

```
Tab Order (Collapsed):
1. [Collapsed Header] ← Press Enter to expand
2. Next element (Formation grid or other content)

Tab Order (Expanded):
1. [Collapse Button] ← Press Enter to collapse
2. [Formation Card 1] ← Press Enter to select
3. [Formation Card 2]
4. [Formation Card 3]
5. [Formation Card 4]
6. Next element
```

## Mobile Touch Interactions

### Tap Zones (Mobile)
```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ▓ │ │
│ │ ▓ TAP TO EXPAND           [▼]▓ │ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ▓ │ │
│ └─────────────────────────────────┘ │
│           ↑ 44px minimum            │
│         (thumb-friendly)            │
└─────────────────────────────────────┘
```

## State Diagram

```
         [Initial/Expanded]
              ↓ select
         [Selecting]
        (pulse animation)
              ↓ 600ms
         [Collapsing]
       (height transition)
              ↓ 300ms
         [Collapsed]
              ↓ click
         [Expanding]
       (height transition)
              ↓ 300ms
         [Expanded]
              ↓ manual collapse
         [Collapsed]
```

## Visual Feedback Summary

| Action | Visual Feedback | Duration |
|--------|----------------|----------|
| Hover card | Border glow, lift up | 200ms |
| Click card | Checkmark appears | Instant |
| Selection | Card pulse animation | 500ms |
| Auto-collapse | Smooth height transition | 300ms |
| Hover collapsed | Purple background tint | 200ms |
| Click expand | Height transition | 300ms |
| Hover button | Scale + color change | 200ms |

## UX Flow Diagram

```
┌─────────────┐
│ Page Load   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Full Selector   │◄──────┐
│   Displayed     │       │
└──────┬──────────┘       │
       │                  │
       │ Select           │
       ▼                  │
┌─────────────────┐       │
│  Feedback +     │       │
│  600ms Delay    │       │
└──────┬──────────┘       │
       │                  │
       ▼                  │
┌─────────────────┐       │
│ Auto-Collapse   │       │
└──────┬──────────┘       │
       │                  │
       ▼                  │
┌─────────────────┐       │
│ Collapsed Mode  │       │
│  (Build Team)   │       │
└──────┬──────────┘       │
       │                  │
       │ Need Change?     │
       │ Click Header     │
       └──────────────────┘
```

---

**This guide shows the complete user interaction flow with the collapsible formation selector!** 🎯

