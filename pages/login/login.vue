<template>
	<view class="content">
		<view class="loginbox">
			<image style="height: 300rpx;margin-top: 80rpx;" src="../../static/bg.svg" mode=""></image>
			<view class="accountbox">
				<view class="title">
					欢迎访问日暮清单
				</view>
				<view class="subtitle">
					请输入您的凭证访问账户
				</view>
				<u--form labelPosition="left" :model="loginForm" :rules="loginrules" ref="loginRef">
					<u-form-item prop="username">
						<u--input v-model="loginForm.username" clearable maxlength="8" shape="circle"
							placeholder="请输入账号" prefixIcon="account" prefixIconStyle="font-size: 22px;color: #909399">
						</u--input>
					</u-form-item>
					<u-form-item prop="password">
						<u--input v-model="loginForm.password" clearable maxlength="15" password shape="circle"
							placeholder="请输入密码" prefixIcon="lock" prefixIconStyle="font-size: 22px;color: #909399">
						</u--input>
					</u-form-item>
					<text class="findpwd" @click="findpwd">找回密码</text>
					<u-form-item>
						<u-button @click="submit" type="primary" shape="circle" text="按钮形状">登录</u-button>
					</u-form-item>
				</u--form>
				<text class="nouser">还没有账号？<text class="subnouser">注册账号</text></text>
			</view>
			<text class="agree">登录或完成注册即代表你同意<text class="subtitle">用户协议</text>和<text
					class="subtitle">隐私政策</text></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginForm: {
					username: "",
					password: ""
				},
				loginrules: {
					'username': [{
							type: 'string',
							required: true,
							message: '请输入账号',
							trigger: ['blur', 'change']
						},
						{
							min: 3,
							max: 8,
							message: '账号长度在3-8个字符之间'
						}
					],
					'password': [{
							type: 'string',
							max: 15,
							required: true,
							message: '请输入密码',
							trigger: ['blur', 'change']
						},
						{
							min: 6,
							max: 15,
							message: '密码长度在6-15个字符之间'
						}
					]
				},
			}
		},
		methods: {
			submit() {
				this.$refs.loginRef.validate().then(async res => {
					const result = await this.$http({
						url: "account/mobilelogin",
						method: "POST",
						data: {
							username: this.loginForm.username,
							password: this.loginForm.password
						}
					})
					if(result.data.code == 200) {
						this.$store.commit('set_token',result.data.token)
						uni.switchTab({
							url:"../index/index"
						})
					}
					else {
						uni.$u.toast('账号或密码错误，请重试')
					}
				}).catch(errors => {
					uni.$u.toast('登录失败，请重试')
				})
			},
			findpwd() {
				uni.$u.toast("请联系管理员找回")
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #f3f6fe;
		height: 100%;
	}

	.content {
		height: 100%;
		background-color: #f3f6fe;
	}

	.loginbox {
		margin-top: -20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.logoimg {
			margin-top: 200rpx;
			width: 150rpx;
			height: 150rpx;
			border-radius: 10px;
		}
	}

	.accountbox {
		box-shadow: 5px 5px 10px #efeded;
		border-radius: 10px;
		margin-top: 60rpx;
		width: 680rpx;
		height: 780rpx;
		background-color: #FFFFFF;

		.title {
			margin-top: 60rpx;
			text-align: center;
			font-size: 22px;
			font-weight: 600;
			color: #525151;
		}

		.subtitle {
			margin-top: 20rpx;
			text-align: center;
			color: #aaa;
			font-size: 15px;
		}
	}

	::v-deep .u-form-item {
		width: 500rpx;
		height: 80rpx;
		margin: 50rpx auto;
	}

	::v-deep .u-button--primary {
		width: 320rpx;
	}

	.findpwd {
		font-size: 15px;
		float: right;
		margin-right: 90rpx;
		color: #5da7f1;
	}

	.nouser {
		margin-left: 60rpx;
		font-size: 14px;
		float: left;
		cursor: default;
		color: #aaa;
		margin-top: 40rpx;
	}

	.subnouser {
		color: #5da7f1;
		cursor: pointer;
		font-size: 14px;
	}

	.agree {
		margin-top: 20rpx;
		color: #aaa;
		font-size: 12px;

		.subtitle {
			text-decoration: underline;
			margin: 0 10rpx;
			cursor: pointer;
			color: #5da7f1;
		}
	}
</style>
