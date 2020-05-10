<template>
	<view>
		<uni-popup ref="showpopup" type="center" @change="change">
			<view class="pop-text">
				<image src="../../static/logo.png"  style="height:80px;width: 100%;"></image>
				<view>111111</view>
				<view>222222</view>
				<view>333333</view>
				<view>444444</view>
				<button type="primary" @tap="hide">知道了</button>
			</view>
			</uni-popup>
		<uni-nav-bar :statusBar="true" left-icon="arrowleft" 
		rightText="发布" @clickLeft="back" @clickRight="backright">
			<view class="flex-juzhong" @click="yinsi">
				{{yins}}
				<view class="iconfont icon-share">
				</view>
			</view>
		</uni-nav-bar>
		<!-- 多行输入框 -->
		<view class="uni-text">
			<textarea v-model="chushi" placeholder="说句话吧" />
		</view>
		<view>{{chushi}}</view>
		<!-- 上传多图 -->
		<view class="uni-list list-pd">
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
					<view class="uni-uploader-head">
						<view class="uni-uploader-title">点击可预览选好的图片</view>
						<view class="uni-uploader-info">{{imageList.length}}/9</view>
					</view>
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<block v-for="(image,index) in imageList" :key="index">
								<view class="uni-uploader__file">
									<view class="iconfont icon-shanchu" @click="detel(index)"></view>
									<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
								</view>
							</block>
							<view class="uni-uploader__input-box">
								<view class="uni-uploader__input" @tap="chooseImage"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	let look=["所有人可见","仅自己可见"]
	export default {
		data() {
			return {
				content:"娃哈哈",
				yins:"所有人可见",
				chushi:"娃哈哈",
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		watch:{
			chushi(newval,oldval){
				console.log(newval)
			}
		},
		onLoad() {
			this.$nextTick(() => {
				this.$refs['showpopup'].open()
			})
		},
		onBackPress(){
			uni.showModal({
			    title: '提示',
			    content: '是否保持为草稿',
			    success: (res)=> {
			        if (res.confirm) {
			            console.log('用户点击确定');
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
			return true
		},
		methods: {
			change(){
				console.log(11)
			},
			hide(){
				this.$refs['showpopup'].close()
			},
			detel(i){
				console.log(i)
				uni.showModal({
				    title: '提示',
				    content: '是否确认删除',
				    success:res=> {
				        if (res.confirm) {
							console.log(this.imageList)
							this.imageList.splice(i,1)
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			back(){
				console.log("back")
				if(!this.imageList.length && !this.chushi.length){
					return false
				}
				console.log(this.imageList+this.chushi)
				uni.showModal({
				    title: '提示',
				    content: '是否保持为草稿',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							uni.navigateBack({
								delta: 1
							});
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			backright(){
				console.log("发布")
			},
			yinsi(){
				uni.showActionSheet({
				    itemList: look,
				    success: res=> {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						this.yins=look[res.tapIndex]
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			chooseImage: async function() {
					// #ifdef APP-PLUS
					// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
					if (this.sourceTypeIndex !== 2) {
						let status = await this.checkPermission();
						if (status !== 1) {
							return;
						}
					}
					// #endif
			
					// if (this.imageList.length === 9) {
					// 	let isContinue = await this.isFullImg();
					// 	console.log("是否继续?", isContinue);
					// 	if (!isContinue) {
					// 		return;
					// 	}
					// }
					uni.chooseImage({
						sourceType: sourceType[this.sourceTypeIndex],
						sizeType: sizeType[this.sizeTypeIndex],
						count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
						success: (res) => {
							this.imageList = this.imageList.concat(res.tempFilePaths);
						},
						fail: (err) => {
							// #ifdef APP-PLUS
							if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
								this.checkPermission(err.code);
							}
							// #endif
							// #ifdef MP
							uni.getSetting({
								success: (res) => {
									let authStatus = false;
									switch (this.sourceTypeIndex) {
										case 0:
											authStatus = res.authSetting['scope.camera'];
											break;
										case 1:
											authStatus = res.authSetting['scope.album'];
											break;
										case 2:
											authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
											break;
										default:
											break;
									}
									if (!authStatus) {
										uni.showModal({
											title: '授权失败',
											content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
											success: (res) => {
												if (res.confirm) {
													uni.openSetting()
												}
											}
										})
									}
								}
							})
							// #endif
						}
					})
				},
				// isFullImg: function() {
				// 	return new Promise((res) => {
				// 		uni.showModal({
				// 			content: "已经有9张图片了,是否清空现有图片？",
				// 			success: (e) => {
				// 				if (e.confirm) {
				// 					this.imageList = [];
				// 					res(true);
				// 				} else {
				// 					res(false)
				// 				}
				// 			},
				// 			fail: () => {
				// 				res(false)
				// 			}
				// 		})
				// 	})
				// },
				previewImage: function(e) {
					var current = e.target.dataset.src
					uni.previewImage({
						current: current,
						urls: this.imageList
					})
				},
				async checkPermission(code) {
					let type = code ? code - 1 : this.sourceTypeIndex;
					let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
						await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
							'android.permission.READ_EXTERNAL_STORAGE');
			
					if (status === null || status === 1) {
						status = 1;
					} else {
						uni.showModal({
							content: "没有开启权限",
							confirmText: "设置",
							success: function(res) {
								if (res.confirm) {
									permision.gotoAppSetting();
								}
							}
						})
					}
			
					return status;
				}
		}
	}
</script>

<style scoped lang="scss">
	.pop-text{
		width: 500rpx;
		background-color: #FFFFFF;
	}
	.uni-navbar__content_view{
		justify-content: center;
	}
.flex-juzhong{
	display: flex;
	justify-content: center;
	align-items: center;
}
.uni-text{
	width: 100%;
	background-color: #4CD964;
}
.uni-uploader__file{
	position: relative;
	.icon-shanchu{
		position: absolute;
		right: 0;
		top: 0;
		background-color:#f7652e;
		width: 40rpx;
		font-size: 20px;
		z-index: 2;
	}
}
.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}
	.popup-content {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		background-color: #fff;
		padding: 15px;
		font-size: 14px;
	}
</style>
