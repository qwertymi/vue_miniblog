<template>
	<div class="list-wrap">
		<ul>
			<li v-for="(item,index) in memoArr" :key="index" class="shadow">

				<i class="far fa-check-square checkbt" @click="updateMemo(item)" :class="{memoComplete:item.complete}"></i>

				<span :class="{memoCompleteTxt:item.complete}">{{item.memotitle}}</span>
				<span class="rmbt" @click="removeMemo(item.id, index)"><i class="far fa-trash-alt"></i></span>
			</li>

		</ul>
	</div>
</template>

<script>
	import {ref,reactive} from 'vue'
	export default {
		setup() {
			// console.log(localStorage);
			const total = ref(0);
			total.value = localStorage.length;

			const memoArr = reactive([]);

			if (total.value > 0) {
				for (let i = 0; i < total.value; i++) {
        let obj = localStorage.getItem( localStorage.key(i) );

					memoArr.push(JSON.parse(obj));
				}
					// memoArr.sort();
			}

			const removeMemo = (item, index) =>{
				// 로컬스토리지 key를 통해 지움
				localStorage.removeItem(item);
				// memoArr 에서도 삭제
				memoArr.splice(index, 1);
			}

			// check
			const updateMemo = (item) => {
				// 로컬스토리지 - update 메소드 지원X
				localStorage.removeItem(item.id);
				item.complete = !item.complete;
				localStorage.setItem(item.id, JSON.stringify(item));
			}

			return {
				memoArr,
				removeMemo,
				updateMemo
			}
		}

	}
</script>

<style>
ul{
	width: 97.9%;
	margin: 0 auto;
}
	li{
		display: flex;
		min-height: 50px;
		line-height: 50px;
		margin: 10px;
		background-color: #fff;
		border-radius: 5px;
		padding:  0 20px;
	}
	.rmbt{
		cursor: pointer;
		margin-left: auto;
		color: #ddd;
		transition: color 0.3s;
	}
	.rmbt:hover{
		color: pink;
	}
	.checkbt{
		color: #ddd;
		
		line-height: 50px;
		margin-right: 10px;
		cursor: pointer;
	}

	.memoComplete{
		color: hotpink;
	}

		.memoCompleteTxt{
			color: hotpink;
			text-decoration: line-through;
		}

</style>