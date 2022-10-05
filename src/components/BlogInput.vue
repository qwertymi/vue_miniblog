<template>
  <div class="input-wrap shadow">
    <input
      type="text"
      v-model="newItem"
      class="title"
      maxlength="40"
      @keyup.enter="addItem"
      placeholder="할 일을 입력해주세요."
    />

    <div class="option">
      <span @click="addIcon(0)" class="img1"> 이미지 </span>
      <span @click="addIcon(1)" class="img2"> 이미지 </span>
      <span @click="addIcon(2)" class="img3"> 이미지 </span>

      <span @click="addItem" class="addbt">
        <i class="far fa-plus-square addbt-icon"></i>
      </span>
    </div>
    <!-- 입력경고 modal -->
    <ModalView :show="showModal" @closemodal="showModal = false">
      <template #header>
        <h4>알림</h4>
      </template>
      <template #body>
        <span>내용을 작성하세요.</span>
      </template>
    </ModalView>
  </div>
</template>

<script>
import ModalView from "@/components/common/ModalView.vue";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  components: {
    ModalView,
  },
  setup() {
    const store = useStore();

    const newItem = ref("");
    const newIcon = ref(0);
    const showModal = ref(false);

    const addItem = () => {
      let temp = newItem.value;
      let icon = newIcon.value;
      temp = temp.trim();

      if (temp !== "") {
        // context.emit("additem", temp, icon);

        // store.commit('ADD_MEMO', {item: temp, index: icon});
        store.dispatch("fetchAddMemo", { item: temp, index: icon });

        resetItem();
      } else {
        showModal.value = true;
      }
    };
    const resetItem = () => {
      newItem.value = "";
    };

    const addIcon = (index) => {
      console.log(index);
      newIcon.value = index;
    };

    return {
      showModal,
      newItem,
      addItem,
      addIcon,
    };
  },
};
</script>

<style>
.input-wrap {
  margin: 20px;

  position: relative;
  display: block;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  border-radius: 7px;
  overflow: hidden;
  padding-left: 3%;
  padding-right: 2%;
}

.title {
  border-style: none;
  width: 93%;
  font-size: 15px;
  font-family: "IBM Plex Sans KR";
  caret-color: hotpink;
}
.title::placeholder {
  color: pink;
}

.title:focus {
  outline: none;
}

.option {
  position: absolute;
  right: 2%;
  top: 0;
  display: inline-block;
}

.img1 {
  display: inline-block;
  width: 40px;
  height: 40px;
  font-size: 0;
  cursor: pointer;
  background: url("@/assets/images/icon1.png") no-repeat center;
  background-size: cover;
}

.img2 {
  display: inline-block;
  width: 40px;
  height: 40px;
  font-size: 0;
  cursor: pointer;
  background: url("@/assets/images/icon2.png") no-repeat center;
  background-size: cover;
}

.img3 {
  display: inline-block;
  width: 40px;
  height: 40px;
  font-size: 0;
  cursor: pointer;
  background: url("@/assets/images/icon3.png") no-repeat center;
  background-size: cover;
}

.img1:active,
.img2:active,
.img3:active {
  outline: 2px dashed hotpink;
}

.addbt {
  float: right;
  cursor: pointer;
  color: hotpink;
  margin-left: 10px;
}

.addbt-icon {
  vertical-align: middle;
  font-size: 25px;
}
</style>
