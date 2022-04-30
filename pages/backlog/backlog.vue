<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<span @click="backmycenter" id="backtop" class="btnshow t-icon t-icon-fanhui2"></span>
				<view style="padding-right: 80rpx;margin: 0 auto;" class="title">
					{{backlogtype}}
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback">
			<!-- <u-icon size="25" @click="backmycenter" name="arrow-left"></u-icon> -->
			<span @click="backmycenter" id="backtop" class="btnshow t-icon t-icon-fanhui2"></span>
		</view>
		<view class="title">
			{{backlogtype}}
		</view>
		<!-- #endif -->
		<view class="subtitle">
			<view class="subtitleleft">
				今日{{backlogtype}}清单有
				<view class="backlognum" v-if="backlogtype==='生活'">{{todaya.length}}</view>
				<view class="backlognum" v-if="backlogtype==='工作'">{{todayb.length}}</view>
				<view class="backlognum" v-if="backlogtype==='学习'">{{todayc.length}}</view>
				<view class="backlognum" v-if="backlogtype==='健康'">{{todayd.length}}</view>
				<view class="backlognum" v-if="backlogtype==='社交'">{{todaye.length}}</view>
				<view class="backlognum" v-if="backlogtype==='其它'">{{todayf.length}}</view>
				条，请尽快完成！
			</view>
			<view class="subtitleright">
				<u-icon size="22" name="calendar"></u-icon>
				<view class="subtitledate">
					{{todaymd}}
				</view>
			</view>
		</view>
		<view class="listcontent" :style="{height: topheight,overflow: 'auto'}">
			<view v-if="backlogtype==='生活'">
				<u-swipe-action>
					<u-swipe-action-item v-for="(item) in todaya" :key="item.id" :options="options2">
						<view class="swipe-action u-border-top u-border-bottom">
							<view v-if="item.done===1" style="background-color: #E3E0F3;border: 1px solid #7766E7;"
								class="swipe-action__content">
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{todaymd}}</text>
								</view>
								<view id="doneicon" class="t-icon t-icon-lifedone-copy"></view>
							</view>
							<view v-if="item.done===0" class="swipe-action__content">
								<view style="background-color:#7766E7;" class="line"></view>
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{todaymd}}</text>
								</view>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
			<view v-if="backlogtype==='工作'">
				<u-swipe-action>
					<u-swipe-action-item v-for="(item) in todayb" :key="item.id" :options="options2">
						<view class="swipe-action u-border-top u-border-bottom">
							<view v-if="item.done===1" style="background-color: #CDDDF7;border: 1px solid #518BF1;"
								class="swipe-action__content">
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{todaymd}}</text>
								</view>
								<view id="doneicon" class="t-icon t-icon-workdone-copy"></view>
							</view>
							<view v-if="item.done===0" class="swipe-action__content">
								<view style="background-color:#518BF1;" class="line"></view>
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{todaymd}}</text>
								</view>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
			<view v-if="backlogtype==='学习'">
				<u-swipe-action>
					<u-swipe-action-item v-for="(item) in todayc" :key="item.id" :options="options2">
						<view class="swipe-action u-border-top u-border-bottom">
							<view v-if="item.done===1" style="background-color: #f9f4e2;border: 1px solid #FFCD00;"
								class="swipe-action__content">
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{todaymd}}</text>
								</view>
								<view id="doneicon" class="t-icon t-icon-studydone-copy"></view>
							</view>
							<view v-if="item.done===0" class="swipe-action__content">
								<view style="background-color:#FFCD00;" class="line"></view>
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{todaymd}}</text>
								</view>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
			<view v-if="backlogtype==='健康'">
				<u-swipe-action>
					<u-swipe-action-item v-for="(item) in todayd" :key="item.id" :options="options2">
						<view class="swipe-action u-border-top u-border-bottom">
							<view v-if="item.done===1" style="background-color: #E2F2F0;border: 1px solid #1DBD84;"
								class="swipe-action__content">
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{todaymd}}</text>
								</view>
								<view id="doneicon" class="t-icon t-icon-healthdone-copy"></view>
							</view>
							<view v-if="item.done===0" class="swipe-action__content">
								<view style="background-color:#1DBD84;" class="line"></view>
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{todaymd}}</text>
								</view>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
			<view v-if="backlogtype==='社交'">
				<u-swipe-action>
					<u-swipe-action-item v-for="(item) in todaye" :key="item.id" :options="options2">
						<view class="swipe-action u-border-top u-border-bottom">
							<view v-if="item.done===1" style="background-color: #FFF1F4;border: 1px solid #FE738A;"
								class="swipe-action__content">
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{todaymd}}</text>
								</view>
								<view id="doneicon" class="t-icon t-icon-socialdone-copy"></view>
							</view>
							<view v-if="item.done===0" class="swipe-action__content">
								<view style="background-color:#FE738A;" class="line"></view>
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{todaymd}}</text>
								</view>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
			<view v-if="backlogtype==='其它'">
				<u-swipe-action>
					<u-swipe-action-item v-for="(item) in todayf" :key="item.id" :options="options2">
						<view class="swipe-action u-border-top u-border-bottom">
							<view v-if="item.done===1" style="background-color: #E8E8E8;border: 1px solid #C4C4C4;"
								class="swipe-action__content">
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{todaymd}}</text>
								</view>
								<view id="doneicon" class="t-icon t-icon-otherdone-copy"></view>
							</view>
							<view v-if="item.done===0" class="swipe-action__content">
								<view style="background-color:#C4C4C4;" class="line"></view>
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{todaymd}}</text>
								</view>
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
			// console.log(this.backlogtype)
			// this.todayBacklog = uni.getStorageSync('todayBacklog')
			// console.log(this.todayBacklog)
			const {
				todaya,
				todayb,
				todayc,
				todayd,
				todaye,
				todayf
			} = JSON.parse(uni.getStorageSync('todaybacklogstorage'))
			this.todaya = todaya
			this.todayb = todayb
			this.todayc = todayc
			this.todayd = todayd
			this.todaye = todaye
			this.todayf = todayf
		},
		onReady() {
			uni.createSelectorQuery().in(this).select(".listcontent").boundingClientRect((data) => {
					this.topheight = "calc(100% - " + data.top + "px)";
				})
				.exec();
		},
		data() {
			return {
				// 今日待办
				todaya: [],
				todayb: [],
				todayc: [],
				todayd: [],
				todaye: [],
				todayf: [],
				// 距离top高度
				topheight: "",
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

	#backtop {
		width: 40rpx;
		height: 40rpx;
	}

	#textone {
		font-size: 16px;
		font-weight: bold;
	}

	.line {
		height: 60rpx;
		width: 10rpx;
		border-radius: 10rpx;
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

	#doneicon {
		width: 30px;
		height: 30px;
		position: absolute;
		right: 15px;
	}

	.itemcontent {
		display: flex;
		flex-direction: column;

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

	::v-deep .swipe-action__content {
		display: flex !important;
		align-items: center;
		position: relative;
		padding: 30rpx 0;
		border-radius: 30rpx;
		background-color: #ffffff;
		border: 1px solid #ffffff;
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
