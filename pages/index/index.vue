<template>
	<view class="content">
		<view class="topcontent">
			<!-- #ifdef MP-WEIXIN -->
			<view class="leftmenu">
				<text v-if="showclass == 0" class="lefttitle"
					:style="{marginTop: statusBarHeight,lineHeight:titleBarHeight}">待办总览</text>
				<text v-if="showclass == 1" class="lefttitle"
					:style="{marginTop: statusBarHeight,lineHeight:titleBarHeight}">今日待办</text>
				<span @click="showclass == 0 ? showclass=1 : showclass=0" class="btnshow t-icon t-icon-qiehuan3"
					:style="{marginTop: statusBarHeight,lineHeight:titleBarHeight}"></span>
			</view>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<text v-if="showclass == 0" class="lefttitle">待办总览</text>
			<text v-if="showclass == 1" class="lefttitle">今日待办</text>
			<span @click="showclass == 0 ? showclass=1 : showclass=0" class="btnshow t-icon t-icon-qiehuan3"></span>
			<text class="rightdatetime">{{todaydatem}}</text>
			<!-- #endif -->
			<!-- <view class="colorbg">
			</view> -->
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
		</view>
		<!-- 消息提示 -->
		<u-toast style="z-index: 999 !important;" ref="uToast"></u-toast>
		<!-- 新建按钮 -->
		<view @click="shownewbacklog=true" id="addbacklog" class="t-icon t-icon-add"></view>
		<!-- 新建待办 -->
		<view class="newbacklog">
			<u-popup :show="shownewbacklog" :round="10" mode="bottom" @close="shownewbacklog=false">
				<view style="height: 360rpx;">
					<u--input v-model="backlogForm.contents" placeholder="把事情记录下来~" border="bottom" maxlength="30"
						clearable :focus="true"></u--input>
					<view class="allbtns">
						<!-- 日历按钮 -->
						<view @click="showcalendar=true" class="iconbtn t-icon t-icon-riqi"></view>
						<!-- 日历显示器 -->
						<u-calendar closeOnClickOverlay monthNum="10" :show="showcalendar" @confirm="confirmdate"
							@close="showcalendar=false">
						</u-calendar>
						<!-- 时间按钮 -->
						<view @click="showdatetime=true" class="iconbtn t-icon t-icon-shijian"></view>
						<!-- 时间显示器 -->
						<u-datetime-picker :show="showdatetime" mode="time" closeOnClickOverlay
							@confirm="confirmdatetime" @cancel="showdatetime=false" @close="showdatetime=false">
						</u-datetime-picker>
						<!-- 类别按钮 -->
						<view style="float: none;" @click="showtypepicker=true" class="iconbtn t-icon t-icon-leibie">
						</view>
						<!-- 类别选择器 -->
						<u-picker closeOnClickOverlay showLunar @confirm="confirmtype" :show="showtypepicker"
							:columns="columns" keyName="name" @cancel="showtypepicker=false"
							@close="showtypepicker=false"></u-picker>
					</view>
					<view class="choosedata">
						<u-tag :show="tagshow1" @close="tagclose1" color="#4f4f4f" borderColor="#7766E7"
							:text="datebacklog" type="success" plain size="large" closable></u-tag>
						<u-tag :show="tagshow2" @close="tagclose2" color="#4f4f4f" borderColor="#7766E7"
							:text="timebacklog" type="success" plain size="large" closable></u-tag>
						<u-tag :show="tagshow3" @close="tagclose3" color="#4f4f4f" borderColor="#7766E7"
							:text="backlogForm.name" type="success" plain size="large" closable></u-tag>
					</view>
					<view class="bottomadd">
						<view @click="addbacklog" class="addbtn t-icon t-icon-tianjia2"></view>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 所有待办总览 -->
		<view v-if="showclass == 0" class="listbox" :style="{overflow:'auto',height:topheight}">
			<view class="linebox">
				<view @click="allbacklogitem('生活')" class="box">
					<p class="classname">生活</p>
					<p class="nums">共{{colorclass.a}}条清单</p>
					<view class="t-icon t-icon-life"></view>
					<view class="itemlist">
						<view class="listone">
							已完成 {{colorclass.adone}}
						</view>
						<view class="listtwo">
							未完成 {{colorclass.a-colorclass.adone}}
						</view>
					</view>
				</view>
				<view @click="allbacklogitem('工作')" class="box">
					<p class="classname">工作</p>
					<p class="nums">共{{colorclass.b}}条清单</p>
					<view class="t-icon t-icon-work"></view>
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
				<view @click="allbacklogitem('学习')" class="box">
					<p class="classname">学习</p>
					<p class="nums">共{{colorclass.c}}条清单</p>
					<view class="t-icon t-icon-study"></view>
					<view class="itemlist">
						<view class="listone">
							已完成 {{colorclass.cdone}}
						</view>
						<view class="listtwo">
							未完成 {{colorclass.c-colorclass.cdone}}
						</view>
					</view>
				</view>
				<view @click="allbacklogitem('健康')" class="box">
					<p class="classname">健康</p>
					<p class="nums">共{{colorclass.d}}条清单</p>
					<view class="t-icon t-icon-health"></view>
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
				<view @click="allbacklogitem('社交')" class="box">
					<p class="classname">社交</p>
					<p class="nums">共{{colorclass.e}}条清单</p>
					<view class="t-icon t-icon-social"></view>
					<view class="itemlist">
						<view class="listone">
							已完成 {{colorclass.edone}}
						</view>
						<view class="listtwo">
							未完成 {{colorclass.e-colorclass.edone}}
						</view>
					</view>
				</view>
				<view @click="allbacklogitem('其它')" class="box">
					<p class="classname">其它</p>
					<p class="nums">共{{colorclass.f}}条清单</p>
					<view class="t-icon t-icon-other"></view>
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
		<view v-if="showclass == 1" class="listbox" :style="{overflow:'auto',height:topheight}">
			<view class="linebox">
				<view @click="backlogitem('生活')" class="box">
					<p class="classname">生活</p>
					<view v-if="todayaback!=''" class="alllist">
						<view class="contentbox" v-for="(item,index) in todayaback" :key="index">
							<view style="background-color: #7766E7;" class="flage"></view>
							<view class="subnums">{{item.contents}}</view>
						</view>
					</view>
					<u-empty v-if="todayaback==''" text="今日暂无待办" iconSize="10"
						icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
				</view>
				<view @click="backlogitem('工作')" class="box">
					<p class="classname">工作</p>
					<view v-if="todaybback!=''" class="alllist">
						<view class="contentbox" v-for="(item,index) in todaybback" :key="index">
							<view style="background-color: #518BF1;" class="flage"></view>
							<view class="subnums">{{item.contents}}</view>
						</view>
					</view>
					<u-empty v-if="todaybback==''" text="今日暂无待办" iconSize="10"
						icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
				</view>
			</view>
			<view class="linebox">
				<view @click="backlogitem('学习')" class="box">
					<p class="classname">学习</p>
					<view v-if="todaycback!=''" class="alllist">
						<view class="contentbox" v-for="(item,index) in todaycback" :key="index">
							<view style="background-color: #FFCD00;" class="flage"></view>
							<view class="subnums">{{item.contents}}</view>
						</view>
					</view>
					<u-empty v-if="todaycback==''" text="今日暂无待办" iconSize="10"
						icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
				</view>
				<view class="box" @click="backlogitem('健康')">
					<p class="classname">健康</p>
					<view v-if="todaydback!=''" class="alllist">
						<view class="contentbox" v-for="(item,index) in todaydback" :key="index">
							<view style="background-color: #1DBD84;" class="flage"></view>
							<view class="subnums">{{item.contents}}</view>
						</view>
					</view>
					<u-empty v-if="todaydback==''" text="今日暂无待办" iconSize="10"
						icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
				</view>
			</view>
			<view class="linebox" style="margin-bottom: 20rpx;">
				<view class="box" @click="backlogitem('社交')">
					<p class="classname">社交</p>
					<view v-if="todayeback!=''" class="alllist">
						<view class="contentbox" v-for="(item,index) in todayeback" :key="index">
							<view style="background-color: #FE738A;" class="flage"></view>
							<view class="subnums">{{item.contents}}</view>
						</view>
					</view>
					<u-empty v-if="todayeback==''" text="今日暂无待办" iconSize="10"
						icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
				</view>
				<view class="box" @click="backlogitem('其它')">
					<p class="classname">其它</p>
					<view v-if="todayfback!=''" class="alllist">
						<view class="contentbox" v-for="(item,index) in todayfback" :key="index">
							<view style="background-color: #C4C4C4;" class="flage"></view>
							<view class="subnums">{{item.contents}}</view>
						</view>
					</view>
					<u-empty v-if="todayfback==''" text="今日暂无待办" iconSize="10"
						icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		datetimes
	} from "../../components/mixins/mixin.js"
	// #ifdef MP-WEIXIN
	import {
		getstatusBarHeight
	} from '../../components/mixins/mixin.js'
	// #endif
	export default {
		// #ifndef MP-WEIXIN
		mixins: [datetimes],
		// #endif
		// #ifdef MP-WEIXIN
		mixins: [getstatusBarHeight, datetimes],
		// #endif
		created() {},
		onLoad() {},
		onReady() {
			uni.createSelectorQuery().in(this).select(".listbox").boundingClientRect((data) => {
					this.topheight = "calc(100% - " + data.top + "px)";
				})
				.exec();

		},
		data() {
			return {
				// 可使用窗口宽度
				wWidth: "",
				// 可使用窗口高度
				wHeight: "",
				// 距离top高度
				topheight: "",
				// 新建待办清单
				shownewbacklog: false,
				// 日历显示
				showcalendar: false,
				// 时间显示
				showdatetime: false,
				// 分类选择显示
				showtypepicker: false,
				// 类别
				columns: [
					[{
						name: "生活",
						names: {
							cvalue: "#icon-life",
							cbg: "#7766E7",
							cname: "生活"
						},
						classvalue: "#icon-life"
					}, {
						name: "工作",
						names: {
							cvalue: "#icon-work",
							cbg: "#518BF1",
							cname: "工作"
						},
						classvalue: "#icon-work"
					}, {
						name: "学习",
						names: {
							cvalue: "#icon-study",
							cbg: "#FFCD00",
							cname: "学习"
						},
						classvalue: "#icon-study"
					}, {
						name: "健康",
						names: {
							cvalue: "#icon-health",
							cbg: "#1DBD84",
							cname: "健康"
						},
						classvalue: "#icon-health"
					}, {
						name: "社交",
						names: {
							cvalue: "#icon-social",
							cbg: "#FE738A",
							cname: "社交"
						},
						classvalue: "#icon-social"
					}, {
						name: "其它",
						names: {
							cvalue: "#icon-other",
							cbg: "#C4C4C4",
							cname: "其它"
						},
						classvalue: "#icon-other"
					}]
				],
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
				// 所有分类待办事项
				allbacklogdata: [],
				// 当天分类待办事项
				todaybacklogdata: [],
				// 当天所有分类待办事项
				todaybacklogdata: [],
				// 新建待办事项表单
				backlogForm: {
					contents: "",
					datetime: "",
					// 颜色分类 提交颜色类别的id
					classvalue: "",
					name: "",
					colorbg: "",
				},
				// 临时日期（待拼接）
				datebacklog: "",
				// 临时时间（待拼接）
				timebacklog: "",
				// tag三个标签
				tagshow1: false,
				tagshow2: false,
				tagshow3: false,
				// storage所有分类待办事项
				allbacklogstorage: {
					alla: [],
					allb: [],
					allc: [],
					alld: [],
					alle: [],
					allf: [],
				},
				// storage当天所有分类待办事项
				todaybacklogstorage: {
					todaya: [],
					todayb: [],
					todayc: [],
					todayd: [],
					todaye: [],
					todayf: [],
				},
				// 所有各个分类的待办事项
				allaback: [],
				allbback: [],
				allcback: [],
				alldback: [],
				alleback: [],
				allfback: [],
				// 当天各个分类的待办事项
				todayaback: [],
				todaybback: [],
				todaycback: [],
				todaydback: [],
				todayeback: [],
				todayfback: []
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
				// this.allbacklogdata = result.data.data
				//console.log(this.allbacklogdata)
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
						if (item.colorbg == '#7766E7') {
							if (item.done == 1) this.colorclass.adone++;
							this.colorclass.a++
						} else if (item.colorbg == '#518BF1') {
							if (item.done == 1) this.colorclass.bdone++;
							this.colorclass.b++
						} else if (item.colorbg == '#FFCD00') {
							if (item.done == 1) this.colorclass.cdone++;
							this.colorclass.c++
						} else if (item.colorbg == '#1DBD84') {
							if (item.done == 1) this.colorclass.ddone++;
							this.colorclass.d++
						} else if (item.colorbg == '#FE738A') {
							if (item.done == 1) this.colorclass.edone++;
							this.colorclass.e++
						} else if (item.colorbg == '#C4C4C4') {
							if (item.colorbg == '#C4C4C4' && item.done == 1) this.colorclass.fdone++;
							this.colorclass.f++
						}
					})
					// 所有待办事项
					this.allbacklogdata = result.data.data
					// 当天所有待办事项
					this.todaybacklogdata = result.data.data.filter((item) => {
						return item.datetime.split(" ").shift() == this.todaydate
					})
					// uni.setStorageSync('todayBacklog', this.allbacklogdata)
					// uni.setStorageSync('allBacklog', result.data.data)
					// 所有各个分类的待办事项
					this.allaback = this.allbacklogdata.filter((item) => {
						return item.colorbg == '#7766E7'
					})
					this.allbback = this.allbacklogdata.filter((item) => {
						return item.colorbg == '#518BF1'
					})
					this.allcback = this.allbacklogdata.filter((item) => {
						return item.colorbg == '#FFCD00'
					})
					this.alldback = this.allbacklogdata.filter((item) => {
						return item.colorbg == '#1DBD84'
					})
					this.alleback = this.allbacklogdata.filter((item) => {
						return item.colorbg == '#FE738A'
					})
					this.allfback = this.allbacklogdata.filter((item) => {
						return item.colorbg == '#C4C4C4'
					})
					this.allbacklogstorage = {
						alla: this.allaback,
						allb: this.allbback,
						allc: this.allcback,
						alld: this.alldback,
						alle: this.alleback,
						allf: this.allfback
					}
					uni.setStorageSync('allbacklogstorage', JSON.stringify(this.allbacklogstorage))
					// 当天各个分类的待办事项
					this.todayaback = this.todaybacklogdata.filter((item) => {
						return item.colorbg == '#7766E7'
					})
					this.todaybback = this.todaybacklogdata.filter((item) => {
						return item.colorbg == '#518BF1'
					})
					this.todaycback = this.todaybacklogdata.filter((item) => {
						return item.colorbg == '#FFCD00'
					})
					this.todaydback = this.todaybacklogdata.filter((item) => {
						return item.colorbg == '#1DBD84'
					})
					this.todayeback = this.todaybacklogdata.filter((item) => {
						return item.colorbg == '#FE738A'
					})
					this.todayfback = this.todaybacklogdata.filter((item) => {
						return item.colorbg == '#C4C4C4'
					})
					this.todaybacklogdata = {
						todaya: this.todayaback,
						todayb: this.todaybback,
						todayc: this.todaycback,
						todayd: this.todaydback,
						todaye: this.todayeback,
						todayf: this.todayfback
					}
					uni.setStorageSync('todaybacklogstorage', JSON.stringify(this.todaybacklogdata))
				}
			},
			backlogitem(t) {
				uni.navigateTo({
					url: "../backlog/backlog?type=" + t
				})
			},
			allbacklogitem(t) {
				uni.navigateTo({
					url: "../backlog/allbacklog?type=" + t
				})
			},
			// 日期确定
			confirmdate(e) {
				this.showcalendar = false
				this.datebacklog = e[0]
				this.tagshow1 = true
				console.log(this.datebacklog)
			},
			// 时间确定
			confirmdatetime(e) {
				this.showdatetime = false
				this.timebacklog = e.value
				this.tagshow2 = true
				console.log(this.timebacklog)
			},
			// 类别确定
			confirmtype(e) {
				console.log(e)
				this.showtypepicker = false
				this.backlogForm.classvalue = e.value[0].names.cvalue
				this.backlogForm.colorbg = e.value[0].names.cbg
				this.backlogForm.name = e.value[0].name
				this.tagshow3 = true
			},
			// 三个tag的关闭
			tagclose1() {
				this.tagshow1 = false
				this.datebacklog = ""
			},
			tagclose2() {
				this.tagshow2 = false
				this.timebacklog = ""
			},
			tagclose3() {
				this.tagshow3 = false
				this.backlogForm.name = ""
			},
			// 提交待办事项
			async addbacklog() {
				if (this.backlogForm.contents == "") {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						message: "请填写待办内容后再添加待办",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				} else {
					if (this.datebacklog == "" || this.backlogForm.name == "") {
						this.$refs.uToast.show({
							type: 'error',
							icon: false,
							message: "请选择日期或分类",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
						})
					} else {
						// 拼接日期时间
						this.backlogForm.datetime = this.datebacklog + " " + this.timebacklog
						// console.log(this.backlogForm.contents)
						// console.log(this.backlogForm.datetime)
						// console.log(this.backlogForm.classvalue)
						// console.log(this.backlogForm.colorbg)
						const {
							data: res
						} = await this.$http({
							url: "backlog/insertbacklog",
							method: "POST",
							data: {
								contents: this.backlogForm.contents,
								datetime: this.backlogForm.datetime,
								classvalue: this.backlogForm.classvalue,
								colorbg: this.backlogForm.colorbg,
							}
						})
						if (res.code == 200) {
							// 更新数据
							this.getbacklog()
							// 初始化
							this.backlogForm.contents = ""
							this.backlogForm.datetime = ""
							this.backlogForm.classvalue = ""
							this.backlogForm.name = ""
							this.backlogForm.colorbg = ""
							this.datebacklog = ""
							this.timebacklog = ""
							this.shownewbacklog = false
							this.$refs.uToast.show({
								type: 'success',
								duration: 1000,
								message: "添加成功",
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
							})
						}
					}
				}

			},

		},

	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}

	.leftmenu {
		display: flex;
		align-items: center;
	}

	#addbacklog {
		width: 120rpx;
		height: 120rpx;
		z-index: 99;
		position: fixed;
		bottom: 140rpx;
		right: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.addbtn {
		width: 100rpx;
		height: 100rpx;
	}

	.flage {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
	}

	.topcontent {
		opacity: 0.9;
		width: 100%;
		// height: 350rpx;
		background-color: #ffffff;
		background-image: linear-gradient(62deg, #ffffff 9%, #8EC5FC 49%, #E0C3FC 63%);
	}

	// .colorbg {
	// 	pointer-events: none; // 遮罩层下面的按钮才能点击
	// 	width: 100%;
	// 	height: 200rpx;
	// 	background-color: #FFFFFF;
	// 	position: absolute;
	// 	top: 0;
	// 	filter: blur(100px);
	// 	z-index: 1;
	// }

	.datetime {
		width: 100%;
		// height: 200rpx;
		// position: absolute;
		// top: 120rpx;
	}

	.lefttitle {
		display: block;
		margin-top: 60rpx;
		float: left;
		margin-left: 60rpx;
		font-size: 23px;
		font-weight: bold;
	}

	::v-deep .u-popup__content {
		padding: 30rpx;
	}

	.iconbtn {
		width: 40rpx;
		height: 40rpx;
		float: left;
		margin-right: 60rpx;
	}

	.choosedata {
		display: flex;
		margin-top: 20rpx;
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

	.bottomadd {
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
	}


	.iscolumn {
		background-color: #7364e3;
		color: #FFFFFF;
	}

	.jinbox {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		padding-bottom: 10rpx;
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
			width: 60rpx;
			height: 60rpx;
			right: 40rpx;
			top: 40rpx;
		}
	}

	.alllist {
		height: 200rpx;
		overflow: auto;
	}

	.classname {
		color: #383636;
		font-size: 28px;
		margin: 40rpx 0 20rpx 40rpx;
		font-weight: bold;
	}

	.contentbox {
		margin-left: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow: auto;
	}

	.nums {
		font-size: 14px;
		color: #7c7c7c;
		margin-left: 40rpx;
		width: 200rpx;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.subnums {
		font-size: 14px;
		color: #7c7c7c;
		margin-left: 20rpx;
		width: 200rpx;
		overflow: hidden;
		text-overflow: ellipsis;
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
		line-height: 40rpx;
		border-radius: 12px;
	}

	.listtwo {
		font-size: 12px;
		height: 40rpx;
		width: 120rpx;
		background-color: #FFF1F3;
		color: #FE8C9F;
		text-align: center;
		line-height: 40rpx;
		border-radius: 12px;
	}

	.btnshow {
		margin-top: 70rpx;
		width: 48rpx;
		height: 48rpx;
		margin-left: 30rpx;
	}

	.allbtns {
		margin-top: 20rpx;
	}


	::v-deep .u-empty {
		margin-top: -80rpx !important;
	}

	::v-deep .u-empty__text {
		margin-top: -80rpx !important;
	}

	::v-deep .u-popup__content {
		opacity: 0.9 !important;
	}
</style>
