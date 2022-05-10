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
		<!-- toast消息提示 -->
		<u-toast ref="uToast"></u-toast>
		<!-- 是否删除 -->
		<u-popup :show="showdel" :round="10" mode="bottom" @close="close" @open="open">
			<view>
				<view class="popuptext">确认是否删除该条待办事项？</view>
				<view class="bothbtn">
					<u-button @click="showdel=false" text="取消" size="normal" type="info"></u-button>
					<u-button @click="confirmdel" text="确认" size="normal" type="error"></u-button>
				</view>
			</view>
		</u-popup>
		
		<view class="subtitle">
			<view class="subtitleleft">
				{{backlogtype}}清单有
				<view class="backlognum" v-if="backlogtype==='生活'">{{alla.length}}</view>
				<view class="backlognum" v-if="backlogtype==='工作'">{{allb.length}}</view>
				<view class="backlognum" v-if="backlogtype==='学习'">{{allc.length}}</view>
				<view class="backlognum" v-if="backlogtype==='健康'">{{alld.length}}</view>
				<view class="backlognum" v-if="backlogtype==='社交'">{{alle.length}}</view>
				<view class="backlognum" v-if="backlogtype==='其它'">{{allf.length}}</view>
				条，请尽快完成！
			</view>
			<!-- 			<view class="subtitleright">
				<u-icon size="22" name="calendar"></u-icon>
				<view class="subtitledate">
					{{item.datetime}}
				</view>
			</view> -->
		</view> 
		<view class="listcontent" :style="{height: topheight,overflow: 'auto'}">
			<view v-if="backlogtype==='生活'">
				<u-swipe-action>
					<u-swipe-action-item v-for="(item) in alla" :key="item.id" :options="options2"
						:name="item.id+' '+'alla'" @click="changebacklog">
						<view class="swipe-action u-border-top u-border-bottom">
							<view @click="todone(item,'alla')" v-if="item.done===1"
								style="background-color: #E3E0F3;border: 1px solid #7766E7;"
								class="swipe-action__content">
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{item.datetime}}</text>
								</view>
								<view id="doneicon" class="t-icon t-icon-lifedone-copy"></view>
							</view>
							<view @click="todone(item,'alla')" v-if="item.done===0" class="swipe-action__content">
								<view style="background-color:#7766E7;" class="line"></view>
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{item.datetime}}</text>
								</view>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
			<view v-if="backlogtype==='工作'">
				<u-swipe-action>
					<u-swipe-action-item v-for="(item) in allb" :key="item.id" :options="options2"
						:name="item.id+' '+'allb'" @click="changebacklog">
						<view class="swipe-action u-border-top u-border-bottom">
							<view @click="todone(item,'allb')" v-if="item.done===1"
								style="background-color: #CDDDF7;border: 1px solid #518BF1;"
								class="swipe-action__content">
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{item.datetime}}</text>
								</view>
								<view id="doneicon" class="t-icon t-icon-workdone-copy"></view>
							</view>
							<view @click="todone(item,'allb')" v-if="item.done===0" class="swipe-action__content">
								<view style="background-color:#518BF1;" class="line"></view>
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{item.datetime}}</text>
								</view>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
			<view v-if="backlogtype==='学习'">
				<u-swipe-action>
					<u-swipe-action-item v-for="(item) in allc" :key="item.id" :options="options2"
						:name="item.id+' '+'allc'" @click="changebacklog">
						<view class="swipe-action u-border-top u-border-bottom">
							<view @click="todone(item,'allc')" v-if="item.done===1"
								style="background-color: #f9f4e2;border: 1px solid #FFCD00;"
								class="swipe-action__content">
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{item.datetime}}</text>
								</view>
								<view id="doneicon" class="t-icon t-icon-studydone-copy"></view>
							</view>
							<view @click="todone(item,'allc')" v-if="item.done===0" class="swipe-action__content">
								<view style="background-color:#FFCD00;" class="line"></view>
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{item.datetime}}</text>
								</view>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
			<view v-if="backlogtype==='健康'">
				<u-swipe-action>
					<u-swipe-action-item v-for="(item) in alld" :key="item.id" :options="options2"
						:name="item.id+' '+'alld'" @click="changebacklog">
						<view class="swipe-action u-border-top u-border-bottom">
							<view @click="todone(item,'alld')" v-if="item.done===1"
								style="background-color: #E2F2F0;border: 1px solid #1DBD84;"
								class="swipe-action__content">
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{item.datetime}}</text>
								</view>
								<view id="doneicon" class="t-icon t-icon-healthdone-copy"></view>
							</view>
							<view @click="todone(item,'alld')" v-if="item.done===0" class="swipe-action__content">
								<view style="background-color:#1DBD84;" class="line"></view>
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{item.datetime}}</text>
								</view>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
			<view v-if="backlogtype==='社交'">
				<u-swipe-action>
					<u-swipe-action-item v-for="(item) in alle" :key="item.id" :options="options2"
						:name="item.id+' '+'alle'" @click="changebacklog">
						<view class="swipe-action u-border-top u-border-bottom">
							<view @click="todone(item,'alle')" v-if="item.done===1"
								style="background-color: #FFF1F4;border: 1px solid #FE738A;"
								class="swipe-action__content">
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{item.datetime}}</text>
								</view>
								<view id="doneicon" class="t-icon t-icon-socialdone-copy"></view>
							</view>
							<view @click="todone(item,'alle')" v-if="item.done===0" class="swipe-action__content">
								<view style="background-color:#FE738A;" class="line"></view>
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{item.datetime}}</text>
								</view>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
			<view v-if="backlogtype==='其它'">
				<u-swipe-action>
					<u-swipe-action-item v-for="(item) in allf" :key="item.id" :options="options2"
						:name="item.id+' '+'allf'" @click="changebacklog">
						<view class="swipe-action u-border-top u-border-bottom">
							<view @click="todone(item,'allf')" v-if="item.done===1"
								style="background-color: #E8E8E8;border: 1px solid #C4C4C4;"
								class="swipe-action__content">
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{item.datetime}}</text>
								</view>
								<view id="doneicon" class="t-icon t-icon-otherdone-copy"></view>
							</view>
							<view @click="todone(item,'allf')" v-if="item.done===0" class="swipe-action__content">
								<view style="background-color:#C4C4C4;" class="line"></view>
								<view class="itemcontent">
									<text id="textone" class="swipe-action__content__text">{{item.contents}}</text>
									<text class="swipe-action__content__text">{{item.datetime}}</text>
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
			// this.allbacklog = uni.getStorageSync('allbacklog')
			// console.log(this.allbacklog)
			const {
				alla,
				allb,
				allc,
				alld,
				alle,
				allf
			} = JSON.parse(uni.getStorageSync('allbacklogstorage'))
			this.alla = alla
			this.allb = allb
			this.allc = allc
			this.alld = alld
			this.alle = alle
			this.allf = allf
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
				alla: [],
				allb: [],
				allc: [],
				alld: [],
				alle: [],
				allf: [],
				// 距离top高度
				topheight: "",
				mode: 'square',
				iconStyle: {
					fontSize: '32rpx',
					color: '#7766E7'
				},
				// 是否删除提示框
				showdel: false,
				// 是否编辑提示框
				showedit: false,
				// 指定待办的id、按钮索引、所属分类
				toid: "",
				toindex: "",
				totype: "",
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
			// 确定完成
			async todone(item, type) {
				let {
					id,
					done
				} = item
				done == '0' ? done = '1' : done = '0'
				const {
					data: res
				} = await this.$http({
					url: "backlog/updatebacklog",
					method: "POST",
					data: {
						done: done,
						id: id
					}
				})
				if (res.code == '200') {
					if (done == '1') {
						this[type].forEach((p, index) => {
							if (id == p.id) {
								p.done = 1
							}
						})
						this.$refs.uToast.show({
							type: 'success',
							duration: 1000,
							message: "该条待办清单已完成",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
					} else if (done == '0') {
						this[type].forEach((p, index) => {
							if (id == p.id) {
								p.done = 0
							}
						})
						this.$refs.uToast.show({
							type: 'default',
							duration: 1000,
							message: "该条待办清单已修改为待完成",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
					}

				}
			},
			changebacklog(data) {
				this.toid = data.name.split(' ')[0]
				this.totype = data.name.split(' ')[1]
				this.toindex = data.index
				console.log(this.toid)
				console.log(this.totype)
				console.log(this.toindex)
				console.log(data)
				if (data.index == '1') {
					this.showdel = true

				} else if (data.index == '0') {
					console.log('65')
				}
			},
			async confirmdel() {
				const {
					data: res
				} = await this.$http({
					url: "backlog/deletebacklog",
					method: "POST",
					data: {
						id: this.toid
					}
				})
				if (res.code == '200') {
					this.showdel = false
					this[this.totype].forEach((p, index) => {
						if (this.toid == p.id) {
							this[this.totype].splice(index, 1)
						}
					})
				}
			},
			open() {
				// console.log('open');
			},
			close() {
				this.showdel = false
				// console.log('close');
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

	.bothbtn {
		display: flex;
		flex-direction: row;
	}

	.popuptext {
		text-align: center;
		margin: 100rpx;
	}

	.subtitledate {
		padding-left: 8rpx;
		color: #aaa;
		font-size: 14px;
	}
	
	::v-deep .u-fade-enter-active {
		z-index: 999 !important;
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
		box-shadow: 0 12px 5px -10px rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.1);
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
