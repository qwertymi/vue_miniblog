<template>
	<div class="list-wrap">
		<ul>
			<li v-for="(item,index) in memoArr" :key="index">
				{{item}}
				<span class="rmbt" @click="removeMemo(item, index)"><i class="far fa-trash-alt"></i></span>
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
					memoArr.push(localStorage.key(i));
				}
			}


			const removeMemo = (item, index) =>{
				// 로컬스토리지 key를 통해 지움
				localStorage.removeItem(item);
				// memoArr 에서도 삭제
				memoArr.splice(index, 1);
			}

			return {
				memoArr,
				removeMemo
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
		color: #333;
	}
</style>