<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<span @click="backmycenter" id="backtop" class="btnshow t-icon t-icon-fanhui2"></span>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback">
			<!-- <u-icon size="25" @click="backmycenter" name="arrow-left"></u-icon> -->
			<span @click="backmycenter" id="backtop" class="btnshow t-icon t-icon-fanhui2"></span>
		</view>
		<view class="title">
			学习
		</view>
		<!-- #endif -->
		<view class="subtitle">
			<view class="subtitleleft">
				今日{{backlogtype}}清单有<view class="backlognum">5</view>条，请尽快完成！
			</view>
			<view class="subtitleright">
				<u-icon size="22" name="calendar"></u-icon>
				<view class="subtitledate">
					{{todaymd}}
				</view>
			</view>
		</view>
		<view class="listcontent">
			<view>
				<u-swipe-action>
					<u-swipe-action-item v-for="(item) in todayBacklog" :key="item.id" :options="options2">
						<view class="swipe-action u-border-top u-border-bottom">
							<view style="background-color: #f9f4e2;border: 1px solid #FFCD00;border-radius: 30rpx;" class="swipe-action__content">
								<text class="swipe-action__content__text">{{item.contents}}</text>
								<text class="swipe-action__content__text">{{todaymd}}</text>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
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
	import {
		datetimes
	} from '../../components/mixins/mixin.js'
	export default {
		// #ifdef MP-WEIXIN
		mixins: [getstatusBarHeight, datetimes],
		// #endif
		// #ifndef MP-WEIXIN
		mixins: [datetimes],
		// #endif
		onLoad(option) {
			this.backlogtype = option.type
			console.log(this.backlogtype)
			this.todayBacklog = uni.getStorageSync('todayBacklog')
			console.log(this.todayBacklog)
		},
		data() {
			return {
				// 今日待办
				todayBacklog: [],
				// 类别
				backlogtype: "",
				// 向左滑动两个按钮
				options2: [{
					icon: 'edit-pen',
					style: {
						backgroundColor: '#7766E7',
						fontSize: '36rpx',
						borderRadius: '50%',
						width: '100rpx',
						height: '100rpx'
					}
				}, {
					icon: 'trash',
					style: {
						backgroundColor: '#FE748B',
						fontSize: '36rpx',
						borderRadius: '50%',
						width: '100rpx',
						height: '100rpx'
					}
				}],
			}
		},
		methods: {
			// 返回首页
			backmycenter() {
				uni.switchTab({
					url: "../index/index"
				})
			},

		}
	}
</script>

<style scoped lang="scss">
	.topback {
		top: 60rpx;
		left: 40rpx;
		position: fixed;
	}

	.title {
		margin-top: 60rpx;
		text-align: center;
	}

	#backtop {
		width: 40rpx;
		height: 40rpx;
	}

	.subtitle {
		padding: 30rpx 40rpx 0 40rpx;
		display: flex;
		justify-content: space-between;
	}

	.subtitleleft {
		color: #aaa;
		font-size: 14px;
	}

	.subtitleright {
		display: flex;
	}

	.subtitledate {
		padding-left: 8rpx;
		color: #aaa;
		font-size: 14px;
	}

	.backlognum {
		color: #FAC81D;
		display: inline;
		padding: 8rpx;
		font-size: 17px;
		line-height: 17px;
	}

	.listcontent {
		margin-top: 40rpx;
	}

	// 向左滑动两个按钮
	.u-page {
		padding: 0;
	}

	.u-demo-block__title {
		padding: 20rpx 0 4rpx 30rpx;
	}

	.swipe-action {
		&__content {
			padding: 50rpx 0;

			&__text {
				font-size: 30rpx;
				color: $u-main-color;
				padding-left: 30rpx;
			}
		}
	}

	::v-deep .u-swipe-action-item__content {
		margin-left: 30rpx !important;
		margin-right: 30rpx !important;
	}

	::v-deep .u-border-bottom {
		//display: none !important;
		border-bottom-style: none !important;
	}

	::v-deep .u-border-top {
		//display: none !important;
		border-top-style: none !important;
	}
	
	::v-deep .u-swipe-action-item__right__button {
		border-radius: 30rpx !important;
	}
	
	::v-deep .u-swipe-action-item__right__button:nth-child(2) {
		margin-right: 30rpx !important;
	}
	
	::v-deep .u-swipe-action-item {
		margin-top: 20rpx !important;
	}
	::v-deep .u-swipe-action-item__content {
		background-color: #F8F8FB !important;
	}
</style>
