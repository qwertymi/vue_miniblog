import axios from "axios";

// 데이터 불러오기
// const storage = {
//   getData() {
//     const arr = [];
//     const total = localStorage.length;

//     if (total > 0) {
//       for (let i = 0; i < total; i++) {
//         let obj = localStorage.getItem(localStorage.key(i));
//         arr.push(JSON.parse(obj));
//       }
//       arr.sort((a, b) => {
//         if (a.id > b.id) return 1;
//         if (a.id === b.id) return 0;
//         if (a.id < b.id) return -1;
//       });
//     }
//     return arr;
//   }
// }

const timeUtil = {
  addZero(n) {
    return n < 10 ? "0" + n : n;
  },
  // 현재 시간을 리턴
  getCurrentDate() {
    let date = new Date();
    return (
      date.getFullYear().toString() +
      this.addZero(date.getMonth() + 1) +
      this.addZero(date.getDate()) +
      this.addZero(date.getHours()) +
      this.addZero(date.getMinutes()) +
      this.addZero(date.getSeconds())
    );
  },
  getCurrentTime() {
    let date = new Date();
    return (
      date.getFullYear().toString() +
      "년 " +
      this.addZero(date.getMonth() + 1) +
      "월 " +
      this.addZero(date.getDate()) +
      "일 " +
      this.addZero(date.getHours()) +
      ":" +
      this.addZero(date.getMinutes())
    );
  },
};

const state = {
  headerText: "TODO List",
  memoArr: [],
  iconArr: ["icon1.png", "icon2.png", "icon3.png"],
};
const actions = {
  fetchReadMemo(context) {
    axios
      .get("http://kimhyemi.dothome.co.kr/page-miniblog/read.php")
      .then((response) => {
        // console.log(response.data);
        context.commit("READ_MEMO", response.data.result);
      })
      .catch((err) => console.log(err));
  },
  fetchAddMemo(context, obj) {
    let addData = {
      user: timeUtil.getCurrentDate(),
      title: obj.item,
      date: timeUtil.getCurrentTime(),
      icon: state.iconArr[obj.index],
    };
    axios
      .get(
        `http://kimhyemi.dothome.co.kr/page-miniblog/write.php?user=${addData.user}&title=${addData.title}&date=${addData.date}&icon=${addData.icon}`
      )
      .then((res) => {
        if (res.data.result == 1) {
          console.log("목록가져오기");
          context.commit("ADD_MEMO", addData);
        } else {
          console.log("error");
        }
      })
      .catch((err) => console.log(err));
  },

  fetchDeleteMemo({ commit }, obj) {
    console.log("삭제", obj);
    axios
      .get(
        `http://kimhyemi.dothome.co.kr/page-miniblog/delete.php?id=${obj.id}`
      )
      .then((res) => {
        console.log("서버회신", res.data);
        commit("DELETE_MEMO", obj);
      })
      .catch((err) => console.log(err));
  },

  fetchUpdateMemo({ commit }, obj) {
    let complete = 1;
    if (obj.item.complete == true) {
      complete = 0;
    } else {
      complete = 1;
    }
    axios
      .get(
        `http://kimhyemi.dothome.co.kr/page-miniblog/update.php?id=${obj.item.id}&complete=${complete}`
      )
      .then((res) => {
        console.log("업데이트", res.data);
        commit("UPDATE_MEMO", obj);
      })
      .catch((err) => console.log(err));
  },
  fetchDeleteAllMemo({ commit }) {
    axios
      .get("http://kimhyemi.dothome.co.kr/page-miniblog/delete.php?id=all")
      .then((res) => {
        console.log("전체삭제", res.data);
        commit("DELETE_ALL_MEMO");
      })
      .catch((err) => console.log(err));
  },
};
const mutations = {
  READ_MEMO(state, payload) {
    // state.complete를 T/F 로 교체
    payload.forEach((item) => {
      if (item.complete === "0") {
        item.complete = false;
      } else {
        item.complete = true;
      }
    });
    state.memoArr = payload;
  },
  ADD_MEMO(state, payload) {
    // let memoTemp = {
    //   id: timeUtil.getCurrentDate(),
    //   complete: false,
    //   memotitle: payload.item,
    //   memodate: timeUtil.getCurrentTime(),
    //   memoicon: state.iconArr[payload.index]
    // };
    // localStorage.setItem(memoTemp.id, JSON.stringify(memoTemp));
    // state.memoArr.push(memoTemp);

    // ------------------
    // axois 이용 > 목록을 가져오고 1개를 추가
    axios
      .get(
        `http://kimhyemi.dothome.co.kr/page-miniblog/get.php?user=${payload.user}`
      )
      .then((res) => {
        const obj = res.data.result[0];
        obj.complete = false;
        state.memoArr.push(obj);

        // state.memoArr.push(res.data.result[0]);
        // state.memoArr.push()
      })
      .catch((err) => console.log(err));
  },
  // 아이템 삭제
  DELETE_MEMO(state, payload) {
    // localStorage.removeItem(payload.item);
    state.memoArr.splice(payload.index, 1);
    // state.memoArr.sort((a, b) => {
    //   if (a.id > b.id) return 1;
    //   if (a.id === b.id) return 0;
    //   if (a.id < b.id) return -1;
    // });
  },
  // 아이템 업데이트
  UPDATE_MEMO(state, payload) {
    // localStorage.removeItem(payload.item.id);
    state.memoArr[payload.index].complete =
      !state.memoArr[payload.index].complete;
    // localStorage.setItem(payload.item.id, JSON.stringify(payload.item));

    // 키값을 이용해서 정렬하기(오름차순)
    // state.memoArr.sort((a, b) => {
    //   if (a.id > b.id) return 1;
    //   if (a.id === b.id) return 0;
    //   if (a.id < b.id) return -1;
    // });
  },
  // 아이템 전체 삭제
  DELETE_ALL_MEMO(state) {
    // localStorage.clear();
    state.memoArr.splice(0);
  },
};
const getters = {
  getMemoArr(state) {
    // 조건에 따라 다른 결과물을 냄
    return state.memoArr;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
