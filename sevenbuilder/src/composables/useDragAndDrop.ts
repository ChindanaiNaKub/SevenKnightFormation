import { reactive } from 'vue';
import type { Character, Pet } from '../types';

/**
 * Drag and drop composable for formation builder
 */
export function useDragAndDrop() {
  // Drag state
  const dragState = reactive({
    isDragging: false,
    draggedItem: null as Character | Pet | null,
    draggedItemType: null as 'character' | 'pet' | null,
    dragSource: null as string | null, // Source slot position or 'roster'
    dropTarget: null as string | null, // Target slot position
  });

  // Drop zones state
  const dropZones = reactive({
    characterSlots: new Set<number>(),
    petSlot: false,
    trashZone: false,
  });

  /**
   * Start drag operation
   */
  function startDrag(item: Character | Pet, itemType: 'character' | 'pet', source: string) {
    dragState.isDragging = true;
    dragState.draggedItem = item;
    dragState.draggedItemType = itemType;
    dragState.dragSource = source;
    
    // Set up drop zones
    if (itemType === 'character') {
      dropZones.characterSlots = new Set([1, 2, 3, 4, 5]);
      dropZones.petSlot = false;
    } else {
      dropZones.characterSlots.clear();
      dropZones.petSlot = true;
    }
    dropZones.trashZone = true;
  }

  /**
   * End drag operation
   */
  function endDrag() {
    dragState.isDragging = false;
    dragState.draggedItem = null;
    dragState.draggedItemType = null;
    dragState.dragSource = null;
    dragState.dropTarget = null;
    
    // Clear drop zones
    dropZones.characterSlots.clear();
    dropZones.petSlot = false;
    dropZones.trashZone = false;
  }

  /**
   * Set drop target
   */
  function setDropTarget(target: string | null) {
    dragState.dropTarget = target;
  }

  /**
   * Check if position is valid drop target
   */
  function isValidDropTarget(position: number | 'pet' | 'trash'): boolean {
    if (!dragState.isDragging || !dragState.draggedItemType) return false;

    if (position === 'trash') return true;
    
    if (dragState.draggedItemType === 'character') {
      return typeof position === 'number' && position >= 1 && position <= 5;
    } else {
      return position === 'pet';
    }
  }

  /**
   * Get drag data for HTML5 drag API
   */
  function getDragData(): string {
    if (!dragState.draggedItem || !dragState.draggedItemType) return '';
    
    return JSON.stringify({
      item: dragState.draggedItem,
      type: dragState.draggedItemType,
      source: dragState.dragSource,
    });
  }

  /**
   * Parse drag data from HTML5 drag API
   */
  function parseDragData(data: string): { item: Character | Pet; type: 'character' | 'pet'; source: string } | null {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  /**
   * Handle drag start event
   */
  function handleDragStart(event: DragEvent, item: Character | Pet, itemType: 'character' | 'pet', source: string) {
    if (!event.dataTransfer) return;
    
    startDrag(item, itemType, source);
    
    // Set drag data
    event.dataTransfer.setData('application/json', getDragData());
    event.dataTransfer.effectAllowed = 'move';
    
    // Create custom drag image
    const dragImage = createDragImage(item, itemType);
    event.dataTransfer.setDragImage(dragImage, 50, 50);
  }

  /**
   * Handle drag over event
   */
  function handleDragOver(event: DragEvent, target: string) {
    event.preventDefault();
    
    if (!dragState.isDragging) return;
    
    const position = target === 'pet' ? 'pet' : target === 'trash' ? 'trash' : parseInt(target);
    
    if (isValidDropTarget(position)) {
      event.dataTransfer!.dropEffect = 'move';
      setDropTarget(target);
    } else {
      event.dataTransfer!.dropEffect = 'none';
    }
  }

  /**
   * Handle drag leave event
   */
  function handleDragLeave(event: DragEvent) {
    // Only clear target if we're leaving the drop zone entirely
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDropTarget(null);
    }
  }

  /**
   * Handle drop event
   */
  function handleDrop(event: DragEvent, target: string): { item: Character | Pet; type: 'character' | 'pet'; source: string; target: string } | null {
    event.preventDefault();
    
    if (!event.dataTransfer) return null;
    
    const data = event.dataTransfer.getData('application/json');
    const dragData = parseDragData(data);
    
    if (!dragData) return null;
    
    const position = target === 'pet' ? 'pet' : target === 'trash' ? 'trash' : parseInt(target);
    
    if (isValidDropTarget(position)) {
      endDrag();
      return {
        item: dragData.item,
        type: dragData.type,
        source: dragData.source,
        target,
      };
    }
    
    return null;
  }

  /**
   * Create custom drag image
   */
  function createDragImage(item: Character | Pet, _type: 'character' | 'pet'): HTMLElement {
    const dragImage = document.createElement('div');
    dragImage.style.cssText = `
      position: absolute;
      top: -1000px;
      width: 100px;
      height: 120px;
      background: var(--color-bg-secondary, #1a1a2e);
      border: 2px solid var(--color-primary, #7c3aed);
      border-radius: 8px;
      padding: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 1000;
    `;
    
    dragImage.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 80px; object-fit: cover; border-radius: 4px;">
      <div style="text-align: center; font-size: 12px; color: white; margin-top: 4px; font-weight: 600;">
        ${item.name}
      </div>
    `;
    
    document.body.appendChild(dragImage);
    
    // Clean up after a short delay
    setTimeout(() => {
      if (dragImage.parentNode) {
        dragImage.parentNode.removeChild(dragImage);
      }
    }, 100);
    
    return dragImage;
  }

  return {
    dragState,
    dropZones,
    startDrag,
    endDrag,
    setDropTarget,
    isValidDropTarget,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}
