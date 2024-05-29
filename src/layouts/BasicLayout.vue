<template>
  <div>
    <el-container class="firstContainer">
      <el-header>
        <el-menu :default-active="activeMenu" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">Home</el-menu-item>
          <el-menu-item index="2">Upload</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const activeMenu = ref('1');
const router = useRouter();

const handleSelect = (index) => {
  if (index === '1') {
    router.push('/');
    activeMenu.value = '1';
  } else if (index === '2') {
    router.push('/sendEmail');
    activeMenu.value = '2';
  }
};
</script>

<style scoped>
.firstContainer{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>