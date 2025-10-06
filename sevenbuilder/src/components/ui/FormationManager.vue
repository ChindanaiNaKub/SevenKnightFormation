<template>
  <div class="manager-overlay" @click.self="$emit('close')">
    <div class="manager-modal">
      <header class="manager-header">
        <h2>Saved Formations</h2>
        <button class="icon-button" @click="$emit('close')" aria-label="Close">✕</button>
      </header>

      <section class="manager-actions">
        <label class="import-label">
          <input type="file" accept="application/json" @change="handleImportFile" />
          Import JSON
        </label>
      </section>

      <section class="manager-list" v-if="formations.length">
        <div class="list-header">
          <span class="col name">Name</span>
          <span class="col type">Type</span>
          <span class="col updated">Updated</span>
          <span class="col actions">Actions</span>
        </div>
        <div v-for="f in formations" :key="f.id" class="list-row">
          <span class="col name">{{ f.name || 'Untitled' }}</span>
          <span class="col type">{{ f.formationType }}</span>
          <span class="col updated">{{ formatDate(f.updatedAt || f.createdAt) }}</span>
          <span class="col actions">
            <button class="btn" @click="emitLoad(f.id!)">Load</button>
            <button class="btn" @click="promptRename(f)">Rename</button>
            <button class="btn" @click="emitDuplicate(f.id!)">Duplicate</button>
            <button class="btn" @click="emitExport(f.id!)">Export</button>
            <button class="btn danger" @click="emitDelete(f.id!)">Delete</button>
          </span>
        </div>
      </section>

      <section v-else class="empty-state">No saved formations yet.</section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Formation } from '../../types';
import {
  getSavedFormations,
  getFormationById,
  renameFormation,
  deleteFormation,
  duplicateFormation,
  exportFormationJson,
  importFormationJson,
} from '../../utils/storageUtils';

const emit = defineEmits<{
  close: [];
  load: [formation: Formation];
}>();

const formations = ref<Formation[]>([]);

function refresh() {
  formations.value = getSavedFormations().sort((a, b) => {
    const aTime = (a.updatedAt || a.createdAt || new Date(0)).getTime();
    const bTime = (b.updatedAt || b.createdAt || new Date(0)).getTime();
    return bTime - aTime;
  });
}

function formatDate(date?: Date) {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleString();
}

function emitLoad(id: string) {
  const f = getFormationById(id);
  if (f) emit('load', f);
}

function promptRename(f: Formation) {
  const newName = window.prompt('Rename formation:', f.name || 'Untitled');
  if (newName && f.id) {
    renameFormation(f.id, newName.trim());
    refresh();
  }
}

function emitDelete(id: string) {
  if (confirm('Delete this formation?')) {
    deleteFormation(id);
    refresh();
  }
}

function emitDuplicate(id: string) {
  duplicateFormation(id);
  refresh();
}

function emitExport(id: string) {
  const json = exportFormationJson(id);
  if (!json) return;
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'formation.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function handleImportFile(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const text = String(reader.result || '');
    const f = importFormationJson(text);
    if (f) {
      refresh();
      alert('Imported formation: ' + (f.name || 'Untitled'));
    } else {
      alert('Failed to import formation');
    }
  };
  reader.readAsText(file);
  // Reset input so same file can be chosen again
  input.value = '';
}

onMounted(refresh);
</script>

<style scoped>
.manager-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.manager-modal {
  width: min(900px, 95vw);
  max-height: 80vh;
  overflow: auto;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-primary);
  box-shadow: var(--shadow-lg);
  border-radius: 12px;
}

.manager-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--color-primary);
}

.icon-button {
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  font-size: 18px;
  cursor: pointer;
}

.manager-actions {
  padding: var(--spacing-sm) var(--spacing-lg);
  display: flex;
  gap: var(--spacing-sm);
}

.import-label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-primary-light);
}
.import-label input { display: none; }

.manager-list {
  padding: 0 var(--spacing-lg) var(--spacing-lg);
}

.list-header, .list-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 2fr;
  gap: var(--spacing-sm);
  align-items: center;
}

.list-header {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-bg-primary);
  color: var(--color-text-secondary);
  font-weight: 600;
}

.list-row {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px dashed var(--color-bg-primary);
}

.col.actions {
  display: flex;
  gap: 6px;
}

.btn {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
}

.btn.danger {
  border-color: #ff5c5c;
  color: #ff8a8a;
}

.empty-state {
  padding: var(--spacing-lg);
  text-align: center;
  color: var(--color-text-secondary);
}
</style>


