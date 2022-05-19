<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
				<view style="padding-right: 80rpx;margin: 0 auto;" class="title">
					添加记账
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback">
			<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
		</view>
		<view class="title">
			添加记账
		</view>
		<!-- #endif -->
		<u-subsection style="margin-top: 40rpx;" activeColor="#518BF1" :list="list" mode="subsection" :current="curNow"
			@change="sectionChange"></u-subsection>
		<view class="icontally" v-if="curNow==0">
			<view class="itemicon">
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
			</view>
			<view class="itemicon">
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
				<view class="iconitem" @click="submitForm.tallytype='其它'">
					<view class="iconsty">
						<span></span>
					</view>
					<view class="icontitle"></view>
				</view>
			</view>
		</view>
		<view class="icontally" v-if="curNow==1">
			<view class="itemicon">
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
			</view>
			<view class="itemicon">
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
				<view class="iconitem" @click="submitForm.tallytype='其它'">
					<view class="iconsty">
						<span></span>
					</view>
					<view class="icontitle"></view>
				</view>
			</view>
		</view>
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
			<view class="countline" style="border-bottom: 1px solid #dedede;">
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
		<!-- 消息提示 -->
		<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
		<!-- 日期选择器 -->
		<u-datetime-picker closeOnClickOverlay @close="showtime=false" confirmColor="#518BF1" @confirm="confirmtime"
			@cancel="showtime=false" :show="showtime" v-model="submitForm.datetime" mode="date"></u-datetime-picker>
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
		onShow() {},
		created() {
			const timeFormat = uni.$u.timeFormat
			this.submitForm.datetime = timeFormat(this.submitForm.datetime, 'yyyy/mm/dd')
		},
		data() {
			return {
				// 距离top高度
				topheight: "",
				// 分段器
				list: ['收入', '支出'],
				curNow: 0,
				// 提交表单
				submitForm: {
					tallytype: '工资',
					datetime: Number(new Date()),
					remark: "",
					num: "",
				},
				// 显示日期选择器
				showtime: false,
				// 是否为收入
				isincome: true,
				// 是否已点击小数点
				isdot: false,
				onenum: "",
				twonum: "",
			}
		},
		methods: {
			// 返回
			backmycenter() {
				uni.navigateBack()
			},
			// 分段器选择
			sectionChange(index) {
				this.curNow = index;
				if(index==0) {
					this.submitForm.tallytype='工资'
					this.isincome=true
				}else {
					this.submitForm.tallytype='餐饮'
					this.isincome=false
				}
			},
			// 确定日期
			confirmtime(e) {
				this.showtime = false
				const timeFormat = uni.$u.timeFormat
				this.$nextTick(() => {
					this.submitForm.datetime = timeFormat(e.value, 'yyyy/mm/dd')
				})
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
						if(this.onenum==""){
							this.onenum = this.submitForm.num;
							this.submitForm.num += '+';
						}else {
							if(this.submitForm.num.indexOf("+")>=0){
								this.twonum = this.submitForm.num.split('+')[1];
								this.submitForm.num = (this.onenum*1+this.twonum*1).toFixed(2)
								this.onenum = this.submitForm.num
								this.submitForm.num += '+';
							}else if(this.submitForm.num.indexOf("-")>=0){
								this.twonum = this.submitForm.num.split('-')[1];
								this.submitForm.num = (this.onenum*1-this.twonum*1).toFixed(2)
								this.onenum = this.submitForm.num
								this.submitForm.num += '+';
							}else {this.submitForm.num += '+'}
						}
						this.isdot = false;
						break;
					case '-':
						if(this.onenum==""){
							this.onenum = this.submitForm.num;
							this.submitForm.num += '-';
						}else {
							if(this.submitForm.num.indexOf("-")>=0){
								this.twonum = this.submitForm.num.split('-')[1];
								this.submitForm.num = (this.onenum*1-this.twonum*1).toFixed(2)
								this.onenum = this.submitForm.num
								this.submitForm.num += '-';
							}else if(this.submitForm.num.indexOf("+")>=0){
								this.twonum = this.submitForm.num.split('+')[1];
								this.submitForm.num = (this.onenum*1+this.twonum*1).toFixed(2)
								this.onenum = this.submitForm.num
								this.submitForm.num += '-';
							}else {this.submitForm.num += '-'}
							
							
						}
						this.isdot = false;
						break;
					case '=':
						if(this.submitForm.num.indexOf('+')>=0){
							this.onenum = this.submitForm.num.split('+')[0];
							this.twonum = this.submitForm.num.split('+')[1];
							this.submitForm.num = (this.onenum*1+this.twonum*1).toFixed(2)
							this.onenum = this.submitForm.num
						}else {
								this.onenum = this.submitForm.num.split('-')[0];
								this.twonum = this.submitForm.num.split('-')[1];
								this.submitForm.num = (this.onenum*1-this.twonum*1).toFixed(2)
								this.onenum = this.submitForm.num
							}
						this.isdot = false;
						break;
					case 'back':
							this.submitForm.num = this.submitForm.num.substring(0,this.submitForm.num.length-1)
							if(this.submitForm.num.indexOf('.')<0){this.isdot=false}
							break;
					default:
						console.log('...')
				}
			},
			// 添加
			async addtally() {
				if(this.submitForm.num=="" || this.submitForm.num==0.00 || this.submitForm.num.indexOf('+')>=0 || this.submitForm.num.indexOf('-')>=0){
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "请输入正确的数字后再添加",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}else {
					if(this.isincome==false){
						this.submitForm.num = this.submitForm.num*(-1)
					}else {
						this.submitForm.num*1
					}
					const { data: res } = await this.$http({
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
					if(res.code == '200') {
						this.$refs.uToast.show({
							type: 'success',
							duration: 1000,
							message: "已成功添加一条账单记录",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
						this.submitForm.remark = ""
						this.submitForm.num = ""
						this.isdot = false;
					}else {
						this.$refs.uToast.show({
							type: 'error',
							icon: false,
							message: "添加失败，请重试",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
						})
					}
				}
			}

		},
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

	.iconsty {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 75rpx;
		height: 75rpx;
		border-radius: 50%;
	}

	.iconsty1 {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 75rpx;
		height: 75rpx;
		border-radius: 50%;
	}

	.itemicon {
		margin-top: 30rpx;
		display: flex;
		justify-content: space-around;
	}
	
	.twoinput {
		color: #aaa;
		display: flex;
		align-items: center;
		margin: 30rpx 30rpx;
		position: relative;
	}
	
	.twotime {
		font-size: 14px;
		padding: 0 10rpx;
	}
	
	.twosubinput {
		width: 300rpx;
		position: absolute;
		right: 0;
	}
	
	.icontitle {
		    font-size: 13px;
		    margin-top: 10rpx;
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
		width: 25%;
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
	
	.oneinput {
		margin: 16rpx 30rpx;
	}
	
	.threeblock ::v-deep .remarkinput {
		padding: 8rpx 20rpx !important;
		border-radius: 12rpx !important;
	}
</style>
