import Vue from 'vue'
import App from './App'
// 挂载全局方法
import config from "./common/config.js"
Vue.prototype.config=config

import lib from "./common/lib.js"
Vue.prototype.lib=lib

import request from "./common/request.js";
Vue.prototype.$http = request;

import chat from "./common/chat.js";
Vue.prototype.$chat = chat;

import store from './store'
Vue.prototype.$store = store

import User from "./common/user.js"
Vue.prototype.User = User
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		store,
	config,
	lib,
})
app.$mount()
