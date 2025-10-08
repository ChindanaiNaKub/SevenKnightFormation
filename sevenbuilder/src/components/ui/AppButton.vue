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
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all var(--transition-normal);
  outline: none;
  border: 1px solid transparent;
  white-space: nowrap;
  min-height: 36px;
}

.app-button:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}

/* Variants */
.variant-primary {
  background: var(--color-primary);
  color: white;
  box-shadow: var(--shadow-sm);
}

.variant-primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
  box-shadow: var(--shadow-glow-hover);
  transform: translateY(-1px);
}

.variant-primary:active:not(:disabled) {
  transform: translateY(0);
}

.variant-secondary {
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-light);
  box-shadow: var(--shadow-sm);
}

.variant-secondary:hover:not(:disabled) {
  background: var(--color-bg-tertiary);
  border-color: var(--color-border-light);
  box-shadow: var(--shadow-md);
}

.variant-danger {
  background: var(--color-error);
  color: white;
  box-shadow: var(--shadow-sm);
}

.variant-danger:hover:not(:disabled) {
  background: #dc2626;
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
  transform: translateY(-1px);
}

.variant-ghost {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid transparent;
}

.variant-ghost:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text-primary);
  border-color: rgba(255, 255, 255, 0.1);
}

.variant-ghost:active:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
}

/* Icon */
.button-icon {
  width: 1.125rem;
  height: 1.125rem;
  filter: brightness(0) invert(1);
  opacity: 1;
}

.with-icon.variant-ghost .button-icon {
  filter: brightness(0) invert(1);
  opacity: 0.9;
}

.with-icon.variant-ghost:hover .button-icon {
  opacity: 1;
}

/* Disabled state */
.app-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

