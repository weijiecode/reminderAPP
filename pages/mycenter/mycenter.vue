<template>
	<view class="content">
		<view class="navigate">
			<navigator url="/pages/mycenter/submycenter" hover-class="navigator-hover" class="account">
				<image v-if="photo!=null" :src="photo" mode="">
				<span id="nophoto" v-if="photo==null && sex==0" class="t-icon t-icon-icon-test"></span>
				<span id="nophoto" v-if="photo==null && sex==1" class="t-icon t-icon-icon-test2"></span>
				</image>
				<view class="online">
				</view>
				<view class="nickname">
				{{nickname}}
				<span v-if="sex==0" style="margin-left: 20rpx;" class="t-icon t-icon-xingbie"></span>
				<span v-if="sex==1" style="margin-left: 20rpx;" class="t-icon t-icon-xingbie1"></span>
				</view>
				<view style="position: absolute;bottom: 80rpx;right: 40rpx;" class="t-icon t-icon-xiangyou1"></view>
				<p v-if="introduction!=null" class="pintroduction">{{introduction}}</p>
				<p v-if="introduction==null" class="pintroduction">暂无简介</p>
			</navigator>
			<view class="setting">
				<view class="subtitlename">
					设置
				</view>
				<view class="onecontent" @click="tomessage">
					<view class="subleft">
						<span class="t-icon t-icon-xingbie"></span>
						我的消息
						<u-badge v-if="msgnum>0" shape="horn" type="warning" max="99" :value="msgnum"></u-badge>
					</view>
					<view class="subright">
						<view class="t-icon t-icon-xiangyou1"></view>
					</view>
				</view>
				<u-divider :dashed="true"></u-divider>
				<view class="onecontent">
					<view class="subleft">
						<span class="t-icon t-icon-xingbie"></span>
						提醒管理
					</view>
					<view class="subright">
						<view class="t-icon t-icon-xiangyou1"></view>
					</view>
				</view>
				<u-divider :dashed="true"></u-divider>
				<view class="onecontent">
					<view class="subleft">
						<span class="t-icon t-icon-xingbie"></span>
						提醒管理
					</view>
					<view class="subright">
						<view class="t-icon t-icon-xiangyou1"></view>
					</view>
				</view>
				<u-divider :dashed="true"></u-divider>
				
			</view>
			<view class="others">
				<view class="subtitlename">
					其它
				</view>
				<view class="onecontent">
					<view class="subleft">
						<span class="t-icon t-icon-xingbie"></span>
						提醒管理
					</view>
					<view class="subright">
						<view class="t-icon t-icon-xiangyou1"></view>
					</view>
				</view>
				<u-divider :dashed="true"></u-divider>
				<view class="onecontent">
					<view class="subleft">
						<span class="t-icon t-icon-xingbie"></span>
						提醒管理
					</view>
					<view class="subright">
						<view class="t-icon t-icon-xiangyou1"></view>
					</view>
				</view>
				<u-divider :dashed="true"></u-divider>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onShow(){
			const {nickname,photo,sex,introduction} = JSON.parse(uni.getStorageSync('userdata'))
			this.nickname = nickname
			this.photo = photo
			this.sex = sex
			this.introduction = introduction
			this.getUserMsgNum()
		},
		data() {
			return {
				nickname: "",
				photo: "",
				sex: "",
				introduction: "",
				// 未读消息数
				msgnum: 0,
			}
		},
		methods: {
			async getuserdata(){
				const res = await this.$http({
					url:"account/userdata"
				})
			},
			// 跳转我的消息页面
			tomessage() {
				uni.navigateTo({
					url: "../message/message"
				})
			},
			// 获取未读消息数
			async getUserMsgNum() {
				const { data: res } = await this.$http({
					url: 'message/usermessage',
					method: 'GET'
				})
				if(res.code == '200') {
					this.msgnum = 0;
					res.data.forEach(item => {
						if(item.isread == 0)this.msgnum++
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		height: 100%;
		background-color: #F8F8FB;
		// background-image: linear-gradient(62deg, #f8f8fb 23%, #fae9ff 53%, #f8f8fb 95%) !important;
	}
	.navigate {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.account {
		margin-top: 160rpx;
		width: 640rpx;
		height: 180rpx;
		background-color: #ffffff;
		border-radius: 10px;
		box-shadow: 5px 5px 10px #efeded;
		position: relative;

		image {
			float: left;
			margin-left: 60rpx;
			margin-top: 35rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			box-shadow: 0 0 0 3px #f3efef;
		}
		#nophoto {
			float: left;
			margin-left: 60rpx;
			margin-top: 35rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			box-shadow: 0 0 0 3px #f3efef;
		}

		.nickname {
			float: left;
			color: #6a6767;
			font-weight: 600;
			margin-top: 60rpx;
			margin-left: 40rpx;
			display: block;
		}

		.t-icon {
		}

		.online {
			background-color: #8bcf70;
			width: 18rpx;
			height: 18rpx;
			border-radius: 100%;
			position: absolute;
			top: 112rpx;
			left: 140rpx;
			border: 2rpx solid #FFFFFF;
		}
		.pintroduction {
			font-size: 12px;
			color: #aaa;
			position: absolute;
			bottom: 36rpx;
			left: 200rpx;
		}
	}

	.setting {
		margin-top: 40rpx;
		border-radius: 10px;
		width: 640rpx;
		padding-bottom: 40rpx;
		background-color: #ffffff;
		box-shadow: 5px 5px 10px #efeded;
		display: flex;
		flex-direction: column;
	}
	
	.subtitlename {
		font-size: 12px;
		color: #aaa;
		padding: 40rpx 40rpx 0 40rpx;
	}

	.others {
		width: 640rpx;
		padding-bottom: 40rpx;
		margin-top: 40rpx;
		border-radius: 10px;
		background-color: #ffffff;
		box-shadow: 5px 5px 10px #efeded;
		display: flex;
		flex-direction: column;
	}
	
	.onecontent {
		padding: 30rpx 40rpx 30rpx 40rpx;
		display: flex;
		justify-content: space-between;
	}
	
	.subleft {
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #6a6767;
		.t-icon {
			margin-right: 12rpx !important;
		}
	}
	
	::v-deep .u-divider {
		width: 560rpx !important;
		margin: -10rpx auto !important;
	}
	
	::v-deep .u-badge--warning {
		margin-left: 20rpx;
	}
</style>
