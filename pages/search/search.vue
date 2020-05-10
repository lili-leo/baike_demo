<template>
	<view>
		搜索页面
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onNavigationBarButtonTap(e){
			console.log(e)
			uni.navigateBack({
				delta: 1
			});
		},
		onNavigationBarSearchInputChanged(e){
			// alert("监听搜索框值得变化")
			console.log(e)
		},
		onNavigationBarSearchInputConfirmed(){
			alert("监听输入框搜索按钮")
		},
		methods: {
			
		}
	}
</script>

<style scoped>

</style>
