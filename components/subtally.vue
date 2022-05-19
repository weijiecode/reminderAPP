<template>
	<view>
		<view class="tally">
			<view class="oneblock" @click="tallypage">
				<view class="iconbg">
					<span class="typeicon t-icon t-icon-qianbao"></span>
				</view>
				<view class="tallytitle">
					<view class="onetitle">
						记账
					</view>
					<view class="twotitle">
						有{{tallydata}}条账单
					</view>
				</view>
				<view class="rightback">
					<span class="backicon t-icon t-icon-xiangyou1"></span>
				</view>
			</view>
			<view class="twoblock">
				<view class="subtitle" v-if="income" @click="btnin">
					<view class="subonetitle">收入</view>
					<u-icon name="arrow-down-fill"></u-icon>
				</view>
				<view class="subtitle" v-if="!income" @click="btnout">
					<view class="subonetitle">支出</view>
					<u-icon name="arrow-up-fill"></u-icon>
				</view>
				<view class="line"></view>
				<!-- 收入 -->
				<view class="subcontent" v-if="income">
					<view class="iconitem" @click="submitForm.tallytype='工资'">
						<view v-if="submitForm.tallytype!='工资'" class="iconsty">
							<span class="t-icon t-icon-tallywaihui"></span>
						</view>
						<view v-if="submitForm.tallytype=='工资'" class="iconsty1" style="background-color: #518BF1;">
							<span class="t-icon t-icon-tallywaihui1"></span>
						</view>
						<view class="icontitle">工资</view>
					</view>
					<view class="iconitem" @click="submitForm.tallytype='理财'">
						<view v-if="submitForm.tallytype!='理财'" class="iconsty">
							<span class="t-icon t-icon-tallygushi"></span>
						</view>
						<view v-if="submitForm.tallytype=='理财'" class="iconsty1" style="background-color: #74C783;">
							<span class="t-icon t-icon-tallygushi1"></span>
						</view>
						<view class="icontitle">理财</view>
					</view>
					<view class="iconitem" @click="submitForm.tallytype='红包'">
						<view v-if="submitForm.tallytype!='红包'" class="iconsty">
							<span class="t-icon t-icon-tallyhongbao"></span>
						</view>
						<view v-if="submitForm.tallytype=='红包'" class="iconsty1" style="background-color: #FA623D;">
							<span class="t-icon t-icon-tallyhongbao1"></span>
						</view>
						<view class="icontitle">红包</view>
					</view>
					<view class="iconitem" @click="submitForm.tallytype='兼职'">
						<view v-if="submitForm.tallytype!='兼职'" class="iconsty">
							<span class="t-icon t-icon-tallyjianzhi"></span>
						</view>
						<view v-if="submitForm.tallytype=='兼职'" class="iconsty1" style="background-color: #F3B32B;">
							<span class="t-icon t-icon-tallyjianzhi1"></span>
						</view>
						<view class="icontitle">兼职</view>
					</view>
					<view class="iconitem" @click="submitForm.tallytype='现金'">
						<view v-if="submitForm.tallytype!='现金'" class="iconsty">
							<span class="t-icon t-icon-tallyxianjin"></span>
						</view>
						<view v-if="submitForm.tallytype=='现金'" class="iconsty1" style="background-color: #798EBB;">
							<span class="t-icon t-icon-tallyxianjin1-copy"></span>
						</view>
						<view class="icontitle">现金</view>
					</view>
					<view class="iconitem" @click="submitForm.tallytype='收银'">
						<view v-if="submitForm.tallytype!='收银'" class="iconsty">
							<span class="t-icon t-icon-tallyjieru"></span>
						</view>
						<view v-if="submitForm.tallytype=='收银'" class="iconsty1" style="background-color: #A97FE6;">
							<span class="t-icon t-icon-tallyjieru1"></span>
						</view>
						<view class="icontitle">收银</view>
					</view>
					<view class="iconitem" @click="submitForm.tallytype='其它'">
						<view v-if="submitForm.tallytype!='其它'" class="iconsty">
							<span class="t-icon t-icon-tallyother"></span>
						</view>
						<view v-if="submitForm.tallytype=='其它'" class="iconsty1" style="background-color: #07BD73;">
							<span class="t-icon t-icon-tallyother1"></span>
						</view>
						<view class="icontitle">其它</view>
					</view>
				</view>
				<!-- 支出 -->
				<view class="subcontent" v-if="!income">
					<view class="iconitem" @click="submitForm.tallytype='餐饮'">
						<view v-if="submitForm.tallytype!='餐饮'" class="iconsty">
							<span class="t-icon t-icon-tally1foot"></span>
						</view>
						<view v-if="submitForm.tallytype=='餐饮'" class="iconsty1" style="background-color: #518BF1;">
							<span class="t-icon t-icon-tally1foot1-copy"></span>
						</view>
						<view class="icontitle">餐饮</view>
					</view>
					<view class="iconitem" @click="submitForm.tallytype='娱乐'">
						<view v-if="submitForm.tallytype!='娱乐'" class="iconsty">
							<span class="t-icon t-icon-tally1game"></span>
						</view>
						<view v-if="submitForm.tallytype=='娱乐'" class="iconsty1" style="background-color: #74C783;">
							<span class="t-icon t-icon-tally1game1-copy"></span>
						</view>
						<view class="icontitle">娱乐</view>
					</view>
					<view class="iconitem" @click="submitForm.tallytype='日用'">
						<view v-if="submitForm.tallytype!='日用'" class="iconsty">
							<span class="t-icon t-icon-tally1riyong"></span>
						</view>
						<view v-if="submitForm.tallytype=='日用'" class="iconsty1" style="background-color: #F3B32B;">
							<span class="t-icon t-icon-tally1riyong1-copy"></span>
						</view>
						<view class="icontitle">日用</view>
					</view>
					<view class="iconitem" @click="submitForm.tallytype='住房'">
						<view v-if="submitForm.tallytype!='住房'" class="iconsty">
							<span class="t-icon t-icon-tally1home"></span>
						</view>
						<view v-if="submitForm.tallytype=='住房'" class="iconsty1" style="background-color: #FA623D;">
							<span class="t-icon t-icon-tally1home1-copy"></span>
						</view>
						<view class="icontitle">住房</view>
					</view>
					<view class="iconitem" @click="submitForm.tallytype='旅行'">
						<view v-if="submitForm.tallytype!='旅行'" class="iconsty">
							<span class="t-icon t-icon-tally1lvxing"></span>
						</view>
						<view v-if="submitForm.tallytype=='旅行'" class="iconsty1" style="background-color: #798EBB;">
							<span class="t-icon t-icon-tally1lvxing1-copy"></span>
						</view>
						<view class="icontitle">旅行</view>
					</view>
					<view class="iconitem" @click="submitForm.tallytype='医疗'">
						<view v-if="submitForm.tallytype!='医疗'" class="iconsty">
							<span class="t-icon t-icon-tally1yiliao"></span>
						</view>
						<view v-if="submitForm.tallytype=='医疗'" class="iconsty1" style="background-color: #07BD73;">
							<span class="t-icon t-icon-tally1yiliao1-copy"></span>
						</view>
						<view class="icontitle">医疗</view>
					</view>
					<view class="iconitem" @click="submitForm.tallytype='交通'">
						<view v-if="submitForm.tallytype!='交通'" class="iconsty">
							<span class="t-icon t-icon-tally1car"></span>
						</view>
						<view v-if="submitForm.tallytype=='交通'" class="iconsty1" style="background-color: #518BF1;">
							<span class="t-icon t-icon-tally1car1-copy"></span>
						</view>
						<view class="icontitle">交通</view>
					</view>
				</view>
			</view>
			<view class="threeblock">
				<view class="oneinput">
					<u--input class="remarkinput" placeholder="备注" border="surround" v-model="submitForm.remark">
					</u--input>
				</view>
				<view class="twoinput">
					<u-icon name="calendar" color="#aaa" size="22" @click="showtime=true"></u-icon>
					<view class="twotime" @click="showtime=true">
						{{submitForm.datetime}}
					</view>
					<u-icon name="arrow-down" color="#aaa" size="15" @click="showtime=true"></u-icon>
					<view class="twosubinput">
						<u--input disabled placeholder="0.00" border="surround" v-model="submitForm.num"></u--input>
					</view>
				</view>
				<view class="threeinput">
					<!-- 计算器 -->
					<view class="count">
						<!-- 第一行 -->
						<view class="countline">
							<view class="countcol" @click="btntyp('1')">
								1
							</view>
							<view class="countcol" @click="btntyp('2')">
								2
							</view>
							<view class="countcol" @click="btntyp('3')">
								3
							</view>
							<view class="countcol" style="border-right: none;" @click="btntyp('+')">
								+
							</view>
						</view>
						<!-- 第二行 -->
						<view class="countline">
							<view class="countcol" @click="btntyp('4')">
								4
							</view>
							<view class="countcol" @click="btntyp('5')">
								5
							</view>
							<view class="countcol" @click="btntyp('6')">
								6
							</view>
							<view class="countcol" style="border-right: none;" @click="btntyp('-')">
								-
							</view>
						</view>
						<!-- 第三行 -->
						<view class="countline">
							<view class="countcol" @click="btntyp('7')">
								7
							</view>
							<view class="countcol" @click="btntyp('8')">
								8
							</view>
							<view class="countcol" @click="btntyp('9')">
								9
							</view>
							<view class="countcol" style="border-right: none;" @click="btntyp('=')">
								=
							</view>
						</view>
						<!-- 第四行 -->
						<view class="countline">
							<view class="countcol" @click="btntyp('.')">
								.
							</view>
							<view class="countcol" @click="btntyp('0')">
								0
							</view>
							<view class="countcol" @click="btntyp('back')">
								<u-icon size="30" name="backspace"></u-icon>
							</view>
							<view class="countcol" style="border-right: none;color: #518BF1;" @click="addtally">
								添加
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 消息提示 -->
			<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
			<!-- 日期选择器 -->
			<u-datetime-picker closeOnClickOverlay @close="showtime=false" confirmColor="#518BF1" @confirm="confirmtime"
				@cancel="showtime=false" :show="showtime" v-model="submitForm.datetime" mode="date"></u-datetime-picker>
		</view>
	</view>
</template>

<script>
	import {
		datetimes
	} from './mixins/mixin.js'
	export default {
		mixins: [datetimes],
		props: ["tallydata"],
		name: "subtally",
		data() {
			return {
				// 收入或支出
				income: true,
				// 显示日期选择器
				showtime: false,
				// 是否为收入
				isincome: true,
				// 提交表单
				submitForm: {
					tallytype: '工资',
					datetime: Number(new Date()),
					remark: "",
					num: "",
				},
				// 是否已点击小数点
				isdot: false,
				onenum: "",
				twonum: "",
			};
		},
		created() {
			const timeFormat = uni.$u.timeFormat
			this.submitForm.datetime = timeFormat(this.submitForm.datetime, 'yyyy/mm/dd')
		},
		methods: {
			// 跳转纪念日详情页面
			tallypage() {
				uni.navigateTo({
					url: "../../pages/tally/tally"
				})
			},
			// 确定日期
			confirmtime(e) {
				this.showtime = false
				const timeFormat = uni.$u.timeFormat
				this.$nextTick(() => {
					this.submitForm.datetime = timeFormat(e.value, 'yyyy/mm/dd')
				})
			},
			// 点击收入
			btnin() {
				this.income = !this.income;
				this.submitForm.tallytype = '餐饮';
				this.isincome = false
			},
			// 点击支出
			btnout() {
				this.income = !this.income;
				this.submitForm.tallytype = '工资';
				this.isincome = true
			},
			// 计算器按钮
			btntyp(type) {
				switch (type) {
					case '0':
						this.submitForm.num += '0';
						break;
					case '1':
						this.submitForm.num += '1';
						break;
					case '2':
						this.submitForm.num += '2';
						break;
					case '3':
						this.submitForm.num += '3';
						break;
					case '4':
						this.submitForm.num += '4';
						break;
					case '5':
						this.submitForm.num += '5';
						break;
					case '6':
						this.submitForm.num += '6';
						break;
					case '7':
						this.submitForm.num += '7';
						break;
					case '8':
						this.submitForm.num += '8';
						break;
					case '9':
						this.submitForm.num += '9';
						break;
					case '.':
						if (this.isdot) {
							console.log('禁止点击')
						} else {
							this.submitForm.num += '.';
							this.isdot = true;
						};
						break;
					case '+':
						if (this.onenum == "") {
							this.onenum = this.submitForm.num;
							this.submitForm.num += '+';
						} else {
							if (this.submitForm.num.indexOf("+") >= 0) {
								this.twonum = this.submitForm.num.split('+')[1];
								this.submitForm.num = (this.onenum * 1 + this.twonum * 1).toFixed(2)
								this.onenum = this.submitForm.num
								this.submitForm.num += '+';
							} else if (this.submitForm.num.indexOf("-") >= 0) {
								this.twonum = this.submitForm.num.split('-')[1];
								this.submitForm.num = (this.onenum * 1 - this.twonum * 1).toFixed(2)
								this.onenum = this.submitForm.num
								this.submitForm.num += '+';
							} else {
								this.submitForm.num += '+'
							}
						}
						this.isdot = false;
						break;
					case '-':
						if (this.onenum == "") {
							this.onenum = this.submitForm.num;
							this.submitForm.num += '-';
						} else {
							if (this.submitForm.num.indexOf("-") >= 0) {
								this.twonum = this.submitForm.num.split('-')[1];
								this.submitForm.num = (this.onenum * 1 - this.twonum * 1).toFixed(2)
								this.onenum = this.submitForm.num
								this.submitForm.num += '-';
							} else if (this.submitForm.num.indexOf("+") >= 0) {
								this.twonum = this.submitForm.num.split('+')[1];
								this.submitForm.num = (this.onenum * 1 + this.twonum * 1).toFixed(2)
								this.onenum = this.submitForm.num
								this.submitForm.num += '-';
							} else {
								this.submitForm.num += '-'
							}


						}
						this.isdot = false;
						break;
					case '=':
						if (this.submitForm.num.indexOf('+') >= 0) {
							this.onenum = this.submitForm.num.split('+')[0];
							this.twonum = this.submitForm.num.split('+')[1];
							this.submitForm.num = (this.onenum * 1 + this.twonum * 1).toFixed(2)
							this.onenum = this.submitForm.num
						} else {
							this.onenum = this.submitForm.num.split('-')[0];
							this.twonum = this.submitForm.num.split('-')[1];
							this.submitForm.num = (this.onenum * 1 - this.twonum * 1).toFixed(2)
							this.onenum = this.submitForm.num
						}
						this.isdot = false;
						break;
					case 'back':
						this.submitForm.num = this.submitForm.num.substring(0, this.submitForm.num.length - 1)
						if (this.submitForm.num.indexOf('.') < 0) {
							this.isdot = false
					}
							break;
					default:
						console.log('...')
				}
			},
			// 添加
			async addtally() {
				if (this.submitForm.num == "" || this.submitForm.num == 0.00 || this.submitForm.num.indexOf('+') >=
					0 || this.submitForm.num.indexOf('-') >= 0) {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "请输入正确的数字后再添加",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				} else {
					if (this.isincome == false) {
						this.submitForm.num = this.submitForm.num * (-1)
					} else {
						this.submitForm.num * 1
					}
					const {
						data: res
					} = await this.$http({
						url: "tally/addtally",
						method: "POST",
						data: {
							tallytype: this.submitForm.tallytype,
							remark: this.submitForm.remark,
							num: this.submitForm.num,
							datetime: this.submitForm.datetime
						}
					})
					//console.log(res)
					if (res.code == '200') {
						this.$refs.uToast.show({
							type: 'success',
							duration: 1000,
							message: "已成功添加一条账单记录",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
						this.submitForm.remark = ""
						this.submitForm.num = ""
						this.isdot = false;
					} else {
						this.$refs.uToast.show({
							type: 'error',
							icon: false,
							message: "添加失败，请重试",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
						})
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.tally {
		padding-top: 2rpx;
		margin-top: 40rpx;
		border-radius: 15px;
		width: 680rpx;
		background-color: #ffffff;
		box-shadow: 5px 5px 10px #efeded;
	}

	.iconbg {
		width: 100rpx;
		height: 100rpx;
		border-radius: 10px;
		background-color: #dce8fb;
		display: flex;
		justify-content: center;
		align-items: center;
		float: left;
	}

	.line {
		margin: 20rpx 0;
		height: 90rpx;
		border-right: 1px dashed #aaa;
	}

	.typeicon {
		width: 70rpx;
		height: 70rpx;
	}

	.oneblock {
		display: flex;
		margin: 40rpx;
		align-items: center;
		justify-content: space-between;
	}

	.iconitem {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 16rpx;

		.t-icon {
			width: 50rpx;
			height: 50rpx;
		}
	}

	.tallytitle {
		float: left;
		margin-left: 28rpx;
		flex: 1;
	}

	.onetitle {
		font-size: 15px;
	}

	.twotitle {
		font-size: 12px;
		color: #aaa;
		margin-top: 14rpx;
	}

	.backicon {
		width: 40rpx;
		height: 40rpx;
	}

	.twoblock {
		margin-top: -20rpx;
		display: flex;
		overflow: auto;
		align-items: center;
	}

	.subtitle {
		font-size: 15px;
		color: #505050;
		padding-left: 40rpx;
		width: 140rpx;
		display: flex;
	}

	.iconsty {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 75rpx;
		height: 75rpx;
		border-radius: 50%;
	}

	.iconsty1 {
		background-color: #518BF1;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 75rpx;
		height: 75rpx;
		border-radius: 50%;
	}

	.subcontent {
		font-size: 12px;
		color: #aaa;
		margin-top: 8rpx;
		padding-left: 40rpx;
		width: 500rpx;
		overflow: auto;
		display: flex;
	}

	.oneinput {
		margin: 16rpx 30rpx;
	}

	.twoinput {
		color: #aaa;
		display: flex;
		align-items: center;
		margin: 30rpx 30rpx;
		position: relative;
	}

	.twosubinput {
		width: 300rpx;
		position: absolute;
		right: 0;
	}

	.twotime {
		font-size: 14px;
		padding: 0 10rpx;
	}

	.threeblock ::v-deep .remarkinput {
		padding: 8rpx 20rpx !important;
		border-radius: 12rpx !important;
	}

	.count {
		width: 100%;
		height: 400rpx;
		display: flex;
		flex-direction: column;
	}

	.countline {
		height: 100rpx;
		border-top: 1px solid #dedede;
		display: flex;
	}

	.countcol {
		width: 170rpx;
		border-right: 1px solid #dedede;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		color: #403f3f;
	}

	.countcol:active {
		background-color: #eaeaea;
	}

	::v-deep .u-popup__content {
		border-top-right-radius: 15px !important;
		border-top-left-radius: 15px !important;
	}
</style>
