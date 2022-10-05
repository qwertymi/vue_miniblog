<template>
  <header class="header">
    <div class="logo">
    <h1>{{ title }}</h1>
      <img :src="require('@/assets/images/logo.png')" />
    </div>
  </header>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const title = ref("");
    const store = useStore();
    title.value = store.state.headerText;

    return {
      title,
    };
  },
};
</script>

<style>
h1 {
  padding-top: 20px;
  text-align: center;
  font-weight: 500;
}
</style>
