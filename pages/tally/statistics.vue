<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="{paddingTop: statusBarHeight}">
			<view :style="{height: titleBarHeight, display: 'flex',alignItems: 'center',paddingLeft: '40rpx'}">
				<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
				<view style="padding-right: 80rpx;margin: 0 auto;" class="title">
					账单统计
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="topback">
			<span @click="backmycenter" class="t-icon t-icon-fanhui2"></span>
		</view>
		<view class="title">
			账单统计
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="listcontent" :style="{height: unalltop,overflow: 'auto'}">
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="listcontent" style="height: calc(100% - 51px);overflow: auto;">
				<!-- #endif -->

				<view class="" style="height: 400px;">
					 <view class="charts-box">
					     <qiun-data-charts :opts="opts" type="column" :chartData="chartData" />
					   </view>
				</view>
				
				<view class="" style="height: 400px;background-color: red;">
					
				</view>
				
				<view class="" style="height: 400px;background-color: white;">
					
				</view>
			</view>
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
			this.gettally()
		},
		onReady() {
		    this.getServerData();
		  },
		data() {
			return {
				// 距离top高度
				topheight: "",
				// 年分类数据
				tallydatayear: [],
				// 指定年份
				tallyyear: "2022",
				// 指定年份的每月数据
				tallydatamonth: [],
				chartData: {},
				// 表配置
				opts: {
					extra: {
						column: {
							barBorderRadius:[5,5,0,0]
						}
					}
				}
			}
		},
		methods: {
			// 返回
			backmycenter() {
				uni.navigateBack()
			},
			async gettally() {
				const { data: res } = await this.$http({
					url: "tally/usertally",
					method: "POST",
				})
				console.log(res)
				if(res.code == "200") {
					// 先按年份筛选数据
					res.data.forEach(item => {
						let index = -1;
						let isExists = this.tallydatayear.some((newItem, j) => {
							if (item.datetime.split('/')[0] == newItem.datetime.split('/')[0]) {
								index = j;
								return true;
							}
						})
						if (!isExists) {
							this.tallydatayear.push({
								datetime: item.datetime.split('/')[0],
								subList: [item],
							})
						} else {
							this.tallydatayear[index].subList.push(item);
						}
					})
					console.log(this.tallydatayear)
					// 筛选指定年份后的每个月的数据
					this.tallydatayear.forEach(item => {
						if(item.datetime == this.tallyyear){
							this.tallydatamonth = item.subList
						}
					})
					console.log(this.tallydatamonth)
					
					
					
					
					
					// // 按日期筛选数据
					// res.data.forEach((item, i) => {
					// 	let index = -1;
					// 	let isExists = this.initArrtally.some((newItem, j) => {
					// 		if (item.datetime == newItem.datetime) {
					// 			index = j;
					// 			return true;
					// 		}
					// 	})
					// 	if (!isExists) {
					// 		this.initArrtally.push({
					// 			datetime: item.datetime,
					// 			subList: [item],
					// 		})
					// 	} else {
					// 		this.initArrtally[index].subList.push(item);
					// 	}
					// })
				}
			},
			// 获取用户所有记账数据
			// async gettally() {
				// 初始化
				// this.outdata=[]
				// this.assetdata=[]
				// this.allassetnum = 0
				// this.alloutnum = 0
				// this.subassetnum = 0
				// const {
				// 	data: res
				// } = await this.$http({
				// 	url: "tally/usertally",
				// 	method: "POST"
				// })
				// //console.log(res)
				// if (res.code == '200') {
				// 	res.data.forEach((item) => {
				// 		if(item.num.indexOf('-')>=0){
				// 			this.alloutnum += (item.num.toString().slice(1))*1
				// 			this.outdata.push(item)
				// 		}else{
				// 			this.allassetnum += item.num*1 
				// 			this.assetdata.push(item)
				// 		}
				// 	})
				// 	this.subassetnum = this.allassetnum - this.alloutnum
				// 	this.allassetnum = this.allassetnum.toString().indexOf(".")>=0 ? this.allassetnum:this.allassetnum+'.00'
				// 	this.alloutnum = this.alloutnum.toString().indexOf(".")>=0 ? this.alloutnum:this.alloutnum+'.00'
				// 	this.subassetnum = this.subassetnum.toString().indexOf(".")>=0 ? this.subassetnum:this.subassetnum+'.00'
				// } else if (res.code == '201') {
				// 	this.outdata=[]
				// 	this.assetdata=[]
				// } else {
				// 	this.$refs.uToast.show({
				// 		type: 'error',
				// 		icon: false,
				// 		message: "记账数据获取失败",
				// 		iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
				// 	})
				// }
			// },
			
			    getServerData() {
			      //模拟从服务器获取数据时的延时
			      setTimeout(() => {
			        let res = {
			            categories: ["2016","2017","2018","2019","2020","2021"],
			            series: [
			              {
			                name: "目标值",
			                data: [35,36,31,33,13,34]
			              },
			              // {
			              //   name: "完成量",
			              //   data: [18,27,21,24,6,28]
			              // }
			            ]
			          };
			        this.chartData = JSON.parse(JSON.stringify(res));
			      }, 500);
			    },
			
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
	
	
	 .charts-box {
	    width: 100%;
	    height: 300px;
	  }
	
</style>
