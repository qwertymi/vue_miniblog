<template>
	<div class="input-wrap shadow">
		<input type="text" v-model="newItem" class="title" maxlength="40" @keyup.enter="addItem">
		<!-- <button @click="addItem">추가</button> -->
		<span @click="addItem" class="addbt">
			<i class="far fa-plus-square addbt-icon"></i>
		</span>
	</div>
</template>

<script>
	import {
		ref
	} from 'vue'
	export default {
		setup() {
			const newItem = ref('')

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

			const addItem = () => {
				let temp = newItem.value;
				temp = temp.trim()

				if (temp !== '') {
					let memoTemp = {
						id: getCurrentDate(),
						complete: false,
						memotitle: newItem.value
					};
					localStorage.setItem(memoTemp.id, JSON.stringify(memoTemp));

					resetItem();
				}
			}
			const resetItem = () => {
				newItem.value = '';
			}

			return {
				newItem,
				addItem
			}
		}
	}
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

	.title{
		border-style: none;
		width: 93%;
		font-size: 15px;
		font-family: 'IBM Plex Sans KR';
		caret-color: hotpink;
	}
	.title:focus{
		outline: none;
	}
	.addbt{
		float: right;
		cursor: pointer;
		color: hotpink;
	}
	.addbt-icon{	
		vertical-align: middle;
		font-size: 25px;
	}

</style>