<template>
  <BasicLayout>
    <router-view></router-view>
  </BasicLayout>
</template>

<script setup lang="ts">
import BasicLayout from './layouts/BasicLayout.vue'

</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>

