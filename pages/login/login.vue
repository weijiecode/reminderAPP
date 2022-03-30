<template>
	<view class="content">
		<!-- 注册成功后的提示 -->
		<u-notify ref="uNotify"></u-notify>
		<view class="loginbox">
			<image v-if="isloginorregister==0" style="height: 380rpx;" src="../../static/bg.svg" mode=""></image>
			<!-- 登录界面 -->
			<view v-if="isloginorregister==0" class="accountbox">
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
						<u-button style="width: 320rpx;" @click="submit" type="primary" shape="circle">登录</u-button>
					</u-form-item>
				</u--form>
				<text @click="isloginorregister=1" class="nouser">还没有账号？<text class="subnouser">注册账号</text></text>
			</view>
			<!-- 注册界面 -->
			<view style="margin-top: 120rpx;height: 1120rpx;" v-if="isloginorregister==1" class="accountbox">
				<view class="title" style="margin-bottom: 20rpx;">
					欢迎访问日暮清单
				</view>
				<u-steps style="margin-top: 60rpx;" :current="indexnum">
					<u-steps-item title="账号密码">
					</u-steps-item>
					<u-steps-item title="个人资料"></u-steps-item>
					<u-steps-item title="确认信息"></u-steps-item>
				</u-steps>
				<!-- 步骤1输入账号密码 -->
				<u--form v-if="indexnum==0" labelPosition="left" :model="regForm" :rules="regrules" ref="regRef">
					<u-form-item :required="true" label="账号" prop="reg_username">
						<u--input v-model="regForm.reg_username" clearable maxlength="8" shape="circle"
							placeholder="请输入账号" prefixIconStyle="font-size: 22px;color: #909399">
						</u--input>
					</u-form-item>
					<u-form-item :required="true" label="密码" prop="reg_password">
						<u--input v-model="regForm.reg_password" clearable maxlength="15" password shape="circle"
							placeholder="请输入密码" prefixIconStyle="font-size: 22px;color: #909399">
						</u--input>
					</u-form-item>
					<u-form-item :required="true" label="确认密码" prop="reg_checkPassword">
						<u--input placeholder="请再次输入密码" clearable maxlength="15" password
							v-model="regForm.reg_checkPassword" shape="circle">
						</u--input>
					</u-form-item>
					<u-form-item>
						<u-button style="margin-top: 30rpx;" @click="nextbtn" shape="circle">下一步</u-button>
					</u-form-item>
				</u--form>
				<!-- 步骤2个人资料 -->
				<u--form v-if="indexnum==1" labelPosition="left" :model="regdataForm" :rules="regdatarules"
					ref="regdataRef">
					<u-form-item :required="true" label="昵称" prop="reg_nickname">
						<u--input v-model="regdataForm.reg_nickname" clearable shape="circle" placeholder="昵称"
							prefixIconStyle="font-size: 22px;color: #909399">
						</u--input>
					</u-form-item>
					<u-form-item label="手机">
						<u--input v-model="regdataForm.reg_phone" maxlength="11" clearable shape="circle"
							placeholder="手机号码" prefixIconStyle="font-size: 22px;color: #909399">
						</u--input>
					</u-form-item>
					<u-form-item label="性别" prop="reg_phone">
						<u-radio-group v-model="regdataForm.reg_sex">
							<u-radio :name="0" shape="circle"></u-radio>
							<view style="margin-right: 20rpx;" class="t-icon t-icon-xingbie1"></view>
							<u-radio :name="1" style="margin-left: 25rpx;" shape="circle"></u-radio>
							<view class="t-icon t-icon-xingbie"></view>
						</u-radio-group>
					</u-form-item>
					<u-form-item>
						<u-button @click="indexnum=0" shape="circle">上一步</u-button>
						</u-button>
					</u-form-item>
					<u-form-item style="margin-top: 40rpx;">
						<u-button type="primary" @click="twonextbtn" shape="circle">下一步
						</u-button>
					</u-form-item>
				</u--form>
				<!-- 步骤3个人资料 -->
				<u--form v-if="indexnum==2" labelPosition="left">
					<u-form-item label="账号">
						<u--input disabled v-model="regForm.reg_username" shape="circle"
							prefixIconStyle="font-size: 22px;color: #909399">
						</u--input>
					</u-form-item>
					<u-form-item label="昵称">
						<u--input disabled v-model="regdataForm.reg_nickname" clearable shape="circle" placeholder="昵称"
							prefixIconStyle="font-size: 22px;color: #909399">
						</u--input>
					</u-form-item>
					<u-form-item label="手机">
						<u--input disabled v-model="regdataForm.reg_phone" clearable shape="circle"
							prefixIconStyle="font-size: 22px;color: #909399">
						</u--input>
					</u-form-item>
					<u-form-item label="性别" prop="reg_phone">
						<u-radio-group disabled v-model="regdataForm.reg_sex">
							<u-radio :name="1" style="margin-left: 25rpx;" shape="circle"></u-radio>
							<view class="t-icon t-icon-xingbie1"></view>
							<u-radio :name="0" shape="circle"></u-radio>
							<view style="margin-right: 20rpx;" class="t-icon t-icon-xingbie"></view>
						</u-radio-group>
					</u-form-item>
					<u-form-item>
						<u-button @click="indexnum=1" shape="circle">上一步</u-button>
					</u-form-item>
					<u-form-item style="margin-top: 20rpx;">
						<u-button @click="regbtn" type="primary" shape="circle">确认注册</u-button>
					</u-form-item>
				</u--form>
				<text style="margin-top: 100rpx;" @click="isloginorregister=0" class="nouser">已经有账号？<text
						class="subnouser">登录账号</text></text>
			</view>
			<p class="agree">登录或完成注册即代表你同意<navigator style="display: inline;" url="../agreement/agreement" class="subtitle">用户协议</navigator>和<navigator
					class="subtitle" style="display: inline;" url="../private/private">隐私政策</navigator></p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			// 注册两次密码验证
			var validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入您的密码"));
				} else {
					if (this.regForm.reg_checkPassword !== "") {
						this.$refs.regRef.validateField("reg_checkPassword");
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请再次输入您的密码"));
				} else if (value !== this.regForm.reg_password) {
					callback(new Error("两次输入密码不一致!"));
				} else {
					callback();
				}
			};
			return {
				// 注册和登录界面
				isloginorregister: 0,
				// 步骤条
				indexnum: 0,
				// 登录表单
				loginForm: {
					username: "",
					password: ""
				},
				// 注册表单
				regForm: {
					reg_username: "",
					reg_password: "",
					reg_checkPassword: "",
				},
				// 注册表单个人资料
				regdataForm: {
					reg_nickname: "",
					reg_sex: 1,
					reg_phone: "",
				},
				// 登录表单验证规则
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
						},
						// 正则判断为字母或数字
						{
							pattern: /^[0-9a-zA-Z]*$/g,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '只能包含字母或数字'
						}
					],
					'password': [{
							type: 'string',
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
				// 个人资料表单规则
				'regdatarules': {
					'reg_nickname': [{
						min: 3,
						max: 8,
						message: '昵称长度在3-8个字符之间',
						trigger: ['blur', 'change']
					}, {
						type: 'string',
						max: 8,
						required: true,
						message: '请输入昵称',
						trigger: ['blur', 'change']
					}]
				},
				// 注册表单验证规则
				regrules: {
					'reg_username': [{
						min: 3,
						max: 8,
						message: '账号长度在3-8个字符之间',
						trigger: ['blur', 'change']
					}, {
						type: 'string',
						max: 15,
						required: true,
						message: '请输入账号',
						trigger: ['blur', 'change']
					}],
					'reg_password': [{
							validator: validatePass,
							trigger: ['blur', 'change']
						}, {
							type: 'string',
							max: 15,
							required: true,
							message: '请输入密码',
							trigger: ['blur', 'change']
						},
						{
							min: 6,
							max: 15,
							message: '密码长度在6-15个字符之间',
							trigger: ['blur', 'change']
						}
					],
					'reg_checkPassword': [{
							validator: validatePass2,
							trigger: ['blur', 'change']
						}, {
							type: 'string',
							max: 15,
							required: true,
							message: '请再次输入密码',
							trigger: ['blur', 'change']
						},
						{
							min: 6,
							max: 15,
							message: '密码长度在6-15个字符之间',
							trigger: ['blur', 'change']
						}
					],
				}
			}
		},
		methods: {
			// 登录操作
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
					if (result.data.code == 200) {
						this.$refs.uNotify.success('登录成功')
						this.$store.commit('set_token', result.data.token)
						uni.setStorageSync('username', result.data.data.username)
						uni.setStorageSync('nickname', result.data.data.nickname)
						uni.setStorageSync('photo', result.data.data.photo)
						uni.setStorageSync('sex', result.data.data.sex)
						uni.setStorageSync('introduction', result.data.data.introduction)
						uni.switchTab({
							url: "../index/index"
						})
					} else {
						uni.$u.toast('账号或密码错误，请重试')
					}
				}).catch(errors => {
					uni.$u.toast('登录失败，请重试')
				})
			},
			// 找回密码
			findpwd() {
				uni.$u.toast("请联系管理员找回")
			},
			// 下一步
			nextbtn() {
				if (this.regForm.reg_password != this.regForm.reg_checkPassword) {
					uni.$u.toast('密码不一致，请重试')
				} else {
					// 循环字符串里面的每一个字符判断是否只包含数字和字母
					var c = 0;
					for (var i = 0; i < this.regForm.reg_username.length; i++) {
						var s = this.regForm.reg_username.charAt(i);
						var r = /^[A-Za-z0-9]$/;
						var b = r.test(s);
						if (b == false) {
							c = 1;
						}
					}
					if (c == 1) {
						uni.$u.toast('用户名只能为数字或字母，请修改后重试')
					} else if(c == 0){
						this.$refs.regRef.validate().then(async res => {
							const result = await this.$http({
								url: "account/selectusername",
								method: "POST",
								data: {
									username: this.regForm.reg_username
								}
							})
							if (result.data.code == 200) {
								uni.$u.toast('该用户名已被使用，请重新修改')
							} else {
								this.indexnum = 1
							}
						}).catch(errors => {
							uni.$u.toast('请填写正确后，重试')
						})
					}
				}
			},
			// 步骤2的下一步
			twonextbtn() {
				this.$refs.regdataRef.validate().then(res => {
					this.indexnum = 2
				}).catch(errors => {
					uni.$u.toast('请填写正确后，重试')
				})
			},
			// 确认注册
			async regbtn() {
				const res = await this.$http({
					url: 'account/register',
					method: 'POST',
					data: {
						reg_username: this.regForm.reg_username,
						reg_password: this.regForm.reg_password,
						reg_nickname: this.regdataForm.reg_nickname,
						reg_sex: this.regdataForm.reg_sex,
						reg_phone: this.regdataForm.reg_phone
					}
				})
				console.log(res)
				if (res.data.code == 200) {
					this.$refs.uNotify.success('注册成功，请登录')
					uni.navigateTo({
						url:'../login/login'
					})
				} else {
					this.$refs.uNotify.error('注册失败，请重试')
				}
			},
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
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loginbox {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: -20rpx;

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
