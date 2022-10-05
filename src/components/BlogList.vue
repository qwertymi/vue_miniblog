<template>
  <div class="list-wrap">
    <TransitionGroup name="list" tag="ul">
      <!-- 새로고침없이 업데이트를 위해 props(memodata) 이용 -->
      <li v-for="(item, index) in items" :key="index" class="shadow">
        <i
          class="far fa-check-square checkbt"
          @click="updateMemo(item, index)"
          :class="{ memoComplete: item.complete }"
        ></i>

        <span :class="{ memoCompleteTxt: item.complete }">{{
          item.memotitle
        }}</span>

        <div class="info">
          <span
            class="icon"
            :style="{
              backgroundImage:
                'url(' + require(`@/assets/images/${item.memoicon}`) + ')',
            }"
          ></span>
          <span class="date">{{ item.memodate }}</span>
          <span class="rmbt" @click="removeMemo(item.id, index)"
            ><i class="far fa-trash-alt"></i
          ></span>
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    // php서버
    store.dispatch("fetchReadMemo");
    const items = computed(() => store.getters.getMemoArr);

    const removeMemo = (id, index) => {
      // context.emit('removeitem', item, index);
      // store.commit('DELETE_MEMO', {item, index})
      console.log("삭제버튼", id);
      store.dispatch("fetchDeleteMemo", { id, index });
    };

    // check
    const updateMemo = (item, index) => {
      // context.emit("updateitem", item, index)
      // store.commit('UPDATE_MEMO', {item, index})
      store.dispatch("fetchUpdateMemo", {
        item,
        index,
      });
    };

    return {
      removeMemo,
      updateMemo,
      items,
    };
  },
};
</script>

<style>
ul {
  width: 97.9%;
  margin: 0 auto;
}

li {
  display: flex;
  min-height: 50px;
  line-height: 50px;
  margin: 10px;
  background-color: #fff;
  border-radius: 5px;
  padding: 5px 20px;
}

.info {
  margin-left: auto;
}

.icon {
  display: inline-block;
  vertical-align: middle;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.date {
  vertical-align: middle;
}

.rmbt {
  display: inline-block;
  widows: 10px;
  height: 10px;
  margin: auto 0;
  cursor: pointer;
  margin-left: 10px;
  color: #ddd;
  transition: color 0.3s;
}

.rmbt:hover {
  color: pink;
}

.checkbt {
  color: #ddd;

  line-height: 50px;
  margin-right: 10px;
  cursor: pointer;
}

.memoComplete {
  color: hotpink;
}

.memoCompleteTxt {
  color: hotpink;
  text-decoration: line-through;
}

/* 애니메이션 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
