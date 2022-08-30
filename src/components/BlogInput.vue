<template>
	<div class="input-wrap shadow">
		<input type="text" v-model="newItem" class="title" maxlength="40" @keyup.enter="addItem">

		<div class="option">
			<span @click="addIcon(0)" class="img1">
				이미지
			</span>
			<span @click="addIcon(1)" class="img2">
				이미지
			</span>

			<span @click="addItem" class="addbt">
				<i class="far fa-plus-square addbt-icon"></i>
			</span>
		</div>

	</div>
</template>

<script>
	import {
		ref
	} from 'vue'
	export default {
		setup(props, context) {
			const newItem = ref('');
			const newIcon = ref(0);

			const addItem = () => {
				let temp = newItem.value;
				let icon = newIcon.value;
				temp = temp.trim()

				if (temp !== '') {
					context.emit("additem", temp, icon);
					resetItem();
				}
			}
			const resetItem = () => {
				newItem.value = '';
			}

			const addIcon = (index) => {
				console.log(index);
				newIcon.value = index;
			}

			return {
				newItem,
				addItem,
				addIcon
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

	.title {
		border-style: none;
		width: 93%;
		font-size: 15px;
		font-family: 'IBM Plex Sans KR';
		caret-color: hotpink;
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
		background: url('@/assets/images/icon1.png') no-repeat center;
		background-size: cover;
	}

	.img2 {
		display: inline-block;
		width: 40px;
		height: 40px;
		font-size: 0;
		cursor: pointer;
		background: url('@/assets/images/icon2.png') no-repeat center;
		background-size: cover;
	}
	.img1:active, .img2:active{
		outline: 2px dashed hotpink;
	}

	.addbt {
		float: right;
		cursor: pointer;
		color: hotpink;
	}

	.addbt-icon {
		vertical-align: middle;
		font-size: 25px;
	}
</style>