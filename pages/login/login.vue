<template>
    <view>
        <!-- <page-head :title="title"></page-head> -->
        <view>微信登录</view>
		<view>
			<button type="primary" class="page-body-button" v-for="(value,key) in providerList" @click="tologin(value)"
			    :key="key">{{value.name}}</button>
		</view>
		<view>微信登录</view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                title: 'login',
                providerList: []
            }
        },
        computed: {
        },
        onLoad() {
            uni.getProvider({
                service: 'oauth',
                success: (result) => {
                    this.providerList = result.provider.map((value) => {
                        let providerName = '';
                        switch (value) {
                            case 'weixin':
                                providerName = '微信登录'
                                break;
                            case 'qq':
                                providerName = 'QQ登录'
                                break;
                            case 'sinaweibo':
                                providerName = '新浪微博登录'
                                break;
                            case 'xiaomi':
                                providerName = '小米登录'
                                break;
                            case 'alipay':
                                providerName = '支付宝登录'
                                break;
                            case 'baidu':
                                providerName = '百度登录'
                                break;
                            case 'toutiao':
                                providerName = '头条登录'
                                break;
                            case 'apple':
                                providerName = '苹果登录'
                                break;
                        }
                        return {
                            name: providerName,
                            id: value
                        }
                    });

                },
                fail: (error) => {
                    console.log('获取登录通道失败', error);
                }
            });
        },
        methods: {
            tologin(provider) {
                uni.login({
                    provider: provider.id,
                    // #ifdef MP-ALIPAY
                    scopes: 'auth_user', //支付宝小程序需设置授权类型
                    // #endif
                    success: (res) => {
                        console.log('login success:', res);
                        // 更新保存在 store 中的登录状态
                        this.login(provider.id);
                    },
                    fail: (err) => {
                        console.log('login fail:', err);
                    }
                });
            }
        }
    }
</script>

<style>
    button {
        background-color: #007aff;
        color: #ffffff;
    }
</style>
