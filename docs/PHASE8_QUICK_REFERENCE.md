# Formation Selector Quick Reference

## How to Use the Collapsible Formation Selector

### Initial State
When you first load the app or haven't selected a formation yet, you'll see the full formation selector with all four formation types displayed.

### Selecting a Formation
1. **Click** on any formation card (Basic, Normal, Attack, or Defense)
2. The card will **pulse and show a checkmark** ✓
3. After **600ms**, the selector will **automatically collapse**
4. Your formation grid will now be the main focus!

### Collapsed State
When collapsed, you'll see a compact header showing:
- 📊 **Mini Formation Icon** - Visual representation with position dots
- 📝 **Formation Name** - e.g., "Defense Formation"
- 📈 **Quick Stats** - e.g., "🛡 4 / 🔺 1" (Front/Back positions)
- 🔽 **Expand Button** - Click to see all formations again

### Changing Your Formation
**Option 1: From Collapsed State**
- Click **anywhere** on the collapsed header
- The selector expands to show all formation types
- Select a new formation
- Selector auto-collapses again

**Option 2: Quick Expand**
- Click the **expand button** (🔽 icon)
- Browse and select a new formation

### Benefits

#### 🎯 **Better Focus**
- Formation building area is larger and more prominent
- Less visual clutter
- More space for character cards

#### 📱 **Mobile Friendly**
- Saves precious screen space on mobile devices
- Less scrolling needed
- One-handed operation easier

#### ⚡ **Faster Workflow**
1. Select formation → Auto-collapse
2. Build your team
3. Change formation with one click if needed

#### 👁️ **Always Visible**
- Current formation always shown in collapsed header
- No need to remember which formation you selected
- Quick stats at a glance

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Expand selector | Click collapsed header, then Tab to navigate |
| Select formation | Tab to card, then Enter or Space |
| Collapse selector | Tab to collapse button, then Enter |

## Tips & Tricks

### 💡 Tip 1: Let It Collapse
Don't try to scroll immediately after selecting - wait for the auto-collapse animation (600ms). It's smooth and intentional!

### 💡 Tip 2: One-Click Changes
Need to switch formations? Just click the collapsed header. No need to scroll or search.

### 💡 Tip 3: Visual Recognition
The mini formation icon in the collapsed state uses the same blue/red dots, making it easy to recognize your formation type at a glance.

### 💡 Tip 4: Mobile Power User
On mobile, the collapsed selector is your best friend. It gives you maximum space for building without constant scrolling.

## Visual States

### Expanded (Default/Initial)
```
┌─────────────────────────────────────────────┐
│ Formation Type                        [▲]   │
├─────────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐   │
│  │Basic │  │Normal│  │Attack│  │Defense│   │
│  └──────┘  └──────┘  └──────┘  └──────┘   │
└─────────────────────────────────────────────┘
                    ↓ Select a formation
```

### Collapsing Animation
```
┌─────────────────────────────────────────────┐
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐   │
│  │      │  │      │  │      │  │Defense│   │
│  │      │  │      │  │      │  │  ✓   │   │ ← Selected!
│  └──────┘  └──────┘  └──────┘  └──────┘   │
└─────────────────────────────────────────────┘
                    ↓ 600ms delay
```

### Collapsed (Active)
```
┌─────────────────────────────────────────────┐
│ [icon] Formation: Defense  🛡 4 / 🔺 1 [🔽]│
└─────────────────────────────────────────────┘
    ↑ Click anywhere to expand
```

## Troubleshooting

### Q: The selector won't collapse after selection
**A:** Make sure you've actually selected a formation (you should see the checkmark). The auto-collapse happens after 600ms.

### Q: How do I keep it expanded?
**A:** The selector stays expanded until you select a formation. Once you select, it will auto-collapse. If you want to browse without selecting, just don't click on any formation card.

### Q: Can I disable auto-collapse?
**A:** Currently, auto-collapse is a core UX feature and cannot be disabled. However, you can expand it anytime with a single click!

### Q: The collapsed header looks different on mobile
**A:** Yes! The collapsed view adapts to smaller screens with a more compact layout. This is intentional for better mobile UX.

## Animation Timing

| Event | Duration | Purpose |
|-------|----------|---------|
| Card hover | 200ms | Quick responsive feedback |
| Selection pulse | 500ms | Celebrate your choice |
| Auto-collapse delay | 600ms | Let you see the selection |
| Collapse transition | 300ms | Smooth visual change |
| Expand transition | 300ms | Smooth visual change |

## Design Philosophy

The collapsible formation selector follows these principles:

1. **Progressive Disclosure** - Show details only when needed
2. **Spatial Efficiency** - Maximize space for primary task (formation building)
3. **Always Accessible** - One click away from any state
4. **Clear Feedback** - Animations and visual cues guide the user
5. **Responsive First** - Works great on all screen sizes

## Comparison: Before vs After

### Before Phase 8
- Formation selector always visible (400px)
- Requires scrolling on smaller screens
- Formation grid competes for attention
- Less roster items visible

### After Phase 8
- Collapsed: 60px (85% space saved!)
- No scrolling needed
- Formation grid is the main focus
- 3-4 more roster items visible on screen

**Result**: Cleaner, more focused, more efficient! ✨

## Related Documentation

- 📚 [Full Technical Documentation](PHASE8_COLLAPSIBLE_FORMATION_SELECTOR.md)
- 🎨 [Visual Comparison](PHASE8_VISUAL_COMPARISON.md)
- 📖 [Complete Feature Guide](PHASE7_COMPLETE_GUIDE.md)

## Feedback

Enjoying the new collapsible selector? Have suggestions? Let us know!

---

**Version**: Phase 8  
**Last Updated**: October 2025  
**Status**: ✅ Production Ready
