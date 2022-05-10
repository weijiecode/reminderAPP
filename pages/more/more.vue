<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<view class="topback">
					<view class="allbtnsty" v-show="showtype==0">
						<view class="btnsty">
							<span id="typetop" class="t-icon t-icon-checkbox1-copy"></span>
						</view>
						<view class="btnsty1">
							<span @click="showtype=1" id="typetop" class="t-icon t-icon-checkbox"></span>
						</view>
					</view>
					<view class="allbtnsty" v-show="showtype==1">
						<view class="btnsty1">
							<span @click="showtype=0" id="typetop" class="t-icon t-icon-checkbox1"></span>
						</view>
						<view class="btnsty">
							<span id="typetop" class="t-icon t-icon-checkbox-copy"></span>
						</view>
					</view>
				</view>
				<view style="margin: 0 auto;padding-right: 40rpx;" class="title">
					应用
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback1">
			<view class="allbtnsty" v-show="showtype==0">
				<view class="btnsty">
					<span id="typetop" class="t-icon t-icon-checkbox1-copy"></span>
				</view>
				<view class="btnsty1">
					<span @click="showtype=1" id="typetop" class="t-icon t-icon-checkbox"></span>
				</view>
			</view>
			<view class="allbtnsty" v-show="showtype==1">
				<view class="btnsty1">
					<span @click="showtype=0" id="typetop" class="t-icon t-icon-checkbox1"></span>
				</view>
				<view class="btnsty">
					<span id="typetop" class="t-icon t-icon-checkbox-copy"></span>
				</view>
			</view>
		</view>
		<!-- toast消息提示 -->
		<u-toast ref="uToast"></u-toast>
		<view class="title">
			应用
		</view>
		<!-- #endif -->
		<!-- 类型1 -->
		<view v-show="showtype==0" class="listcontent" :style="{height: topheight,overflow: 'auto'}">
			<view class="allitem">
				<!-- 纪念日 -->
				<Submemorial :memorialdata="memorialdata"></Submemorial>
				<!-- 备忘录 -->
				<Submemo :memodata="memodata"></Submemo>
				<!-- 日记 -->
				<Subdiary :diarydata="diarydata"></Subdiary>
			</view>
		</view>
		<!-- 类型2 -->
		<view v-show="showtype==1" class="listcontent" :style="{height: topheight,overflow: 'auto'}">
			<view class="allitem">
				<view style="text-align: center;">
					应用
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// #ifdef MP-WEIXIN
	import {
		getstatusBarHeight
	} from '../../components/mixins/mixin.js'
	// #endif
	
	import Submemorial from '../../components/submemorial.vue'
	import Submemo from '../../components/submemo'
	import Subdiary from '../../components/subdiary'
	export default {
		// #ifdef MP-WEIXIN
		mixins: [getstatusBarHeight],
		// #endif
		components: {
			Submemorial,
			Submemo,
			Subdiary
		},
		created() {},
		onShow() {
			this.getmemorial()
			this.getmemo()
			this.getdiary()
		},
		onReady() {
			uni.createSelectorQuery().in(this).select(".listcontent").boundingClientRect((data) => {
					this.topheight = "calc(100% - " + data.top + "px)";
				})
				.exec();
		},
		data() {
			return {
				// 类型显示
				showtype: 0,
				// 距离top高度
				topheight: "",
				// 用户纪念日数据
				memorialdata: [],
				// 用户备忘录数据
				memodata: {
					title: "",
					content: "",
					datetime: "",
					nums: 0
				},
				// 用户日记数据
				diarydata: {
					// 日
					onedatetime: "",
					// 月
					twodatetime: "",
					// 数量
					nums: 0,
					content: ""
				},
				test: ""
			}
		},
		methods: {
			// 获取用户所有纪念日数据
			async getmemorial() {
				const { data:res } = await this.$http({
					url: "memorial/usermemorial",
					method: "POST"
				})
				 // console.log(res)
				if(res.code == '200') {
					let nowTIme = new Date();
					this.memorialdata = res.data
					this.memorialdata.forEach((item,index) => {
						let setTime = new Date(item.datetime)
						this.memorialdata[index].nums = parseInt((setTime.getTime() - nowTIme.getTime()) / (60*60*24*1000))
					})
				}else if(res.code == '201'){
					this.memorialdata = ""
				}
				else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "纪念日数据获取失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			},
			// 获取用户所有备忘录数据
			async getmemo() {
				const { data:res } = await this.$http({
					url: "memo/usermemo",
					method: "POST"
				})
				// console.log(res)
				if(res.code == '200') {
					this.memodata.title = res.data[0].title
					this.memodata.content = res.data[0].content
					this.memodata.datetime = res.data[0].datetime.split(":")[0]+":"+res.data[0].datetime.split(":")[1]
					this.memodata.nums = res.data.length
				}else if(res.code == '201'){
					this.memodata.title = ""
					this.memodata.content = ""
					this.memodata.datetime = ""
					this.memodata.nums = 0
				}
				else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "备忘录数据获取失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			},
			// 获取用户所有日记数据
			async getdiary() {
				const { data:res } = await this.$http({
					url: "diary/userdiary",
					method: "POST"
				})
				//console.log(res)
				if(res.code == '200') {
					// this.diarydata = res[0].data
					this.diarydata.nums = res.data.length
					this.diarydata.content = res.data[0].content
					this.test = res.data[0].datetime
					console.log(this.test)
					
					this.diarydata.onedatetime = (this.test.split(" ")[0]).split("/")[2]
					this.diarydata.twodatetime = this.test.split(" ")[1]
					// console.log(this.diarydata.onedatetime)
					switch(res.data[0].datetime.split("/")[1]){
						case '01': this.diarydata.twodatetime = '一月';break;
						case '02': this.diarydata.twodatetime = '二月';break;
						case '03': this.diarydata.twodatetime = '三月';break;
						case '04': this.diarydata.twodatetime = '四月';break;
						case '05': this.diarydata.twodatetime = '五月';break;
						case '06': this.diarydata.twodatetime = '六月';break;
						case '07': this.diarydata.twodatetime = '七月';break;
						case '08': this.diarydata.twodatetime = '八月';break;
						case '09': this.diarydata.twodatetime = '九月';break;
						case '10': this.diarydata.twodatetime = '十月';break;
						case '11': this.diarydata.twodatetime = '十一月';break;
						case '12': this.diarydata.twodatetime = '十二月';break;
						default: console.log("wrong...");
					}
					// console.log(this.diarydata)
				}else if(res.code == '201'){
					this.diarydata.onedatetime = ""
					this.diarydata.twodatetime = ""
					this.diarydata.content = ""
					this.diarydata.nums = 0
				}
				else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "备忘录数据获取失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			}
		}
	}
</script>

<style>
	.content {
		height: 100%;
		overflow: hidden;
	}
	.topback {
		left: 40rpx;
		position: fixed;
		width: 140rpx;
	}
	.topback1 {
		top: 60rpx;
		left: 40rpx;
		position: fixed;
		width: 140rpx;
	}

	.title {
		margin-top: 60rpx;
		text-align: center;
		font-size: larger;
	}

	#typetop {
		width: 38rpx;
		height: 36rpx;
	}

	.btnsty {
		background-color: rgb(119, 102, 231);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
	
	.btnsty1 {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
	
	.allbtnsty {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.allitem {
		display: flex;
		flex-direction: column;
		align-items: center;
		
		
		height: 1800px;
		width: 100%;

	}
	
	
	
	
</style>
