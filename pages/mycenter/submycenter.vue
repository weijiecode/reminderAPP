<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<span @click="backmycenter" id="backtop" class="btnshow t-icon t-icon-fanhui2"></span>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback">
			<!-- <u-icon size="25" @click="backmycenter" name="arrow-left"></u-icon> -->
			<span @click="backmycenter" id="backtop" class="btnshow t-icon t-icon-fanhui2"></span>
		</view>
		<!-- #endif -->
		<view class="submycenterbox">
			<!-- <view class="topback">
				<u-icon size="25" @click="backmycenter" name="arrow-left"></u-icon>
			</view> -->
			<view class="photo">
				<!-- <u-upload :previewFullImage="true" :fileList="fileList1" @afterRead="afterRead"
						@delete="deletePic" name="1" multiple :maxCount="1"></u-upload> -->
				<u-upload :fileList="fileList6" @afterRead="afterRead" @delete="deletePic" name="6" multiple
					:maxCount="1" :max-size="2 * 1024 * 1024" @oversize="oversize">
					<image v-if="mycenterForm.photo!=null" :src="mycenterForm.photo" mode="">
						<span id="nophoto" v-if="mycenterForm.photo==null && sex==0"
							class="t-icon t-icon-icon-test"></span>
						<span id="nophoto" v-if="mycenterForm.photo==null && sex==1"
							class="t-icon t-icon-icon-test2"></span>
				</u-upload>
			</view>
			<view class="titlephoto">
				点击更换头像
			</view>
			<view class="listdata">
				<u--form labelPosition="left" :model="mycenterForm" :rules="mycenterrules" ref="mycenterRef">
					<view class="username" @click="noupdate">
						<view class="title">用户名</view>
						<view class="listcontent">
							<u-form-item prop="nickname">
								<u--input inputAlign="right" v-model="mycenterForm.username" disabledColor="#ffffff" disabled border="none"></u--input>
							</u-form-item>
							<view style="margin-left: 10rpx;" class="t-icon t-icon-xiangyou1"></view>
						</view>
					</view>
					<view class="nickname">
						<view class="title">昵称</view>
						<view class="listcontent">
							<u-form-item prop="nickname">
								<u--input inputAlign="right" v-model="mycenterForm.nickname" placeholder="请输入内容" border="none"></u--input>
							</u-form-item>
							<view style="margin-left: 10rpx;" class="t-icon t-icon-xiangyou1"></view>
						</view>
					</view>
					<view class="sex" @click="mycenterForm.sex==0?mycenterForm.sex=1:mycenterForm.sex=0">
						<view class="title">性别</view>
						<view class="listcontent">
							<span v-if="mycenterForm.sex==0" style="margin-left: 20rpx;"
								class="t-icon t-icon-xingbie"></span>
							<span v-if="mycenterForm.sex==1" style="margin-left: 20rpx;"
								class="t-icon t-icon-xingbie1"></span>
							<view style="margin-left: 10rpx;" class="t-icon t-icon-xiangyou1"></view>
						</view>
					</view>
					<view class="phone">
						<view class="title">手机号码</view>
						<view class="listcontent">
							<u-form-item>
								<u--input inputAlign="right" type="number" maxlength="11" v-model="mycenterForm.phone" placeholder="请输入号码"
									border="none"></u--input>
							</u-form-item>
							<view style="margin-left: 10rpx;" class="t-icon t-icon-xiangyou1"></view>
						</view>
					</view>
					<view class="email">
						<view class="title">电子邮箱</view>
						<view class="listcontent">
							<u-form-item>
								<u--input inputAlign="right" maxlength="20" v-model="mycenterForm.email" placeholder="请输入电子邮箱"
									border="none"></u--input>
							</u-form-item>
							<view style="margin-left: 10rpx;" class="t-icon t-icon-xiangyou1"></view>
						</view>
					</view>
					<view class="introduction">
						<view class="title">个人简介</view>
						<view class="listcontent">
							<u-form-item>
								<u--input inputAlign="right" maxlength="15" v-model="mycenterForm.introduction" placeholder="请输入个人简介"
									border="none">
								</u--input>
							</u-form-item>
							<view style="margin-left: 10rpx;" class="t-icon t-icon-xiangyou1"></view>
						</view>
					</view>
				</u--form>
			</view>
			<view class="submit">
				<u-button @click="submitdata" type="primary" text="保存"></u-button>
			</view>
			<view class="login" @click="logintest">
				登录test
			</view>
		</view>
	</view>
</template>

<script>
	import {getstatusBarHeight} from '../../components/mixins/mixin.js'
	export default {
		// #ifdef MP-WEIXIN
		mixins: [getstatusBarHeight],
		// #endif
		onShow() {
			this.getuserdata()
		},
		data() {
			return {
				mycenterForm: {
					username: "",
					nickname: "",
					photo: "",
					sex: "",
					introduction: "",
					email: "",
					phone: "",
				},
				// storage用户数据
				userdata: {
					nickname: '',
					photo: '',
					sex: '',
					introduction: ''
				},
				newphone: "",
				// 头像
				fileList6: [],
				// 个人信息表单验证规则
				mycenterrules: {
					'nickname': [{
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
			}
		},
		methods: {
			logintest() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			// 返回我的
			backmycenter() {
				uni.switchTab({
					url: "mycenter"
				})
			},
			// 获取个人信息
			async getuserdata() {
				const result = await this.$http({
					url: "mycenter/userdata",
					method: "POST"
				})
				if (result.data.code == 200) {
					this.mycenterForm.username = result.data.data[0].username
					this.mycenterForm.nickname = result.data.data[0].nickname
					this.mycenterForm.photo = result.data.data[0].photo
					this.mycenterForm.sex = result.data.data[0].sex
					this.mycenterForm.introduction = result.data.data[0].introduction
					this.mycenterForm.email = result.data.data[0].email
					this.mycenterForm.phone = result.data.data[0].phone
				} else {
					uni.$u.toast('获取个人信息失败，请重试')
				}
			},
			// 头像超出大小限制
			oversize() {
				uni.showToast({
					title: "图片最大不能超过2M",
					icon: 'none'
				})
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			// 上传
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://localhost:5001/mycenter/mobilephotouploadurl', // 接口地址
						filePath: url,
						header: this.getAuthHeaders(),
						name: 'file',
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
							this.newphoto = res.data.slice(1, res.data.length - 1)
							this.setphoto()
						}
					});
				})
			},
			async setphoto() {
				const result = await this.$http({
					url: "mycenter/updatephoto",
					method: "POST",
					data: {
						photo: this.newphoto,
						oldphoto: this.mycenterForm.photo
					}
				})
				if (result.data.code == 200) {
					// uni.setStorageSync('photo', this.newphoto)
					this.userdata = {
						nickname: this.mycenterForm.nickname,
						photo: this.newphoto,
						sex: this.mycenterForm.sex,
						introduction: this.mycenterForm.introduction
					}
					uni.setStorageSync('userdata', JSON.stringify(this.userdata))
					uni.$u.toast('修改头像成功')
				}
			},
			// 提示禁止修改用户名
			noupdate() {
				uni.$u.toast('用户名不允许修改')
			},
 			submitdata() {
				this.$refs.mycenterRef.validate().then(async res => {
					const result = await this.$http({
						url: "mycenter/updateuserdata",
						method: "POST",
						data: {
							nickname: this.mycenterForm.nickname,
							phone: this.mycenterForm.phone,
							sex: this.mycenterForm.sex,
							email: this.mycenterForm.email,
							introduction: this.mycenterForm.introduction
						}
					})
					if (result.data.code == 200) {
						setTimeout(() => {
							uni.$u.toast('修改个人信息成功')
						}, 500)
						// uni.setStorageSync('nickname', this.mycenterForm.nickname)
						// uni.setStorageSync('phone', this.mycenterForm.phone)
						// uni.setStorageSync('sex', this.mycenterForm.sex)
						// uni.setStorageSync('email', this.mycenterForm.email)
						// uni.setStorageSync('introduction', this.mycenterForm.introduction)
						this.userdata = {
							nickname: this.mycenterForm.nickname,
							photo: this.mycenterForm.photo,
							sex: this.mycenterForm.sex,
							introduction: this.mycenterForm.introduction
						}
						uni.setStorageSync('userdata', JSON.stringify(this.userdata))
						setTimeout(() => {
							uni.switchTab({
								url: "mycenter"
							}, 1000)
						})
					} else {
						uni.$u.toast('修改失败，请重试')
					}
				}).catch(errors => {
					uni.$u.toast('服务器异常，请重试')
				})
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
	
	.title {
		font-size: 15px;
	}

	.listdata {
		margin-top: 50rpx;
		width: 600rpx;
		background-color: #ffffff;
		border-radius: 10px;
		box-shadow: 5px 5px 10px #efeded;
		display: flex;
		flex-direction: column;
		padding: 20rpx 40rpx;

		.username,
		.photo,
		.nickname,
		.sex,
		.phone,
		.email,
		.introduction {
			display: flex;
			flex-direction: row;
			background-color: #ffffff;
			height: 110rpx;
			align-items: center;
			position: relative;
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

	::v-deep .u-border-bottom {
		border-bottom-style: none;
	}

	::v-deep .u-upload__wrap__preview__image { 
		width: 140rpx !important;
		height: 140rpx !important;
		border-radius: 100%;
		box-shadow: 0 0 0 3px #f3efef;
	}
	
	::v-deep .uni-input-input {
		color: #aaa !important;
	}

	image {
		width: 140rpx;
		height: 140rpx;
		border-radius: 100%;
		box-shadow: 0 0 0 3px #f3efef;
	}

	#nophoto {
		width: 140rpx;
		height: 140rpx;
		border-radius: 100%;
		box-shadow: 0 0 0 3px #f3efef;
	}

	::v-deep .u-upload {
		width: 140rpx;
	}

	.titlephoto {
		font-size: 13px;
		color: #aaa;
		margin-top: 10rpx;
	}
</style>
