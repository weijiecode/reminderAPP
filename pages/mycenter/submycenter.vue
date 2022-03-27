<template>
	<view class="content">
		<view class="submycenterbox">
			<view class="topback">
				<u-icon size="25" @click="backmycenter" name="arrow-left"></u-icon>
			</view>
			<view class="listdata">
				<view class="photo">
					<view class="title">头像</view>
					<view class="listcontent">
						<image v-if="photo!=null" :src="photo" mode="">
						<span id="nophoto" v-if="photo==null && sex==0" class="t-icon t-icon-icon-test"></span>
						<span id="nophoto" v-if="photo==null && sex==1" class="t-icon t-icon-icon-test2"></span>
						<view style="margin-left: 320rpx;" class="t-icon t-icon-xiangyou1"></view>
					</view>
				</view>
				<view class="nickname">
					<view class="title">昵称</view>
					<view class="listcontent">
						  <u--input
						  v-model="nickname"
						      placeholder="请输入内容"
						      border="none"
						    ></u--input>
						<view style="margin-left: 80rpx;" class="t-icon t-icon-xiangyou1"></view>
					</view>
				</view>
				<view class="sex">
					<view class="title">性别</view>
					<view class="listcontent">
						<span v-if="sex==0" style="margin-left: 20rpx;" class="t-icon t-icon-xingbie"></span>
						<span v-if="sex==1" style="margin-left: 20rpx;" class="t-icon t-icon-xingbie1"></span>
						<view style="margin-left: 380rpx;" class="t-icon t-icon-xiangyou1"></view>
					</view>
				</view>
				<view class="phone">
					<view class="title">手机号码</view>
					<view class="listcontent">
						<u--input
						v-model="phone"
						    placeholder="请输入内容"
						    border="none"
						  ></u--input>
						<view style="margin-left: 80rpx;" class="t-icon t-icon-xiangyou1"></view>
					</view>
				</view>
				<view class="email">
					<view class="title">电子邮箱</view>
					<view class="listcontent">
						<u--input
						v-model="email"
						    placeholder="请输入内容"
						    border="none"
						  ></u--input>
						<view style="margin-left: 80rpx;" class="t-icon t-icon-xiangyou1"></view>
					</view>
				</view>
				<view class="introduction">
					<view class="title">个人简介</view>
					<view class="listcontent">
						<u--input
						v-model="introduction"
						    placeholder="请输入内容"
						    border="none"
						  ></u--input>
						<view style="margin-left: 80rpx;" class="t-icon t-icon-xiangyou1"></view>
					</view>
				</view>
			</view>
			<view class="submit">
				<u-button type="primary" text="保存"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onShow(){
			this.getuserdata()
		},
		data() {
			return {
				nickname: "",
				photo: "",
				sex: "",
				introduction: "",
				email: "",
				phone: ""
			}
		},
		methods: {
			// 返回我的
			backmycenter() {
				uni.switchTab({
					url:"mycenter"
				})
			},
			async getuserdata() {
				const result = await this.$http({
					url: "mycenter/userdata",
					method: "POST"
				})
				if(result.data.code == 200) {
					this.nickname = result.data.data[0].nickname
					this.photo = result.data.data[0].photo
					this.sex = result.data.data[0].sex
					this.introduction = result.data.data[0].introduction
					this.email = result.data.data[0].email
					this.phone = result.data.data[0].phone
				}else {
					uni.$u.toast('获取个人信息失败，请重试')
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
	}
	.submycenterbox {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.topback {
		margin-top: 60rpx;
		margin-left: 40rpx;
		align-self: flex-start;
	}
	.listdata {
		margin-top: 80rpx;
		width: 640rpx;
		background-color: #ffffff;
		border-radius: 10px;
		box-shadow: 5px 5px 10px #efeded;
		display: flex;
		flex-direction: column;
		padding: 40rpx;
		.photo,.nickname,.sex,.phone,.email,.introduction {
			display: flex;
			flex-direction: row;
			background-color: #ffffff;
			height: 120rpx;
			align-items: center;
			position: relative;
		}
		image {
			margin-left: 60rpx;
			width: 90rpx;
			height: 90rpx;
			border-radius: 100%;
			box-shadow: 0 0 0 3px #f3efef;
		}
		#nophoto {
			margin-left: 60rpx;
			width: 90rpx;
			height: 90rpx;
			border-radius: 100%;
			box-shadow: 0 0 0 3px #f3efef;
		}
	}
	.listcontent {
		position: absolute;
		right: 0;
		display: flex;
		align-items: center;
	}
	.submit {
		margin-top: 100rpx;
		width: 340rpx;
	}
	::v-deep .u-border-bottom{
		border-bottom-style: none;
	}

</style>
