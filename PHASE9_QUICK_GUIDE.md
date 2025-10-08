# Character Selection Modal - Quick Guide

## 🎮 How It Works

### Opening the Modal

#### For Characters:
```
1. Find an empty slot in your formation
2. Click the empty slot (shows "Empty" text)
3. Modal opens showing all available characters
```

#### For Pets:
```
1. Find the empty pet slot (below the formation)
2. Click the empty pet slot
3. Modal opens showing all available pets
```

### Using the Character Modal

```
┌─────────────────────────────────────┐
│  Select Character      Position 3   │  ← Header with target position
├─────────────────────────────────────┤
│ [All] [Attack] [Magic] [Defence]... │  ← Filter tabs by class
├─────────────────────────────────────┤
│                                     │
│  ┌───┐  Leo                    ★★★ │
│  │IMG│  Legendary (SP)         [⚔] │  ← Character card
│  └───┘  Attack                      │
│                                     │
│  ┌───┐  Kagura                 ★★★ │
│  │IMG│  Legendary              [⚔] │
│  └───┘  Attack                      │
│                                     │
│  ┌───┐  Rudy              ✓    ★★★ │  ← Already placed
│  │IMG│  Legendary (SP)         [🛡] │     (grayed out)
│  └───┘  Defence                     │
│                                     │
└─────────────────────────────────────┘
```

### Features at a Glance

#### Visual Indicators
- **Position Badge**: Shows which slot you're filling (e.g., "Position 3")
- **Class Tabs**: Quick filter by character type
- **Star Rating**: Shows character rarity (★★★ = 6-star)
- **Class Icons**: Visual representation of character class
- **Checkmark**: Indicates character is already in formation
- **Grayed Out**: Can't select characters already placed

#### Interaction
- **Click Character**: Instantly places in target position
- **Click X Button**: Closes modal without selection
- **Click Outside**: Closes modal (click dark overlay)
- **Tab Buttons**: Filter characters by class

## 🎯 Three Ways to Build Your Formation

### Method 1: Modal (NEW) ⭐
```
Empty Slot → Click → Modal Opens → Select Character → Done!
```
**Best for**: Quick selection, mobile users, browsing options

### Method 2: Click-to-Place (Existing)
```
Roster → Click Character → Click Empty Slot → Done!
```
**Best for**: When you know exactly which character you want

### Method 3: Drag-and-Drop (Existing)
```
Roster → Drag Character → Drop on Slot → Done!
```
**Best for**: Desktop users, reordering multiple characters

## 💡 Pro Tips

### Quick Selection
1. Click empty slot
2. Use class tabs to narrow down options
3. Click your choice - done in 3 clicks!

### Changing Characters
1. Remove existing character (click remove button on slot)
2. Click now-empty slot
3. Select new character

### Class Filtering
- **All**: Shows every character
- **Attack**: Physical damage dealers
- **Magic**: Magical damage dealers
- **Defence**: Tanks and protectors
- **Support**: Healers and buffers
- **Universal**: Multi-role characters

### Mobile Usage
- Modal takes most of screen for easy viewing
- Large touch targets - no precision needed
- Scroll through list smoothly
- Swipe between class tabs

## 🎨 Design Comparison

### Your Reference (FIFA-style):
```
✅ Dark themed modal
✅ Semi-transparent overlay
✅ Character list with portraits
✅ Player info (name, position, nation, club)
✅ Tabs for filtering (Start/Bench)
✅ Close button (X)
```

### Our Implementation:
```
✅ Dark themed modal with gradient
✅ Semi-transparent overlay with blur
✅ Character list with portraits
✅ Character info (name, class, rarity, stars)
✅ Tabs for filtering (All/Attack/Magic/Defence/Support/Universal)
✅ Close button (X)
✅ Additional: Position badge, placed indicator, class icons
```

## 📱 Responsive Design

### Desktop (1200px+)
- Modal: 600px wide, centered
- Shows ~6 characters at once
- Tabs in single row

### Tablet (768px - 1200px)
- Modal: 80% width, centered
- Shows ~5 characters at once
- Tabs may wrap to second row

### Mobile (< 768px)
- Modal: Full width, bottom-sheet style
- Shows ~4 characters at once
- Tabs scroll horizontally
- Larger touch targets

## 🚀 What's Next?

You can now:
1. Test the modal by clicking empty slots
2. Try filtering by class
3. Check that placed characters show checkmarks
4. Test on mobile/tablet
5. Verify all three interaction methods work

Optional enhancements:
- Add search functionality
- Add character sorting (by tier, name, etc.)
- Add character details view
- Add favorites system
