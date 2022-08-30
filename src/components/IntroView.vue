<template>
  <div class="intro-wrap" @click="closeIntro">
    <h1>TODO List</h1>
    <div class="intro-cont">
      <img :src="require('@/assets/images/intro.png')" />
    </div>
  </div>
</template>

<script>
export default {
  setup(props, context) {
    const closeIntro = () => {
      context.emit('closeintro');
    }
    return {
      closeIntro
    }
  }
}
</script>

<style scoped>
  .intro-wrap {
    position: fixed;
    left: 0;
    top: 0;
    display: block;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, .8);
    color: #f77;
    text-align: center;
    cursor: pointer;
  }
  .intro-cont{
    margin-top: 50px;
  }
</style>