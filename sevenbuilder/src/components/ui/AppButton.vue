<template>
  <button
    :class="['app-button', `variant-${variant}`, { 'with-icon': icon }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <img v-if="icon" :src="icon" :alt="label" class="button-icon" />
    <span v-if="label" class="button-label">{{ label }}</span>
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
});

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-sm);
  font-weight: 600;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  outline: none;
}

.app-button:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}

/* Variants */
.variant-primary {
  background: var(--color-primary);
  color: var(--color-text-primary);
}

.variant-primary:hover:not(:disabled) {
  background: var(--color-primary-dark);
  box-shadow: var(--shadow-glow);
  transform: translateY(-1px);
}

.variant-secondary {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.variant-secondary:hover:not(:disabled) {
  background: var(--color-bg-tertiary);
  border-color: var(--color-border-light);
}

.variant-danger {
  background: var(--color-error);
  color: var(--color-text-primary);
}

.variant-danger:hover:not(:disabled) {
  background: #dc2626;
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
}

.variant-ghost {
  background: transparent;
  color: var(--color-text-secondary);
}

.variant-ghost:hover:not(:disabled) {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

/* Icon */
.button-icon {
  width: 1.25rem;
  height: 1.25rem;
  filter: brightness(0) invert(1);
}

.with-icon.variant-ghost .button-icon {
  filter: none;
}

/* Disabled state */
.app-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

