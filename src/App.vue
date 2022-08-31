<template>
  <div class="wrap">
    <BlogHeader />
    <BlogInput />
    <BlogList @removeitem="deleteMemo" @updateitem="updateMemo" />
    <BlogFooter />
    <IntroView @closeintro="hideIntro" v-if="introShow" />
  </div>
</template>

<script>
  import BlogHeader from './components/BlogHeader.vue'
  import BlogInput from './components/BlogInput.vue'
  import BlogList from './components/BlogList.vue'
  import BlogFooter from './components/BlogFooter.vue'
  import IntroView from './components/IntroView.vue'

  import {
    ref,

  } from 'vue';

  export default {
    name: 'App',
    components: {
      BlogHeader,
      BlogInput,
      BlogList,
      BlogFooter,
      IntroView
    },
    setup() {

      const introShow = ref(true);
      const hideIntro = () => {
        introShow.value = false;
      }

      return {
        hideIntro,
        introShow
      }
    }
  }
</script>

<style>
  @charset 'utf-8';
  @import url('https://fonts.googleapis.com/css2?family=Hahmlet:wght@100;200;300;400;500;600;700;800;900&family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  img {
    vertical-align: middle;
    border: 0;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  html {
    font-size: 16px;
    overflow-x: hidden;
  }

  body {
    font-family: 'IBM Plex Sans KR', 'Hahmlet', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: -0.64px;
    color: #000;
    background-color: rgb(240, 233, 233);
  }

  .shadow {
    box-shadow: 10px 7px 10px 1px rgba(124, 102, 102, .18);
  }

  .wrap {
    position: relative;
    display: block;
    width: 90%;
    margin: 0 auto;
  }
</style>