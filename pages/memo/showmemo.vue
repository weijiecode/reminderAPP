<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
				<view style="padding-right: 80rpx;margin: 0 auto;" class="title">
					备忘录
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback">
			<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
		</view>
		<view class="title">
			备忘录
		</view>
		<!-- #endif -->
		<view class="listcontent" :style="{height: topheight,overflow: 'auto'}">
			<u--input maxlength="15" border="none" fontSize="25" v-model="memodata.title" clearable></u--input>
			<view class="memotime">今天{{timename}} {{time}}</view>
			<u--textarea border="none" height="280" maxlength="255" v-model="memodata.content" count></u--textarea>
			<view class="subcontent">
				<u-icon name="calendar" color="#aaa" size="25"></u-icon>{{memodata.datetime}}
				<u-icon @click="showconfirm=true" name="trash" color="#f50000" size="24"></u-icon>
				<u-icon @click="updatememo" v-if="showupdate || showupdate1" name="checkbox-mark" color="#7766E7" size="28"></u-icon>
			</view>
		</view>
		<!-- 消息提示 -->
		<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
		<!-- 确认提示框 -->
		<u-modal content="你确认删除该条备忘录吗？" :show="showconfirm" showCancelButton closeOnClickOverlay
			@confirm="delconfirm" @cancel="showconfirm=false" @close="showconfirm=false"></u-modal>
	</view>
</template>

<script>
	import { datetimes } from '../../components/mixins/mixin.js'
	// #ifdef MP-WEIXIN
	import {
		getstatusBarHeight
	} from '../../components/mixins/mixin.js'
	// #endif
	export default {
		// #ifdef MP-WEIXIN
		mixins: [datetimes,getstatusBarHeight],
		// #endif
		// #ifndef MP-WEIXIN
		mixins: [datetimes],
		// #endif
		onReady() {
			uni.createSelectorQuery().in(this).select(".listcontent").boundingClientRect((data) => {
					this.topheight = "calc(100% - " + data.top + "px)";
				})
				.exec();
		},
		onShow() {
			const t = this.time.split(':')[0]
			if(t>=6 && t<11)this.timename = '上午'
			if(t>=11 && t<17)this.timename = '下午'
			if(t>=17 && t<19)this.timename = '傍晚'
			if(t>=19 && t<24)this.timename = '晚上'
			if(t>=9 && t<6)this.timename = '凌晨'
			
		},
		onLoad(option) {
			this.memodata = JSON.parse(option.data)
			this.loadcontent = this.memodata.content
			this.loadtitle = this.memodata.title
			// console.log(this.memodata)
			// this.todayBacklog = uni.getStorageSync('todayBacklog')
			// console.log(this.todayBacklog)
		},
		data() {
			return {
				// 距离top高度
				topheight: "",
				// 备忘录数据
				memodata: [],
				// 时间段名称
				timename: "",
				// 是否显示提交按钮
				showupdate: false,
				// 是否显示提交按钮
				showupdate1: false,
				// 删除提示框
				showconfirm: false,
				// 初始值(判断是否更改)
				loadcontent: "",
				loadtitle: ""
			}
		},
		methods: {
			// 返回
			backmycenter() {
				uni.navigateTo({
					url: "./memo"
				})
			},
			// 提交修改
			async updatememo() {
				const { data: res } = await this.$http({
					url: "memo/updatememo",
					method: "POST",
					data: {
						title: this.memodata.title,
						content: this.memodata.content,
						id: this.memodata.id
					}
				})
				//console.log(res)
				if (res.code == "200") {
					this.showupdate = false
					this.showupdate1 = false
					this.$refs.uToast.show({
						type: 'success',
						duration: 1000,
						message: "修改备忘录信息成功",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				} else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "修改备忘录信息失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			},
			// 删除备忘录
			async delconfirm() {
				this.showconfirm = false
				const {
					data: res
				} = await this.$http({
					url: "memo/delememo",
					method: "POST",
					data: {
						id: this.memodata.id
					}
				})
				// console.log(res)
				if (res.code == "200") {
					this.$refs.uToast.show({
						type: 'success',
						duration: 1000,
						message: "删除备忘录信息成功",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url: "./memo"
						})
					},1000)
				} else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "删除备忘录信息失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			}
		},
		watch: {
			'memodata.title'(newvalue){
				if(this.loadtitle != newvalue){
					this.showupdate = true
				}else {
					this.showupdate = false
				}
			},
			'memodata.content'(newvalue){
				if(this.loadcontent != newvalue){
					this.showupdate1 = true
				}else {
					this.showupdate1 = false
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		height: 100%;
		overflow: hidden;
	}

	.topback {
		top: 60rpx;
		left: 40rpx;
		position: fixed;
	}

	.title {
		margin-top: 60rpx;
		text-align: center;
	}

	.subcontent {
		margin-top: 4rpx;
		color: #aaa;
		display: flex;
		align-items: center;
	}
	
	.memotime {
		margin-top: 16rpx;
		margin-left: 20px;
		font-size: 12px;
		color: #aaa;
	}

	::v-deep .u-input {
		padding: 40rpx 40rpx 0 40rpx !important;
	}

	::v-deep .u-textarea--radius {
		margin-top: 40rpx !important;
	}

	::v-deep .uni-textarea-textarea {
		font-size: 16px !important;
	}
	
	::v-deep .u-textarea {
		background-color: #F8F8FB !important;
		margin: 0 40rpx !important;
		padding: 18rpx 0 !important;
	}
	
	::v-deep .u-icon{
		margin-left: 40rpx !important;
	}
	
	::v-deep .u-textarea__count {
		background-color: #F8F8FB !important;
	}
</style>
