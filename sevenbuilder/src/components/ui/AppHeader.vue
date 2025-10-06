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
          label="Save"
          variant="secondary"
          @click="$emit('save')"
        />
        <AppButton
          icon="/icons/icon-share.svg"
          label="Share"
          variant="primary"
          @click="$emit('share')"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppButton from './AppButton.vue';

defineEmits<{
  reset: [];
  save: [];
  share: [];
}>();
</script>

<style scoped>
.app-header {
  background: var(--color-bg-secondary);
  border-bottom: 2px solid var(--color-primary);
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1600px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
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
  font-size: var(--font-2xl);
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-sub {
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
  font-weight: 400;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
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

