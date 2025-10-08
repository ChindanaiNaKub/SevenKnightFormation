<template>
  <header class="app-header">
    <div class="header-content">
      <div class="header-left">
        <h1 class="header-title">
          <span class="title-main">Seven Knights Rebirth</span>
          <span class="title-sub">Formation Builder</span>
        </h1>
      </div>
      
      <div class="header-right">
        <AppButton
          icon="/icons/icon-reset.svg"
          label="Reset"
          variant="ghost"
          @click="$emit('reset')"
        />
        <AppButton
          icon="/icons/icon-save.svg"
          label="Manage"
          variant="ghost"
          @click="$emit('manage')"
        />
        <AppButton
          icon="/icons/icon-save.svg"
          label="Save"
          variant="secondary"
          @click="$emit('save')"
        />
        <AppButton
          icon="/icons/icon-share.svg"
          label="Share Link"
          variant="primary"
          @click="$emit('share')"
        />
        <AppButton
          icon="/icons/icon-save.svg"
          label="Export PNG"
          variant="ghost"
          @click="$emit('export')"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppButton from './AppButton.vue';

defineEmits<{
  reset: [];
  manage: [];
  save: [];
  share: [];
  export: [];
}>();
</script>

<style scoped>
.app-header {
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
}

.header-content {
  max-width: 1600px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
  min-height: 72px;
}

.header-left {
  flex: 1;
}

.header-title {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.title-main {
  font-size: var(--font-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.025em;
}

.title-sub {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
  font-weight: 400;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: stretch;
    padding: var(--spacing-md);
  }

  .header-left {
    text-align: center;
  }

  .header-title {
    align-items: center;
  }

  .title-main {
    font-size: var(--font-xl);
  }

  .header-right {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .header-right :deep(.button-label) {
    display: none;
  }
}
</style>

