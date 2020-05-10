<template>
	<view>
		<view>
			<scroll-view scroll-x class="scroll-h">
				<view v-for="(tab,i) in tabBars" :key="i"
				@tap="change(i)"
				:class="['uni-tab-item','tablist',tabindex==i?'tablistl':'']">
					{{tab.name}}
				</view>
			</scroll-view>
		</view>
		<swiper style="height:800rpx;" :current="tabindex" :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000" @change="tabchange">		
			<swiper-item v-for="(item,ii) in newslist" :key="ii">
				<scroll-view lower-threshold=-200 scroll-y="true" style="height:100%;" @scrolltolower="chudi" @scrolltoupper="ding">
					<block>
						上拉加载更多
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<view class="swiper-item">{{item.list}}</view>
					<!-- 上拉加载更多 -->
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<!-- <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" 
		:scroll-into-view="scrollInto">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" 
			:data-current="index" @click="ontabtap">
				<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
			</view>
		</scroll-view> -->
		
		
		<view class="index-list">
			<view class="index1">
				<view class="iconfont icon-play">名称</view>
				<view class="iconfont icon-play">关注</view>
			</view>
			<view class="index2" @tap="godetail">我是标题我是标题我是标题</view>
			<view class="index3" @tap="godetail">
				<image src="../../static/logo.png" mode=""></image>
				<view class="iconfont icon-privac_open play" @click="guanzhu">播放</view>
				<view class="play1">20万播放</view>
			</view>
			<view class="index4">
				<view>
					<view class="iconfont icon-selection">111</view>
					<view class="iconfont icon-prompt">222</view>
				</view>
				<view>
					<view class="iconfont icon-icon-test4">333</view>
					<view class="iconfont icon-share">4444</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabindex:0,
				title: 'Hello',
				list:[{
					userpic:"",
					name:"昵称",
					isguanzhu:false,
					title:"",
					type:"img",//img图文  video 视频
					titlepic:"",
					infonum:{
						index:0,//0代表还没有操作  1顶  2踩
						dingmun:11,
						cainum:11
					},
					commentnum:0,
					sharenum:0
				},{
					userpic:"",
					name:"昵称",
					isguanzhu:false,
					title:"",
					type:"img",//img图文  video 视频
					titlepic:"",
					infonum:{
						index:0,//0代表还没有操作  1顶  2踩
						dingmun:11,
						cainum:11
					},
					commentnum:0,
					sharenum:0
				}],
				tabBars: [{
					name: '关注',
					id: 'guanzhu'
				}, {
					name: '推荐',
					id: 'tuijian'
				}, {
					name: '体育',
					id: 'tiyu'
				}, {
					name: '热点',
					id: 'redian'
				}, {
					name: '财经',
					id: 'caijing'
				}, {
					name: '娱乐',
					id: 'yule'
				}, {
					name: '军事',
					id: 'junshi'
				}, {
					name: '历史',
					id: 'lishi'
				}, {
					name: '本地',
					id: 'bendi'
				}],
				newslist:[
					{
						list:1111
					},{
						list:2222
					},{
						list:3333
					},{
						list:4444
					},{
						list:5555
					},{
						list:6666
					},{
						list:7777
					},{
						list:8888
					},{
						list:9999
					}
				]
			}
		},
		onLoad() {

		},
		onNavigationBarSearchInputClicked(){
			// uni.navigateTo({
			// 	url: '../search/search',
			// 	success: res => {},
			// 	fail: () => {},
			// 	complete: () => {}
			// });
		},
		onNavigationBarButtonTap(e){
			console.log(e)
			if(e.index==1){
				uni.navigateTo({
					url: '../add-input/add-input',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onReachBottom(){
			// alert(333)
			// uni.navigateTo({
			// 	url: '../search/search',
			// 	success: res => {},
			// 	fail: () => {},
			// 	complete: () => {}
			// });
		},
		methods: {
			change(i){
				this.tabindex=i
			},
			tabchange(e){
				this.tabindex=e.detail.current
			},
			chudi(){
				// alert(1111)
			},
			ding(){
				// alert(222)
			},
			guanzhu(){
				uni.showToast({
				    title: '标题',
				    duration: 2000
				});
			},
			godetail(){
				console.log("进入详情页")
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

<style lang="scss">
	.scroll-h{
		display: flex;
		white-space: nowrap;
	}
	.uni-tab-item{
		display: inline-block;
		flex-wrap: nowrap;
		padding-left: 34rpx;
		padding-right: 34rpx;
	}
	.tablist{
		color: #fa7341;
	}
	.tablistl{
		color: #2177c7;
	}
	.index-list{
		padding: 20rpx;
		.index1{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.index3{
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			// text-align: center;
			.play{
				position: absolute;
				// top: 50%;
				// left: 50%;
				// transform: translate(-50%,-50%);
			}
			.play1{
				position: absolute;
				right: 50rpx;
				bottom: 0;
				// top: 50%;
				// left: 50%;
				// transform: translate(-50%,-50%);
			}
		}
		.index4{
			display: flex;
			justify-content: space-between;
		}
		.index4>view{
			display: flex;  
			align-items: center;
			view{
				font-size: 40rpx;
			}
		}
	}
</style>
