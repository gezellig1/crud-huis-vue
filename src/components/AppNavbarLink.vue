<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <router-link
    :to="to"
    class="inactive-menu"
    active-class="active-menu"
  >
    <slot></slot>
  </router-link>
</template>

<style scoped>
/* ============
  Active inactive format
  ============ */
/*First inactive-menu, then active-menu, otherwise won't work*/

.inactive-menu {
  font-family: "Montserrat", sans-serif;
  font-size: 1.125rem;
  font-weight: 500; /* Medium */
  color: var(--text-secondary);
}

.active-menu {
  font-family: "Montserrat", sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
}
</style>
