<template>
  <div class="wrap">
    <BlogHeader />
    <BlogInput />
    <BlogList />
    <BlogFooter />
  </div>
</template>

<script>
  import BlogHeader from './components/BlogHeader.vue'
  import BlogInput from './components/BlogInput.vue'
  import BlogList from './components/BlogList.vue'
  import BlogFooter from './components/BlogFooter.vue'

  export default {
    name: 'App',
    components: {
      BlogHeader,
      BlogInput,
      BlogList,
      BlogFooter

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
  }
</style>