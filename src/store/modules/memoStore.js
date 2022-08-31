// 데이터 불러오기
const storage = {
  getData() {
    const arr = [];
    const total = localStorage.length;

    if (total > 0) {
      for (let i = 0; i < total; i++) {
        let obj = localStorage.getItem(localStorage.key(i));
        arr.push(JSON.parse(obj));
      }
      arr.sort((a, b) => {
        if (a.id > b.id) return 1;
        if (a.id === b.id) return 0;
        if (a.id < b.id) return -1;
      });
    }
    return arr;
  }
}

const timeUtil = {
  addZero(n) {
    return n < 10 ? '0' + n : n;
  },
  // 현재 시간을 리턴
  getCurrentDate() {
    let date = new Date();
    return date.getFullYear().toString() + this.addZero(date.getMonth() + 1) + this.addZero(date.getDate()) +
      this.addZero(date.getHours()) + this.addZero(date.getMinutes()) + this.addZero(date.getSeconds());
  },
  getCurrentTime() {
    let date = new Date();
    return date.getFullYear().toString() + "년 " + this.addZero(date.getMonth() + 1) + "월 " + this.addZero(date.getDate()) +
      "일 " +
      this.addZero(date.getHours()) + ":" + this.addZero(date.getMinutes())
  }

}


const state = {
  headerText: 'TODO List',
  memoArr: storage.getData(),
  iconArr: ['icon1.png', 'icon2.png']
};
const actions = {
  fetchAddMemo(context, obj) {
    context.commit("ADD_MEMO", obj);
  },
  fetchDeleteMemo({
    commit
  }, obj) {
    commit("DELETE_MEMO", obj);
  },
  fetchUpdateMemo({
    commit
  }, obj) {
    commit("UPDATE_MEMO", obj);
  },
  fetchDeleteAllMemo({
    commit
  }) {
    commit("DELETE_ALL_MEMO");
  }
};
const mutations = {
  ADD_MEMO(state, payload) {
    let memoTemp = {
      id: timeUtil.getCurrentDate(),
      complete: false,
      memotitle: payload.item,
      memodate: timeUtil.getCurrentTime(),
      memoicon: state.iconArr[payload.index]
    };
    console.log('mutationsmemoTemp:', memoTemp);
    localStorage.setItem(memoTemp.id, JSON.stringify(memoTemp));
    state.memoArr.push(memoTemp);
  },
  // 아이템 삭제
  DELETE_MEMO(state, payload) {
    localStorage.removeItem(payload.item);
    state.memoArr.splice(payload.index, 1);
    state.memoArr.sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id === b.id) return 0;
      if (a.id < b.id) return -1;
    });
  },
  // 아이템 업데이트
  UPDATE_MEMO(state, payload) {
    localStorage.removeItem(payload.item.id);
    state.memoArr[payload.index].complete = !state.memoArr[payload.index].complete;
    localStorage.setItem(payload.item.id, JSON.stringify(payload.item));

    // 키값을 이용해서 정렬하기(오름차순)
    state.memoArr.sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id === b.id) return 0;
      if (a.id < b.id) return -1;
    });
  },
  // 아이템 전체 삭제
  DELETE_ALL_MEMO(state) {
    localStorage.clear();
    state.memoArr.splice(0);
  }
};
const getters = {
  getMemoArr(state) {
    // 조건에 따라 다른 결과물을 냄
    return state.memoArr;
  }
};

export default {state, actions, mutations, getters}