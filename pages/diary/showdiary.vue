<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
				<view style="padding-right: 80rpx;margin: 0 auto;" class="title">
					日记
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback">
			<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
		</view>
		<view class="title">
			日记
		</view>
		<!-- #endif -->
		<view class="listcontent" :style="{height: topheight,overflow: 'auto'}">
			<view class="diarytitle">
				<view class="diarytime">
					{{diarydata.datetime}}
				</view>
				<view class="diaryweather">
					<span v-if="diarydata.weather=='晴天'" @click="showweather=true" class="t-icon t-icon-qing"></span>
					<span v-if="diarydata.weather=='雨天'" @click="showweather=true" class="t-icon t-icon-zhongyu"></span>
					<span v-if="diarydata.weather=='雷阵雨'" @click="showweather=true" class="t-icon t-icon-zhenyu"></span>
					<span v-if="diarydata.weather=='阴天'" @click="showweather=true" class="t-icon t-icon-yintian"></span>
					<span v-if="diarydata.weather=='多云'" @click="showweather=true" class="t-icon t-icon-duoyun"></span>
					<span v-if="diarydata.weather=='大风'" @click="showweather=true" class="t-icon t-icon-feng"></span>
					<span v-if="diarydata.weather=='雾天'" @click="showweather=true" class="t-icon t-icon-wuqi"></span>
					<span v-if="diarydata.weather=='下雪'" @click="showweather=true" class="t-icon t-icon-xiaoxue"></span>
				</view>
			</view>
			<u--textarea border="none" height="280" maxlength="255" v-model="diarydata.content" count></u--textarea>
			<view class="addicon">
				<u-icon v-if="showupdate || showupdate1" @click="updatediary" name="checkbox-mark" color="#FFCD00" size="30"></u-icon>
			</view>
			<view class="delicon">
				<u-icon @click="showconfirm=true" name="trash" color="#f50000" size="24"></u-icon>
			</view>
		</view>
		<!-- 消息提示 -->
		<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
		<!-- 天气选择器 -->
		<u-picker closeOnClickOverlay :show="showweather" @confirm="selectweather" :columns="columnsw" @cancel="showweather=false"
			@close="showweather=false"></u-picker>
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
		onLoad(option) {
			this.diarydata = JSON.parse(option.data)
			this.loadcontent = this.diarydata.content
			this.loadweather = this.diarydata.weather

			// console.log(this.diarydata)
		},
		data() {
			return {
				// 距离top高度
				topheight: "",
				// 日记数据
				diarydata: [],
				// 天气选择器
				showweather: false,
				// 天气数据
				columnsw: [
					['晴天', '雨天', '雷阵雨', '阴天', '多云', '大风', '雾天', '下雪']
				],
				showw: 0,
				// 日期
				timename: "",
				// 是否显示提交按钮
				showupdate: false,
				// 是否显示提交按钮
				showupdate1: false,
				// 删除提示框
				showconfirm: false,
				// 初始值(判断是否更改)
				loadcontent: "",
				loadweather: ""
			}
		},
		methods: {
			// 返回
			backmycenter() {
				uni.navigateBack()
			},
			// 提交修改
			async updatediary() {
				const { data: res } = await this.$http({
					url: "diary/updatediary",
					method: "POST",
					data: {
						weather: this.diarydata.weather,
						content: this.diarydata.content,
						id: this.diarydata.id
					}
				})
				//console.log(res)
				if (res.code == "200") {
					this.showupdate = false
					this.showupdate1 = false
					this.$refs.uToast.show({
						type: 'success',
						duration: 1000,
						message: "修改日记信息成功",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				} else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "修改日记信息失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			},
			// 选择天气
			selectweather(e) {
				//console.log(e)
				this.showweather = false
				this.diarydata.weather = e.value[0]
			},
			// 删除日记
			async delconfirm() {
				this.showconfirm = false
				const {
					data: res
				} = await this.$http({
					url: "diary/delediary",
					method: "POST",
					data: {
						id: this.diarydata.id
					}
				})
				// console.log(res)
				if (res.code == "200") {
					this.$refs.uToast.show({
						type: 'success',
						duration: 1000,
						message: "删除日记信息成功",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url: "./diary"
						})
					},1000)
				} else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "删除日记信息失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			}
		},
		watch: {
			'diarydata.weather'(newvalue){
				if(this.loadweather != newvalue){
					this.showupdate = true
				}else {
					this.showupdate = false
				}
			},
			'diarydata.content'(newvalue){
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

	.diarytime {
		margin-left: 20px;
		font-size: 12px;
		color: #6a6868;
	}

	.diaryweather {
		.t-icon {
			margin-right: 40rpx;
			margin-top: 10rpx;
			width: 60rpx;
			height: 60rpx;
		}

	}
	
	.addicon {
		::v-deep .u-icon__icon {
			margin: -50rpx 100rpx !important;
		}
	}
	.delicon {
		::v-deep .u-icon__icon {
			margin: -50rpx 40rpx !important;
		}
	}

	.diarytitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.weathericon {
		display: flex;
		justify-content: space-evenly;
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


	::v-deep .u-textarea__count {
		background-color: #F8F8FB !important;
	}
</style>
