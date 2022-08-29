<template>
  <div class="wrap">
    <span class="all-rmbt" @click="allRmMemo">Clear All</span>
    <span class="copy">Copyright 2022 by KIMHYEMI</span>
  </div>
</template>

<script>

export default {
  setup(){
      const allRmMemo = () =>{
        localStorage.clear();
      }
    return{
      allRmMemo
    }
  }
}
</script>

<style scoped>
.wrap{
  position: relative;
  display: block;
  width: 50%;
  /* height: 50px; */
  line-height: 48px;
  /* background-color: #fff; */
  text-align: center;
  margin: 0 auto;
  border-radius: 5px;
}
.all-rmbt{
  display: inline-block;
  width: 80%;
  height: 50px;
  cursor: pointer;
  border: 1px solid pink;
  border-radius: 5px;
  margin: 10px 0;
  background-color: rgba(255, 255, 255, 0.3);
  color: #555;
  transition: all 0.3s;
}
.all-rmbt:hover{
  color: hotpink;
  background-color: rgba(255, 255, 255, 1);
}
.copy{
  display: block;
  font-size: 10px;
  white-space: nowrap;
}
</style>