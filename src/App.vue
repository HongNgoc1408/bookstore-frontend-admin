<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
}
</script>
<template>
  <div id="app">
    <div>
      <AppHeader v-if="$route.path.includes('/admin')" />
      <div class="container mt-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>