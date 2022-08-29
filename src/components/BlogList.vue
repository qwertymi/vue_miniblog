<template>
	<div class="list-wrap">
		<ul>
			<!-- 새로고침없이 업데이트를 위해 props(memodata) 이용 -->
			<li v-for="(item,index) in memodata" :key="index" class="shadow">

				<i class="far fa-check-square checkbt" @click="updateMemo(item)" :class="{memoComplete:item.complete}"></i>

				<span :class="{memoCompleteTxt:item.complete}">{{item.memotitle}}</span>
				<span class="rmbt" @click="removeMemo(item.id, index)"><i class="far fa-trash-alt"></i></span>
			</li>

		</ul>
	</div>
</template>

<script>
	export default {
		props:['memodata'],

		setup(props, context) {

			const removeMemo = (item, index) =>{
				context.emit('removeitem', item, index);
			}

			// check
			const updateMemo = (item) => {
				context.emit("updateitem", item)
			}

			return {
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