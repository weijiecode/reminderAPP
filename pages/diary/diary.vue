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
					<view @click="showmemopage(item)" class="diaryitem" v-for="item in diarydata" :key="item.id">
						<view class="leftitem">
							<view class="oneleftitem">
								{{item.onedatetime}}
							</view>
							<view class="twoleftitem">
								{{item.twodatetime}}
							</view>
						</view>
						<view class="line"></view>
						<view class="rightitem">
							<view class="onerightitem">
								{{item.content}}
							</view>
							<view class="tworightitem">
								{{item.threetime}}
							</view>
						</view>
						<u-divider :dashed="true"></u-divider>
					</view>
				</view>
				<!-- 新建按钮 -->
				<view @click="toaddpage" class="addbacklog t-icon t-icon-add-copy-copy"></view>
			</view>
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
			this.getdiary()
		},
		data() {
			return {
				// 距离top高度
				topheight: "",
				// 用户所有日记数据
				diarydata: []
			}
		},
		methods: {
			// 返回
			backmycenter() {
				uni.switchTab({
					url: "../more/more"
				})
			},
			// 跳转添加页面
			toaddpage() {
				uni.navigateTo({
					url: "./adddiary"
				})
			},
			// 获取用户所有日记数据
			async getdiary() {
				const {
					data: res
				} = await this.$http({
					url: "diary/userdiary",
					method: "POST"
				})
				//console.log(res)
				if (res.code == '200') {
					this.diarydata = res.data
					this.diarydata.forEach((item, index) => {
						this.diarydata[index].onedatetime = (res.data[index].datetime.split(" ")[0]).split("/")[2]
						// this.diarydata[index].twodatetime = res.data[index].datetime.split(" ")[1]
						switch (res.data[index].datetime.split("/")[1]) {
							case '01':
								this.diarydata[index].twodatetime = '一月';
								break;
							case '02':
								this.diarydata[index].twodatetime = '二月';
								break;
							case '03':
								this.diarydata[index].twodatetime = '三月';
								break;
							case '04':
								this.diarydata[index].twodatetime = '四月';
								break;
							case '05':
								this.diarydata[index].twodatetime = '五月';
								break;
							case '06':
								this.diarydata[index].twodatetime = '六月';
								break;
							case '07':
								this.diarydata[index].twodatetime = '七月';
								break;
							case '08':
								this.diarydata[index].twodatetime = '八月';
								break;
							case '09':
								this.diarydata[index].twodatetime = '九月';
								break;
							case '10':
								this.diarydata[index].twodatetime = '十月';
								break;
							case '11':
								this.diarydata[index].twodatetime = '十一月';
								break;
							case '12':
								this.diarydata[index].twodatetime = '十二月';
								break;
							default:
								console.log("wrong...");
						}
						this.diarydata[index].threetime = res.data[index].datetime.split(" ")[2]
					})
					//console.log(this.diarydata)
				} else if (res.code == '201') {
					this.diarydata = ""
				} else {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "备忘录数据获取失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			},
			// 跳转详情页面
			showmemopage(item){
				console.log(item)
				uni.navigateTo({
					url: "./showdiary?data=" + JSON.stringify(item)
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
		background-color: #FFEEA8;
		border-radius: 20px;
		border: 5px solid #F8F8FB;
	}

	.title {
		margin-top: 60rpx;
		text-align: center;
	}


	.diaryitem {
		margin-top: 30rpx;
		width: 680rpx;
		height: 150rpx;
		background-color: white;
		border-radius: 15px;
		display: flex;
		align-items: center;
	}

	.allitem {
		margin-top: 40rpx;
	}
	
	.line {
		height: 40px;
		border-right: 1px dashed #aaa;
	}

	.leftitem {
		width: 100rpx;
		padding: 0 20rpx 0 40rpx;

		.oneleftitem {
			text-align: center;
			font-size: 20px;
			font-weight: bold;
		}

		.twoleftitem {
			text-align: center;
			font-size: 12px;
			color: #aaa;
		}
	}

	.rightitem {
		width: 450rpx;
		margin-left: 40rpx;
		.onerightitem {
			color: #464545;
			font-size: 13px;

			width: 400rpx;
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.tworightitem {
			color: #aaa;
			font-size: 12px;
			padding-top: 10rpx;
		}
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
</style>
