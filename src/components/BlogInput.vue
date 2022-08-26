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
			const addItem = () => {
				let temp = newItem.value;
				// localStorage.setItem(키, 값_json)
				// json 저장
				// {complete: flase, title:메모내용, icon:파일명}

				temp = temp.trim()
				if (temp !== '') {
					localStorage.setItem(temp, temp)
					resetItem();
				}

			}
			const resetItem = () =>{
				newItem.value='';
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