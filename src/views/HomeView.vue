<script setup lang="ts">
import { ref } from 'vue';
import TextInput from '@components/ui/SgmkTextInput.vue';
import IconEmpty from '@components/icons/IconEmpty.vue';

const text = ref('')
</script>

<template>
  <main>
    <TextInput v-model="text" label="Поле поиска" id="test-text" placeholder="" />
    <IconEmpty />
  </main>
</template>
