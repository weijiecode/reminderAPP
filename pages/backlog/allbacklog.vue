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
		<u-popup :show="showdel" :round="10" mode="bottom" @close="showdel=false" @open="showdel=true">
			<view>
				<view class="popuptext">确认是否删除该条待办事项？</view>
				<view class="bothbtn">
					<u-button @click="showdel=false" text="取消" size="normal" type="info"></u-button>
					<u-button @click="confirmdel" text="确认" size="normal" type="error"></u-button>
				</view>
			</view>
		</u-popup>
		<!-- 消息提示 -->
		<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
		<!-- 编辑弹框 -->
		<view class="editbacklog">
			<u-popup :show="showedit" :round="10" mode="bottom" @close="showedit=false">
				<view style="height: 360rpx;">
					<u--input v-model="tocontents" border="bottom" maxlength="30"
						clearable :focus="true"></u--input>
					<view class="allbtns">
						<!-- 日历按钮 -->
						<view @click="showcalendar=true" class="iconbtn t-icon t-icon-riqi"></view>
						<!-- 日历显示器 -->
						<u-calendar color="#7766E7" closeOnClickOverlay monthNum="10" :show="showcalendar" @confirm="confirmdate"
							@close="showcalendar=false">
						</u-calendar>
						<!-- 时间按钮 -->
						<view @click="showdatetime=true" class="iconbtn t-icon t-icon-shijian"></view>
						<!-- 时间显示器 -->
						<u-datetime-picker confirmColor="#7766E7" :show="showdatetime" mode="time" closeOnClickOverlay
							@confirm="confirmdatetime" @cancel="showdatetime=false" @close="showdatetime=false">
						</u-datetime-picker>
						<!-- 类别按钮 -->
						<view style="float: none;" @click="showtypepicker=true" class="iconbtn t-icon t-icon-leibie">
						</view>
						<!-- 类别选择器 -->
						<u-picker confirmColor="#7766E7" closeOnClickOverlay showLunar @confirm="confirmtype" :show="showtypepicker"
							:columns="columns" keyName="name" @cancel="showtypepicker=false"
							@close="showtypepicker=false"></u-picker>
					</view>
					<view class="choosedata">
						<u-tag v-if="datebacklog!=''" :show="tagshow1" @close="tagclose1" color="#4f4f4f" borderColor="#7766E7"
							:text="datebacklog" type="success" plain size="large" closable></u-tag>
						<u-tag v-if="timebacklog!=''" :show="tagshow2" @close="tagclose2" color="#4f4f4f" borderColor="#7766E7"
							:text="timebacklog" type="success" plain size="large" closable></u-tag>
						<u-tag v-if="toname!=''" :show="tagshow3" @close="tagclose3" color="#4f4f4f" borderColor="#7766E7"
							:text="toname" type="success" plain size="large" closable></u-tag>
					</view>
					<view class="bottomadd">
						<!-- <view @click="addbacklog" class="addbtn t-icon t-icon-tianjia2"></view> -->
						<u-button @click="savebacklog" text="保存修改" size="normal" type="info"></u-button>
					</view>
				</view>
			</u-popup>
		</view>
		
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
						:name="JSON.stringify(item)" @click="changebacklog">
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
						:name="JSON.stringify(item)" @click="changebacklog">
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
						:name="JSON.stringify(item)" @click="changebacklog">
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
						:name="JSON.stringify(item)" @click="changebacklog">
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
						:name="JSON.stringify(item)" @click="changebacklog">
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
						:name="JSON.stringify(item)" @click="changebacklog">
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
				// 日历选择弹框
				showcalendar: false,
				// 时间选择弹框
				showdatetime: false,
				// 类别选择器
				showtypepicker: false,
				// 指定待办的id、按钮索引、所属分类...
				toid: "",
				totype: "",
				tocontents: "",
				todatetime: "",
				toclassvalue: "",
				tocolorbg: "",
				toname: "",
				// 类别选择器
				columns: [
					[{
						name: "生活",
						names: {
							cvalue: "#icon-life",
							cbg: "#7766E7",
							cname: "生活"
						},
						classvalue: "#icon-life"
					}, {
						name: "工作",
						names: {
							cvalue: "#icon-work",
							cbg: "#518BF1",
							cname: "工作"
						},
						classvalue: "#icon-work"
					}, {
						name: "学习",
						names: {
							cvalue: "#icon-study",
							cbg: "#FFCD00",
							cname: "学习"
						},
						classvalue: "#icon-study"
					}, {
						name: "健康",
						names: {
							cvalue: "#icon-health",
							cbg: "#1DBD84",
							cname: "健康"
						},
						classvalue: "#icon-health"
					}, {
						name: "社交",
						names: {
							cvalue: "#icon-social",
							cbg: "#FE738A",
							cname: "社交"
						},
						classvalue: "#icon-social"
					}, {
						name: "其它",
						names: {
							cvalue: "#icon-other",
							cbg: "#C4C4C4",
							cname: "其它"
						},
						classvalue: "#icon-other"
					}]
				],
				// 临时日期（待拼接）
				datebacklog: "",
				// 临时时间（待拼接）
				timebacklog: "",
				// tag三个标签
				tagshow1: false,
				tagshow2: false,
				tagshow3: false,
				// 标题类别名称
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
			// 返回
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
				// console.log(JSON.parse(data.name))
				this.toid = JSON.parse(data.name).id
				this.tocontents = JSON.parse(data.name).contents
				this.todatetime = JSON.parse(data.name).datetime
				// console.log(this.todatetime)
				this.datebacklog = this.todatetime.split(' ')[0]
				this.timebacklog = this.todatetime.split(' ')[1]
				this.tagshow1 = true
				this.tagshow2 = true
				this.tagshow3 = true
				this.toclassvalue = JSON.parse(data.name).classvalue
				this.tocolorbg = JSON.parse(data.name).colorbg
				switch(JSON.parse(data.name).classvalue){
					case '#icon-life': this.totype = 'alla';this.toname='生活'; break;
					case '#icon-work': this.totype = 'allb';this.toname='工作'; break;
					case '#icon-study': this.totype = 'allc';this.toname='学习'; break;
					case '#icon-health': this.totype = 'alld';this.toname='健康'; break;
					case '#icon-social': this.totype = 'alle';this.toname='社交'; break;
					case '#icon-other': this.totype = 'allf';this.toname='其它'; break;
					default : console.log('error...')
				}
				if (data.index == '1') {
					this.showdel = true

				} else if (data.index == '0') {
					this.showedit = true
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
			// 日期确定
			confirmdate(e) {
				this.showcalendar = false
				this.datebacklog = e[0]
				this.tagshow1 = true
				// console.log(this.datebacklog)
			},
			// 时间确定
			confirmdatetime(e) {
				this.showdatetime = false
				this.timebacklog = e.value
				this.tagshow2 = true
				// console.log(this.timebacklog)
			},
			// 类别确定
			confirmtype(e) {
				// console.log(e)
				this.showtypepicker = false
				this.toclassvalue = e.value[0].names.cvalue
				this.tocolorbg = e.value[0].names.cbg
				this.toname = e.value[0].name
				this.tagshow3 = true
			},
			// tag关闭
			tagclose1() {
				this.tagshow1 = false
				this.datebacklog = ""
			},
			tagclose2() {
				this.tagshow2 = false
				this.timebacklog = ""
			},
			tagclose3() {
				this.tagshow3 = false
				this.toname = ""
			},
			// 提交修改
			async savebacklog() {
				const { data: res } = await this.$http({
					url: "backlog/updatecontents",
					method: "POST",
					data: {
						contents: this.tocontents,
						datetime: this.datebacklog + " " + this.timebacklog,
						classvalue: this.toclassvalue,
						colorbg: this.tocolorbg,
						id: this.toid
					}
				})
				if(res.code == '200') {
					this.showedit = false
					this[this.totype].forEach((p, index) => {
						if (this.toid == p.id) {
							this[this.totype][index].contents = this.tocontents
							this[this.totype][index].datetime = this.datebacklog+" "+this.timebacklog
							if(this.toclassvalue != this[this.totype][index].classvalue){
								this[this.totype].splice(index, 1)
							}
						}
					})
					this.$refs.uToast.show({
						type: 'success',
						duration: 1000,
						message: "该条待办清单修改成功",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				}else {
					this.showedit = false
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "该条待办清单修改失败,请重试",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
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
	
	::v-deep .swipe-action__content__text {
		font-size: 12px !important;
	}
	
	#textone {
		font-size: 16px !important;
		font-weight: bold !important;
	}
	
	
	.allbtns {
		margin-top: 20rpx;
	}
	
	.iconbtn {
		width: 40rpx;
		height: 40rpx;
		float: left;
		margin-right: 60rpx;
	}
	
	.choosedata {
		display: flex;
		margin-top: 20rpx;
	}
	
	.bottomadd {
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
	}
	
	::v-deep .u-empty__text {
		margin-top: -80rpx !important;
	}
	
	::v-deep .u-popup__content {
		opacity: 0.9 !important;
	}
	
	::v-deep .u-popup__content {
		padding: 30rpx;
	}
	::v-deep .u-swipe-action-item{
	touch-action: auto !important; //组件内屏蔽了 touch-action: none
	}
</style>
