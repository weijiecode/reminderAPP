<template>
	<view class="content">
		<view class="navigate">
			<text v-if="showclass == 0" class="lefttitle">待办总览</text>
			<text v-if="showclass == 1" class="lefttitle">今日待办</text>
			<span @click="showclass == 0 ? showclass=1 : showclass=0" class="btnshow t-icon t-icon-qiehuan3"></span>
			<text class="rightdatetime">{{todaydatem}}</text>
		</view>
		<view class="colorbg">
		</view>
		<view class="datetime">
			<view class="datebox">
				<view :class="{column:true,iscolumn: week[0] == today}">
					<text>一</text>
					<text>{{week[0]}}</text>
				</view>
				<view :class="{column:true,iscolumn: week[1] == today}">
					<text>二</text>
					<text>{{week[1]}}</text>
				</view>
				<view :class="{column:true,iscolumn: week[2] == today}">
					<text>三</text>
					<text>{{week[2]}}</text>
				</view>
				<view :class="{column:true,iscolumn: week[3] == today}">
					<text>四</text>
					<text>{{week[3]}}</text>
				</view>
				<view :class="{column:true,iscolumn: week[4] == today}">
					<text>五</text>
					<text>{{week[4]}}</text>
				</view>
				<view :class="{column:true,iscolumn: week[5] == today}">
					<text>六</text>
					<text>{{week[5]}}</text>
				</view>
				<view :class="{column:true,iscolumn: week[6] == today}">
					<text>日</text>
					<text>{{week[6]}}</text>
				</view>
			</view>
			<view class="jinbox">
				<text :class="{jin:true,isjin: week[0] == today}">今</text>
				<text :class="{jin:true,isjin: week[1] == today}">今</text>
				<text :class="{jin:true,isjin: week[2] == today}">今</text>
				<text :class="{jin:true,isjin: week[3] == today}">今</text>
				<text :class="{jin:true,isjin: week[4] == today}">今</text>
				<text :class="{jin:true,isjin: week[5] == today}">今</text>
				<text :class="{jin:true,isjin: week[6] == today}">今</text>
			</view>
		</view>
		<!-- 所有待办总览 -->
		<view v-if="showclass == 0" class="listbox">
			<view class="linebox">
				<view class="box">
					<p class="classname">生活</p>
					<p class="nums">共{{colorclass.a}}条清单</p>
					<view class="t-icon t-icon-yuandian"></view>
					<view class="itemlist">
						<view class="listone">
							已完成 {{colorclass.adone}}
						</view>
						<view class="listtwo">
							未完成 {{colorclass.a-colorclass.adone}}
						</view>
					</view>
				</view>
				<view class="box">
					<p class="classname">工作</p>
					<p class="nums">共{{colorclass.b}}条清单</p>
					<view class="t-icon t-icon-yuandian-copy-copy"></view>
					<view class="itemlist">
						<view class="listone">
							已完成 {{colorclass.bdone}}
						</view>
						<view class="listtwo">
							未完成 {{colorclass.b-colorclass.bdone}}
						</view>
					</view>
				</view>
			</view>
			<view class="linebox">
				<view class="box">
					<p class="classname">学习</p>
					<p class="nums">共{{colorclass.c}}条清单</p>
					<view class="t-icon t-icon-yuandian-copy-copy-copy"></view>
					<view class="itemlist">
						<view class="listone">
							已完成 {{colorclass.cdone}}
						</view>
						<view class="listtwo">
							未完成 {{colorclass.c-colorclass.cdone}}
						</view>
					</view>
				</view>
				<view class="box">
					<p class="classname">健康</p>
					<p class="nums">共{{colorclass.d}}条清单</p>
					<view class="t-icon t-icon-yuandian-copy"></view>
					<view class="itemlist">
						<view class="listone">
							已完成 {{colorclass.ddone}}
						</view>
						<view class="listtwo">
							未完成 {{colorclass.d-colorclass.ddone}}
						</view>
					</view>
				</view>
			</view>
			<view class="linebox" style="margin-bottom: 20rpx;">
				<view class="box">
					<p class="classname">社交</p>
					<p class="nums">共{{colorclass.e}}条清单</p>
					<view class="t-icon t-icon-yuandian-copy-copy1"></view>
					<view class="itemlist">
						<view class="listone">
							已完成 {{colorclass.edone}}
						</view>
						<view class="listtwo">
							未完成 {{colorclass.e-colorclass.edone}}
						</view>
					</view>
				</view>
				<view class="box">
					<p class="classname">其它</p>
					<p class="nums">共{{colorclass.f}}条清单</p>
					<view class="t-icon t-icon-yuandian-copy1"></view>
					<view class="itemlist">
						<view class="listone">
							已完成 {{colorclass.fdone}}
						</view>
						<view class="listtwo">
							未完成 {{colorclass.f-colorclass.fdone}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 今日待办 -->
		<view v-if="showclass == 1" class="listbox">
			<view class="linebox">
				<view @click="backlogitem()" class="box">
					<p class="classname">生活</p>
					<view v-if="aback!=''" class="contentbox">
						<p class="nums" v-for="(item,index) in aback" :key="index">{{item.contents}}</p>
					</view>
					<u-empty v-if="aback==''" text="" iconSize="10"
						icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
					<view class="t-icon t-icon-yuandian"></view>
				</view>
				<view @click="backlogitem()" class="box">
					<p class="classname">工作</p>
					<view v-if="bback!=''" class="contentbox">
						<p class="nums" v-for="(item,index) in bback" :key="index">{{item.contents}}</p>
					</view>
					<u-empty v-if="bback==''" text="" iconSize="10"
						icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
					<view class="t-icon t-icon-yuandian-copy-copy"></view>
				</view>
			</view>
			<view class="linebox">
				<view @click="backlogitem()" class="box">
					<p class="classname">学习</p>
					<view v-if="cback!=''" class="contentbox">
						<p class="nums" v-for="(item,index) in cback" :key="index">{{item.contents}}</p>
					</view>
					<u-empty v-if="cback==''" text="" iconSize="10"
						icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
					<view class="t-icon t-icon-yuandian-copy-copy-copy"></view>
				</view>
				<view class="box">
					<p class="classname">健康</p>
					<view v-if="dback!=''" class="contentbox">
						<p class="nums" v-for="(item,index) in dback" :key="index">{{item.contents}}</p>
					</view>
					<u-empty v-if="dback==''" text="" iconSize="10"
						icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
					<view class="t-icon t-icon-yuandian-copy"></view>
				</view>
			</view>
			<view class="linebox" style="margin-bottom: 20rpx;">
				<view class="box">
					<p class="classname">社交</p>
					<view v-if="eback!=''" class="contentbox">
						<p class="nums" v-for="(item,index) in eback" :key="index">{{item.contents}}</p>
					</view>
					<u-empty v-if="eback==''" text="" iconSize="10"
						icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
					<view class="t-icon t-icon-yuandian-copy-copy1"></view>
				</view>
				<view class="box">
					<p class="classname">其它</p>
					<view v-if="fback!=''" class="contentbox">
						<p class="nums" v-for="(item,index) in fback" :key="index">{{item.contents}}</p>
					</view>
					<u-empty v-if="fback==''" text="" iconSize="10"
						icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
					<view class="t-icon t-icon-yuandian-copy1"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		datetimes
	} from "../../components/mixins/mixin.js"
	export default {
		mixins: [datetimes],
		created() {},
		data() {
			return {
				// 各分类统计
				colorclass: {
					a: 0,
					b: 0,
					c: 0,
					d: 0,
					e: 0,
					f: 0,
					adone: 0,
					bdone: 0,
					cdone: 0,
					ddone: 0,
					edone: 0,
					fdone: 0,
				},
				// 切换视图
				showclass: 0,
				// 当天所有待办事项
				backlogdata: {},
				// 当天各个分类的待办事项
				aback: {},
				bback: {},
				cback: {},
				dback: {},
				eback: {},
				fback: {}
			}
		},
		onShow() {
			this.getbacklog()
		},
		methods: {
			async getbacklog() {
				const result = await this.$http({
					url: "backlog/selectbacklog",
					method: "GET"
				})
				this.backlogdata = result.data.data
				console.log(this.backlogdata)
				if (result.data.code == 200) {
					// 初始化
					this.colorclass.a = 0
					this.colorclass.b = 0
					this.colorclass.c = 0
					this.colorclass.d = 0
					this.colorclass.e = 0
					this.colorclass.f = 0
					this.colorclass.adone = 0
					this.colorclass.bdone = 0
					this.colorclass.cdone = 0
					this.colorclass.ddone = 0
					this.colorclass.edone = 0
					this.colorclass.fdone = 0
					result.data.data.forEach((item, index) => {
						if (item.colorbg == '#5da7f1') {
							if (item.done == 1) this.colorclass.adone++;
							this.colorclass.a++
						} else if (item.colorbg == '#d81e06') {
							if (item.done == 1) this.colorclass.bdone++;
							this.colorclass.b++
						} else if (item.colorbg == '#82529d') {
							if (item.done == 1) this.colorclass.cdone++;
							this.colorclass.c++
						} else if (item.colorbg == '#f36372') {
							if (item.done == 1) this.colorclass.ddone++;
							this.colorclass.d++
						} else if (item.colorbg == '#2aa515') {
							if (item.done == 1) this.colorclass.edone++;
							this.colorclass.e++
						} else if (item.colorbg == '#e0620d') {
							if (item.colorbg == '#e0620d' && item.done == 1) this.colorclass.fdone++;
							this.colorclass.f++
						}
					})
					// 当天所有待办事项
					this.backlogdata = result.data.data.filter((item) => {
						return item.datetime.split(" ").shift() == this.todaydate
					})
					// 当天各个分类的待办事项
					this.aback = this.backlogdata.filter((item) => {
						return item.colorbg == '#5da7f1'
					})
					this.bback = this.backlogdata.filter((item) => {
						return item.colorbg == '#d81e06'
					})
					this.cback = this.backlogdata.filter((item) => {
						return item.colorbg == '#82529d'
					})
					this.dback = this.backlogdata.filter((item) => {
						return item.colorbg == '#f36372'
					})
					this.eback = this.backlogdata.filter((item) => {
						return item.colorbg == '#2aa515'
					})
					this.fback = this.backlogdata.filter((item) => {
						return item.colorbg == '#e0620d'
					})
					console.log(this.aback)
				}
			},
			backlogitem(e) {
				uni.navigateTo({
					url:"./backlog"
				})
				//console.log(e)
			}
		},

	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: auto;
	}

	.navigate {
		width: 100%;
		height: 165px;
		background-color: #ffffff;
		background-image: linear-gradient(62deg, #ffffff 9%, #8EC5FC 49%, #E0C3FC 63%);
	}

	.colorbg {
		pointer-events: none; // 遮罩层下面的按钮才能点击
		width: 100%;
		height: 200rpx;
		background-color: #FFFFFF;
		position: absolute;
		top: 0;
		filter: blur(100px);
		z-index: 1;
	}

	.datetime {
		width: 100%;
		height: 100px;
		position: absolute;
		top: 60px;
	}

	.lefttitle {
		margin-top: 60rpx;
		float: left;
		margin-left: 60rpx;
		font-size: 23px;
		font-weight: bold;
	}

	.rightdatetime {
		margin-top: 62rpx;
		float: right;
		margin-right: 60rpx;
		font-weight: bold;
		line-height: 35px;
		font-size: 18px;
	}

	.datebox {
		margin-top: 10px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.column {
		width: 35px;
		height: 65px;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: inherit;
		align-items: center;
	}

	.iscolumn {
		background-color: #7364e3;
		color: #FFFFFF;
	}

	.jinbox {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.jin {
		background-color: #7364e3;
		border-radius: 100%;
		margin-top: 3px;
		color: #FFFFFF;
		font-size: 12px;
		border: 3px solid #7364e3;
		opacity: 0;
	}

	.isjin {
		opacity: 1;
	}

	.listbox {
		display: flex;
		flex-direction: column;
	}

	.linebox {
		margin-top: 20px;
		width: 100%;
		height: 340rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.box {
		width: 330rpx;
		height: 340rpx;
		background-color: #ffffff;
		border-radius: 20px;
		position: relative;
		box-shadow: 5px 5px 10px #efeded,
			-5px -5px 10px #f6f6f6;

		.t-icon {
			position: absolute;
			width: 20px;
			height: 20px;
			right: 40rpx;
			top: 40rpx;
		}
	}

	.classname {
		color: #383636;
		font-size: 28px;
		margin: 40rpx 0 20rpx 40rpx;
		font-weight: bold;
	}

	.contentbox {
		margin-right: 40rpx;
		height: 190rpx;
		overflow: auto;
	}

	.nums {
		font-size: 14px;
		color: #7c7c7c;
		margin-left: 40rpx;
	}

	.itemlist {
		margin-top: 80rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.listone {
		font-size: 12px;
		height: 40rpx;
		width: 120rpx;
		background-color: #E8F7F3;
		color: #4ECA9D;
		text-align: center;
		line-height: 20px;
		border-radius: 12px;
	}

	.listtwo {
		font-size: 12px;
		height: 40rpx;
		width: 120rpx;
		background-color: #FFF1F3;
		color: #FE8C9F;
		text-align: center;
		line-height: 20px;
		border-radius: 12px;
	}

	.btnshow {
		margin-top: 70rpx;
		width: 48rpx;
		height: 48rpx;
		margin-left: 30rpx;
	}
	
	::v-deep .u-empty {
		margin-top: -80rpx !important;
		span {
			opacity: 0 !important;
		}
	}
	
	::v-deep .u-empty__text {
		display: none !important;
	}
</style>
