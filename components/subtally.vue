<template>
	<view>
		<view class="tally">
			<view class="oneblock"  @click="tallypage">
				<view class="iconbg">
					<span class="typeicon t-icon t-icon-qianbao"></span>
				</view>
				<view class="tallytitle">
					<view class="onetitle">
						记账
					</view>
					<view class="twotitle">
						已记账{{tallydata}}天
					</view>
				</view>
				<view class="rightback">
					<span class="backicon t-icon t-icon-xiangyou1"></span>
				</view>
			</view>
			<view class="twoblock">
				<view class="subtitle" v-if="income" @click="income=!income">
					<view class="subonetitle">收入</view>
					<u-icon name="arrow-down-fill"></u-icon>
				</view>
				<view class="subtitle" v-if="!income" @click="income=!income">
					<view class="subonetitle">支出</view>
					<u-icon name="arrow-up-fill"></u-icon>
				</view>
				<view class="line"></view>
				<!-- 收入 -->
				<view class="subcontent" v-if="income">
					<view class="iconitem" @click="selecttype=1">
						<view v-if="selecttype!=1" class="iconsty">
							<span class="t-icon t-icon-tallywaihui"></span>
						</view>
						<view v-if="selecttype==1" class="iconsty1">
							<span class="t-icon t-icon-tallywaihui1"></span>
						</view>
						<view class="icontitle">工资</view>
					</view>
					<view class="iconitem" @click="selecttype=2">
						<view v-if="selecttype!=2" class="iconsty">
							<span class="t-icon t-icon-tallygushi"></span>
						</view>
						<view v-if="selecttype==2" class="iconsty1">
							<span class="t-icon t-icon-tallygushi1"></span>
						</view>
						<view class="icontitle">理财</view>
					</view>
					<view class="iconitem" @click="selecttype=3">
						<view v-if="selecttype!=3" class="iconsty">
							<span class="t-icon t-icon-tallyhongbao"></span>
						</view>
						<view v-if="selecttype==3" class="iconsty1">
							<span class="t-icon t-icon-tallyhongbao1"></span>
						</view>
						<view class="icontitle">红包</view>
					</view>
					<view class="iconitem" @click="selecttype=4">
						<view v-if="selecttype!=4" class="iconsty">
							<span class="t-icon t-icon-tallyjianzhi"></span>
						</view>
						<view v-if="selecttype==4" class="iconsty1">
							<span class="t-icon t-icon-tallyjianzhi1"></span>
						</view>
						<view class="icontitle">兼职</view>
					</view>
					<view class="iconitem" @click="selecttype=5">
						<view v-if="selecttype!=5" class="iconsty">
							<span class="t-icon t-icon-tallyxianjin"></span>
						</view>
						<view v-if="selecttype==5" class="iconsty1">
							<span class="t-icon t-icon-tallyxianjin1"></span>
						</view>
						<view class="icontitle">现金</view>
					</view>
					<view class="iconitem" @click="selecttype=6">
						<view v-if="selecttype!=6" class="iconsty">
							<span class="t-icon t-icon-tallyjieru"></span>
						</view>
						<view v-if="selecttype==6" class="iconsty1">
							<span class="t-icon t-icon-tallyjieru1"></span>
						</view>
						<view class="icontitle">收银</view>
					</view>
					<view class="iconitem" @click="selecttype=7">
						<view v-if="selecttype!=7" class="iconsty">
							<span class="t-icon t-icon-tallyother"></span>
						</view>
						<view v-if="selecttype==7" class="iconsty1">
							<span class="t-icon t-icon-tallyother1"></span>
						</view>
						<view class="icontitle">其它</view>
					</view>
				</view>
				<!-- 支出 -->
				<view class="subcontent" v-if="!income">
					<view class="iconitem" @click="selecttype=8">
						<view v-if="selecttype!=8" class="iconsty">
							<span class="t-icon t-icon-tally1foot"></span>
						</view>
						<view v-if="selecttype==8" class="iconsty1">
							<span class="t-icon t-icon-tally1foot1-copy"></span>
						</view>
						<view class="icontitle">餐饮</view>
					</view>
					<view class="iconitem" @click="selecttype=9">
						<view v-if="selecttype!=9" class="iconsty">
							<span class="t-icon t-icon-tally1game"></span>
						</view>
						<view v-if="selecttype==9" class="iconsty1">
							<span class="t-icon t-icon-tally1game1-copy"></span>
						</view>
						<view class="icontitle">娱乐</view>
					</view>
					<view class="iconitem" @click="selecttype=10">
						<view v-if="selecttype!=10" class="iconsty">
							<span class="t-icon t-icon-tally1riyong"></span>
						</view>
						<view v-if="selecttype==10" class="iconsty1">
							<span class="t-icon t-icon-tally1riyong1-copy"></span>
						</view>
						<view class="icontitle">日用</view>
					</view>
					<view class="iconitem" @click="selecttype=11">
						<view v-if="selecttype!=11" class="iconsty">
							<span class="t-icon t-icon-tally1home"></span>
						</view>
						<view v-if="selecttype==11" class="iconsty1">
							<span class="t-icon t-icon-tally1home1-copy"></span>
						</view>
						<view class="icontitle">住房</view>
					</view>
					<view class="iconitem" @click="selecttype=12">
						<view v-if="selecttype!=12" class="iconsty">
							<span class="t-icon t-icon-tally1lvxing"></span>
						</view>
						<view v-if="selecttype==12" class="iconsty1">
							<span class="t-icon t-icon-tally1lvxing1-copy"></span>
						</view>
						<view class="icontitle">旅行</view>
					</view>
					<view class="iconitem" @click="selecttype=13">
						<view v-if="selecttype!=13" class="iconsty">
							<span class="t-icon t-icon-tally1yiliao"></span>
						</view>
						<view v-if="selecttype==13" class="iconsty1">
							<span class="t-icon t-icon-tally1yiliao1-copy"></span>
						</view>
						<view class="icontitle">医疗</view>
					</view>
					<view class="iconitem" @click="selecttype=14">
						<view v-if="selecttype!=14" class="iconsty">
							<span class="t-icon t-icon-tally1car"></span>
						</view>
						<view v-if="selecttype==14" class="iconsty1">
							<span class="t-icon t-icon-tally1car1-copy"></span>
						</view>
						<view class="icontitle">交通</view>
					</view>
					<view class="iconitem" @click="selecttype=15">
						<view v-if="selecttype!=15" class="iconsty">
							<span class="t-icon t-icon-tallyother"></span>
						</view>
						<view v-if="selecttype==15" class="iconsty1">
							<span class="t-icon t-icon-tallyother1"></span>
						</view>
						<view class="icontitle">其它</view>
					</view>
				</view>
			</view>
			<!-- 消息提示 -->
			<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["tallydata"],
		name: "subtally",
		data() {
			return {
				// 收入或支出
				income: true,
				// 是否选择
				selecttype: 1,
			};
		},
		methods: {
			// 跳转纪念日详情页面
			tallypage() {
				uni.navigateTo({
					url: "../../pages/tally/tally"
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.tally {
		padding-top: 2rpx;
		margin-top: 40rpx;
		border-radius: 15px;
		width: 680rpx;
		height: 300rpx;
		background-color: #ffffff;
		box-shadow: 5px 5px 10px #efeded;
	}

	.iconbg {
		width: 100rpx;
		height: 100rpx;
		border-radius: 10px;
		background-color: #A9C6F7;
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
		font-size: 16px;
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

</style>
