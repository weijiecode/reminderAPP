<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
				<view style="padding-right: 80rpx;margin: 0 auto;" class="title">
					写日记
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback">
			<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
		</view>
		<view class="title">
			写日记
		</view>
		<!-- #endif -->
		<view class="listcontent" :style="{height: topheight,overflow: 'auto'}">
			<view class="diarytitle">
				<view class="diarytime">
					{{todaydate1}}&nbsp;&nbsp;{{hmtime}}&nbsp;&nbsp;{{weekday}}
				</view>
				<view class="diaryweather">
					<span v-if="showw==0" @click="showweather=true" class="t-icon t-icon-qing"></span>
					<span v-if="showw==1" @click="showweather=true" class="t-icon t-icon-zhongyu"></span>
					<span v-if="showw==2" @click="showweather=true" class="t-icon t-icon-zhenyu"></span>
					<span v-if="showw==3" @click="showweather=true" class="t-icon t-icon-yintian"></span>
					<span v-if="showw==4" @click="showweather=true" class="t-icon t-icon-duoyun"></span>
					<span v-if="showw==5" @click="showweather=true" class="t-icon t-icon-feng"></span>
					<span v-if="showw==6" @click="showweather=true" class="t-icon t-icon-wuqi"></span>
					<span v-if="showw==7" @click="showweather=true" class="t-icon t-icon-xiaoxue"></span>
				</view>
			</view>
			<u--textarea placeholder="今天发生了什么难忘的事情？" border="none" height="280" maxlength="255" v-model="diarydata.content" count></u--textarea>
			<view class="addicon">
				<u-icon v-if="diarydata.content!=''" @click="adddiary" name="checkbox-mark" color="#FFCD00" size="30"></u-icon>
			</view>
		</view>
		<!-- 消息提示 -->
		<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
		<!-- 天气选择器 -->
		<u-picker closeOnClickOverlay :show="showweather" @confirm="selectweather" :columns="columnsw" @cancel="showweather=false"
			@close="showweather=false"></u-picker>
	</view>
</template>

<script>
	import {
		datetimes
	} from '../../components/mixins/mixin.js'
	// #ifdef MP-WEIXIN
	import {
		getstatusBarHeight
	} from '../../components/mixins/mixin.js'
	// #endif
	export default {
		// #ifdef MP-WEIXIN
		mixins: [datetimes, getstatusBarHeight],
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
		data() {
			return {
				// 距离top高度
				topheight: "",
				// 日记数据
				diarydata: {
					weather: "",
					content: "",
					datetime: ""
				},
				// 天气选择器
				showweather: false,
				// 天气数据
				columnsw: [
					['晴天', '雨天', '雷阵雨', '阴天', '多云', '大风', '雾天', '下雪']
				],
				showw: 0,
			}
		},
		methods: {
			// 返回
			backmycenter() {
				uni.navigateTo({
					url: "./diary"
				})
			},
			// 天气选择
			selectweather(e) {
				this.showw = e.indexs[0]
				this.showweather = false
			},
			// 提交日记
			adddiary() {}
		},
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
