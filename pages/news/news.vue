<template>
	<view>
		<uni-nav-bar :statusBar="true" 
		 @clickLeft="back" @clickRight="backright">
		<!-- 左边 -->
		<block slot="left">
			<view class="iconfont icon-shanchu">左边</view>
		</block>
		<!-- 中间 -->
		<view @click="dianji">
			<text :class="['text',index==1?'active':'']" @tap="index=1">关注</text>
			<text :class="['text',index==2?'active':'']" @tap="index=2">话题</text>
		</view>
		<!-- 右边 -->
		<block slot="right">
			<view class="iconfont icon-selection">
				右边
			</view>
		</block>
		</uni-nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:1
			}
		},
		methods: {
			dianji(){
				uni.navigateTo({
					url: '../login/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
.text{
	color: #333333;
	font-size: 40rpx;
}
.active{
	color: #007AFF;
	border-bottom: 3px solid #09BB07;
}
</style>
