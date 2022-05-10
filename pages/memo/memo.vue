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
			<view @click="showmemopage(item)" class="itemmemo" v-for="item in memodata" :key="item.id">
				<view class="subtitle">{{item.title}}</view>
				<view class="subcontent">
					<u-icon name="calendar" color="#aaa" size="16"></u-icon>{{item.datetime}} {{item.content}}
				</view>
				<u-divider :dashed="true"></u-divider>
			</view>
		</view>
		</view>
		<!-- 消息提示 -->
		<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
		<!-- 新建按钮 -->
		<view @click="shownewmemo=true" class="addbacklog t-icon t-icon-add"></view>
		<!-- 备忘录弹窗 -->
		<u-popup :show="shownewmemo" :round="10" mode="bottom" @close="shownewmemo=false">
			<view style="height: 660rpx;">
				<u--input v-model="memoForm.title" placeholder="备忘录标题~" border="bottom" maxlength="15"
					clearable :focus="true"></u--input>
					<u--textarea border="none" height="170" maxlength="255" v-model="memoForm.content" placeholder="填写备忘录内容" count ></u--textarea>
				<view class="bottomadd">
					<view @click="addmemo" class="addbtn t-icon t-icon-tianjia2-copy"></view>
				</view>
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
		onShow(){
			this.getmemo()
		},
		data() {
			return {
				// 距离top高度
				topheight: "",
				// 用户备忘录数据
				memodata: [],
				// 添加备忘录按钮
				shownewmemo: false,
				// 修改备忘录按钮
				changeshownewmemo: false,
				// 备忘录提交表单
				memoForm: {
					title: "",
					content: ""
				},
				// 备忘录修改提交表单
				changememoForm: {
					title: "",
					content: ""
				}
			}
		},
		methods: {
			// 返回
			backmycenter() {
				uni.switchTab({
					url: "../more/more"
				})
			},
			// 添加备忘录
			async addmemo() {
				if (this.memoForm.title == "") {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "请输入备忘录标题",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				} else {
					if (this.memoForm.content == "") {
						this.$refs.uToast.show({
							type: 'error',
							icon: false,
							message: "请输入备忘录内容",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
						})
					} else {
						const {
							data: res
						} = await this.$http({
							url: "memo/addmemo",
							method: "POST",
							data: {
								title: this.memoForm.title,
								content: this.memoForm.content
							}
						})
						// console.log(res)
						if (res.code == '200') {
							this.getmemo()
							this.memoForm.content = ""
							this.memoForm.title = ""
							this.shownewmemo = false
							this.$refs.uToast.show({
								type: 'success',
								duration: 1000,
								message: "已成功添加一条备忘录",
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
							})
						} else {
							this.$refs.uToast.show({
								type: 'error',
								icon: false,
								message: "添加备忘录失败，请重试",
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
							})
						}
					}
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
					let nowTIme = new Date();
					this.memodata = res.data
					res.data.forEach((item,index) => {
						this.memodata[index].title = item.title
						this.memodata[index].content = item.title
						this.memodata[index].datetime = item.datetime.split(":")[0]+":"+item.datetime.split(":")[1]
					})
				}else if(res.code == '201'){
					this.memodata = ""
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
			// 跳转备忘录详情页面
			showmemopage(item) {
				// console.log(item)
				uni.navigateTo({
					url: "./showmemo?data=" + JSON.stringify(item)
				})
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
		padding-top: 40rpx;
		margin-top: -44rpx;
		overflow: auto;
		height: 90%;
		border-radius: 10px;
		width: 640rpx;
		background-color: white;
		box-shadow: 5px 5px 10px #efeded;
		display: flex;
		flex-direction: column;
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
		background-color: #B5AAF1;
		border-radius: 20px;
		border: 5px solid #F8F8FB;
	}
	
	
	.subtitle {
		font-size: 15px;
		color: #505050;
		padding-left: 40rpx;
	}
	
	.subcontent {
		display: flex;
		align-items: center;
		font-size: 12px;
		color: #aaa;
		margin-top: 8rpx;
		padding-left: 40rpx;
		width: 540rpx;
		overflow: hidden;
		white-space: nowrap;
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
	
	.bottomadd {
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
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
	
	::v-deep .u-textarea {
		margin-top: 40rpx;
	}

</style>
