<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<span @click="backmycenter" id="backtop" class="t-icon t-icon-fanhui2"></span>
				<view style="padding-right: 80rpx;margin: 0 auto;" class="title">
					纪念日
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback">
			<!-- <u-icon size="25" @click="backmycenter" name="arrow-left"></u-icon> -->
			<span @click="backmycenter" id="backtop" class="t-icon t-icon-fanhui2"></span>
		</view>
		<view class="title">
			纪念日
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="listcontent" :style="{height: unalltop,overflow: 'hidden'}">
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="listcontent" style="height: calc(100% - 71px);overflow: hidden;">
				<!-- #endif -->
				<view class="allbar">
					<view class="subbar"></view>
					<view class="subbar"></view>
				</view>
				<view class="listbox">
					<view class="space"></view>
					<view @click="changememorialdata(item)" v-for="item in memorialdata" :key="item.id"
						class="backlogitem">
						<view class="subcontent">
							<view class="subcontentl">
								<view class="toptext">
									距&nbsp;{{item.content}}
								</view>
								<view class="bottomtext">
									{{item.datetime}}
								</view>
							</view>
							<view class="subcontentr">
								还有<view class="subcontentrtext">{{item.nums}}</view>天
							</view>
						</view>
						<u-divider :dashed="true"></u-divider>
					</view>
				</view>
			</view>
			<!-- 消息提示 -->
			<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
			<!-- 新建按钮 -->
			<view @click="shownewmemorial=true" class="addbacklog t-icon t-icon-add-copy"></view>
			<!-- 新建弹窗 -->
			<u-popup :show="shownewmemorial" :round="10" mode="bottom" @close="shownewmemorial=false">
				<view style="height: 360rpx;">
					<u--input v-model="memorialForm.content" placeholder="纪念日名称~" border="bottom" maxlength="15"
						clearable :focus="true"></u--input>
					<view class="allbtns">
						<!-- 时间按钮 -->
						<view @click="showdatetime=true" class="iconbtn t-icon t-icon-shijian-copy"></view>
						<!-- 时间显示器 -->
						<u-datetime-picker @confirm="confirmdatetime" @cancel="showdatetime=false"
							@close="showdatetime=false" closeOnClickOverlay confirmColor="#FE738A" :show="showdatetime"
							v-model="datetimevalue" mode="date"></u-datetime-picker>
						<view class="choosedata">
							<u-tag v-if="memorialForm.datetime!=''" :show="tagshow1" @close="tagclose" color="#4f4f4f"
								borderColor="#FE738A" :text="memorialForm.datetime" type="success" plain size="large"
								closable></u-tag>
						</view>
					</view>
					<view class="bottomadd">
						<view @click="addmemorial" class="addbtn t-icon t-icon-tianjia2-copy"></view>
					</view>
				</view>
			</u-popup>

			<!-- 修改弹窗 -->
			<u-popup :show="changeshownewmemorial" :round="10" mode="bottom" @close="changeshownewmemorial=false">
				<view style="height: 360rpx;">
					<u--input v-model="changememorialForm.content" border="bottom" maxlength="15" clearable
						:focus="true"></u--input>
					<view class="allbtns">
						<!-- 时间按钮 -->
						<view @click="changeshowdatetime=true" class="iconbtn t-icon t-icon-shijian-copy"></view>
						<!-- 时间显示器 -->
						<u-datetime-picker @confirm="changeconfirmdatetime" @cancel="changeshowdatetime=false"
							@close="changeshowdatetime=false" closeOnClickOverlay confirmColor="#FE738A"
							:show="changeshowdatetime" v-model="datetimevalue" mode="date"></u-datetime-picker>
						<view class="choosedata">
							<u-tag v-if="changememorialForm.datetime!=''" :show="changetagshow1" @close="changetagclose"
								color="#4f4f4f" borderColor="#FE738A" :text="changememorialForm.datetime" type="success"
								plain size="large" closable></u-tag>
						</view>
					</view>
					<view class="bottomadd">
						<!-- <view @click="addmemorial" class="addbtn t-icon t-icon-tianjia2-copy"></view> -->
						<u-button @click="changememorial" text="保存修改" size="normal" type="info"></u-button>
						<u-icon @click="showconfirm=true" name="trash" color="#fe738a" size="28"></u-icon>
					</view>
					<!-- 确认提示框 -->
					<u-modal content="你确认删除该条纪念日吗？" :show="showconfirm" showCancelButton closeOnClickOverlay @confirm="delconfirm"
						@cancel="showconfirm=false" @close="showconfirm=false"></u-modal>
				</view>
			</u-popup>
		</view>
</template>

<script>
	// #ifdef MP-WEIXIN
	import {
		getstatusBarHeight
	} from '../../components/mixins/mixin.js'
	// #endif
	export default {
		// #ifdef MP-WEIXIN
		mixins: [getstatusBarHeight],
		// #endif

		onShow() {
			this.getmemorial()
		},
		data() {
			return {
				// 距离top高度
				topheight: "",
				// 纪念日数据
				memorialdata: [],
				// 新建纪念日弹窗
				shownewmemorial: false,
				// 修改纪念日弹窗
				changeshownewmemorial: false,
				// 时间选择器显示
				showdatetime: false,
				// 修改时间选择器显示
				changeshowdatetime: false,
				datetimevalue: Number(new Date()),
				// 时间tag
				tagshow1: false,
				// 修改时间tag
				changetagshow1: false,
				// 确认删除框
				showconfirm: false,
				// 新增纪念日表单
				memorialForm: {
					content: "",
					datetime: ""
				},
				// 修改纪念日数据
				changememorialForm: {
					content: "",
					datetime: "",
					id: ""
				},

			}
		},
		methods: {
			// 返回
			backmycenter() {
				uni.switchTab({
					url: "../more/more"
				})
			},
			// 获取纪念日数据
			async getmemorial() {
				const {
					data: res
				} = await this.$http({
					url: "memorial/usermemorial",
					method: "POST"
				})
				if (res.code == '200') {
					this.getmemorial()
					let nowTIme = new Date();
					this.memorialdata = res.data
					this.memorialdata.forEach((item, index) => {
						let setTime = new Date(item.datetime)
						this.memorialdata[index].nums = parseInt((setTime.getTime() - nowTIme.getTime()) / (
							60 * 60 * 24 * 1000))
					})
					//console.log(this.memorialdata)
				} else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "纪念日数据获取失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			},
			// 日期确定
			confirmdatetime(e) {
				this.showdatetime = false
				this.tagshow1 = true
				const timeFormat = uni.$u.timeFormat
				this.memorialForm.datetime = timeFormat(e.value, 'yyyy-mm-dd')
				// console.log(timeFormat(e.value, 'yyyy-mm-dd'))
			},
			// 修改日期确定
			changeconfirmdatetime(e) {
				this.changeshowdatetime = false
				this.changetagshow1 = true
				const timeFormat = uni.$u.timeFormat
				this.changememorialForm.datetime = timeFormat(e.value, 'yyyy-mm-dd')
				// console.log(timeFormat(e.value, 'yyyy-mm-dd'))
			},
			// 清除已选择时间
			tagclose() {
				this.tagshow1 = false
				this.memorialForm.datetime = ""
			},
			// 清楚已修改选择时间
			changetagclose() {
				this.changetagshow1 = false
				this.changememorialForm.datetime = ""
			},
			// 添加按钮
			async addmemorial() {
				if (this.memorialForm.content == "") {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "请输入纪念日名称",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				} else {
					if (this.memorialForm.datetime == "") {
						this.$refs.uToast.show({
							type: 'error',
							icon: false,
							message: "请输入纪念日时间",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
						})
					} else {
						const {
							data: res
						} = await this.$http({
							url: "memorial/addmemorial",
							method: "POST",
							data: {
								content: this.memorialForm.content,
								datetime: this.memorialForm.datetime
							}
						})
						console.log(res)
						if (res.code == '200') {
							this.memorialForm.content = ""
							this.memorialForm.datetime = ""
							this.shownewmemorial = false
							this.$refs.uToast.show({
								type: 'success',
								duration: 1000,
								message: "已成功添加一条纪念日",
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
							})
						} else {
							this.$refs.uToast.show({
								type: 'error',
								icon: false,
								message: "添加纪念日失败，请重试",
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
							})
						}
					}
				}
			},
			// 查看修改弹窗
			changememorialdata(item) {
				this.changeshownewmemorial = true
				this.changetagshow1 = true
				this.changememorialForm.content = item.content
				this.changememorialForm.datetime = item.datetime
				this.changememorialForm.id = item.id
				//console.log(item)
			},
			// 提交修改纪念日数据
			async changememorial() {
				const {
					data: res
				} = await this.$http({
					url: "memorial/updatememorial",
					method: "POST",
					data: {
						content: this.changememorialForm.content,
						datetime: this.changememorialForm.datetime,
						id: this.changememorialForm.id
					}
				})
				// console.log(res)
				if (res.code == "200") {
					this.getmemorial()
					this.changeshownewmemorial = false
					this.$refs.uToast.show({
						type: 'success',
						duration: 1000,
						message: "修改纪念日信息成功",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				} else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "修改纪念日信息失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			},
			// 删除纪念日
			async delconfirm() {
				this.showconfirm=false
				const {
					data: res
				} = await this.$http({
					url: "memorial/delememorial",
					method: "POST",
					data: {
						id: this.changememorialForm.id
					}
				})
				// console.log(res)
				if (res.code == "200") {
					this.changeshownewmemorial = false
					this.getmemorial()
					this.$refs.uToast.show({
						type: 'success',
						duration: 1000,
						message: "删除纪念日信息成功",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				} else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "删除纪念日信息失败",
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

	.listcontent {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.listbox {
		margin-top: -44rpx;
		overflow: auto;
		height: 90%;
		border-radius: 10px;
		width: 640rpx;
		background-color: white;
		box-shadow: 5px 5px 10px #efeded;
	}

	.allbar {
		margin-top: -40rpx;
		z-index: 2;
		display: flex;
		width: 400rpx;
		justify-content: space-between;
	}

	.subbar {
		width: 40rpx;
		height: 80rpx;
		background-color: #FFCBD4;
		border-radius: 20px;
		border: 5px solid #F8F8FB;
	}

	.subcontent {
		font-size: 15px;
		padding: 0 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.subcontentr {
			display: flex;
		}

		.subcontentrtext {
			margin: 0 20rpx;
			color: #FE738A;
			font-weight: bolder;
		}

		.toptext {
			color: #505050;
		}

		.bottomtext {
			font-size: 14px;
			color: #aaa;
		}

	}

	.choosedata {
		display: flex;
	}

	.space {
		height: 60rpx;
	}

	.addbacklog {
		width: 120rpx;
		height: 120rpx;
		z-index: 99;
		position: fixed;
		bottom: 140rpx;
		right: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.allbtns {
		margin-top: 20rpx;
	}

	.iconbtn {
		margin-top: 20rpx;
		width: 40rpx;
		height: 40rpx;
		float: left;
		margin-right: 60rpx;
	}

	.bottomadd {
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
	}

	.addbtn {
		width: 100rpx;
		height: 100rpx;
	}

	::v-deep .u-popup__content {
		opacity: 0.9 !important;
	}

	::v-deep .u-popup__content {
		padding: 30rpx;
	}
</style>
