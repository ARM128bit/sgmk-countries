<script setup lang="ts">
interface DefaultProps {
  show: boolean;
}

withDefaults(defineProps<DefaultProps>(), {
  show: false,
});
</script>
<template>
  <div v-if="show" class="loading">Загрузка</div>
</template>

<style lang="scss" scoped>
.loading {
  position: absolute;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
/*   background: rgb(0, 0, 0, 0.05) url("/src/assets/images/loader.svg") no-repeat
     center 70%;*/
  background-size: 100% 50px;
}
</style>
