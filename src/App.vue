<template>
  <div class="wrap">
    <BlogHeader />
    <BlogInput @additem="addMemo" />
    <BlogList :memodata="memoArr" @removeitem="deleteMemo" @updateitem="updateMemo" />
    <BlogFooter @deleteitem="deleteAllMemo" />
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
    reactive
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
      const total = ref(0);
      total.value = localStorage.length;

      const memoArr = reactive([]);

      if (total.value > 0) {
        for (let i = 0; i < total.value; i++) {
          let obj = localStorage.getItem(localStorage.key(i));

          memoArr.push(JSON.parse(obj));
        }
        // memoArr.sort();
      }


      // 현재시간계산, 중복되지않는 값을 저장
      // 10보다 작은 값에 0을 붙임
      const addZero = (n) => {
        return n < 10 ? '0' + n : n;
      }
      // 현재 시간을 리턴
      const getCurrentDate = () => {
        let date = new Date();
        return date.getFullYear().toString() + addZero(date.getMonth() + 1) + addZero(date.getDate()) +
          addZero(date.getHours()) + addZero(date.getMinutes()) + addZero(date.getSeconds());
      }
      const getCurrentTime = () => {
        let date = new Date();
        return date.getFullYear().toString() + "년 " + addZero(date.getMonth() + 1) + "월 " + addZero(date.getDate()) +
          "일 " +
          addZero(date.getHours()) + ":" + addZero(date.getMinutes())
      }

      const iconArr = ['icon1.png', 'icon2.png'];

      const addMemo = (item, index) => {
        let memoTemp = {
          id: getCurrentDate(),
          complete: false,
          memotitle: item,
          memodate: getCurrentTime(),
          memoicon: iconArr[index]
        };
        localStorage.setItem(memoTemp.id, JSON.stringify(memoTemp));
        memoArr.push(memoTemp);
      }


      const deleteMemo = (item, index) => {
        // 로컬스토리지 key를 통해 지움
        localStorage.removeItem(item);

        // memoArr 에서도 삭제
        memoArr.splice(index, 1);
      }
      // 키값을 이용해서 정렬하기(오름차순)
      memoArr.sort((a, b) => {
        if (a.id > b.id) return 1;
        if (a.id === b.id) return 0;
        if (a.id < b.id) return -1;
      });

      const updateMemo = (item, index) => {
        localStorage.removeItem(item.id);
        // item.complete = !item.complete;
        memoArr[index].complete = !memoArr[index].complete
        localStorage.setItem(item.id, JSON.stringify(item));

        // 키값을 이용해서 정렬하기(오름차순)
        memoArr.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id === b.id) return 0;
          if (a.id < b.id) return -1;
        });
      }

      const deleteAllMemo = () => {
        localStorage.clear();
        memoArr.splice(0);
      }

      const introShow = ref(true);
      const hideIntro = () => {
        introShow.value = false;
      }

      return {
        memoArr,
        addMemo,
        deleteMemo,
        updateMemo,
        deleteAllMemo,
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