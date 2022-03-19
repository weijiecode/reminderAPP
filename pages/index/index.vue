<template>
	<view class="content">
		<view class="navigate">
			<text class="lefttitle">待办</text>
			<text class="rightdatetime">{{todaydatem}}</text>
		</view>
		<view class="colorbg">
		</view>
		<view class="datetime">
			<view class="datebox">
				<view :class="{column:true,iscolumn: week1 == today}">
					<text>一</text>
					<text>{{week1}}</text>
				</view>
				<view :class="{column:true,iscolumn: week2 == today}">
					<text>二</text>
					<text>{{week2}}</text>
				</view>
				<view :class="{column:true,iscolumn: week3 == today}">
					<text>三</text>
					<text>{{week3}}</text>
				</view>
				<view :class="{column:true,iscolumn: week4 == today}">
					<text>四</text>
					<text>{{week4}}</text>
				</view>
				<view :class="{column:true,iscolumn: week5 == today}">
					<text>五</text>
					<text>{{week5}}</text>
				</view>
				<view :class="{column:true,iscolumn: week6 == today}">
					<text>六</text>
					<text>{{week6}}</text>
				</view>
				<view :class="{column:true,iscolumn: week7 == today}">
					<text>日</text>
					<text>{{week7}}</text>
				</view>
			</view>
			<view class="jinbox">
				<text :class="{jin:true,isjin: week1 == today}">今</text>
				<text :class="{jin:true,isjin: week2 == today}">今</text>
				<text :class="{jin:true,isjin: week3 == today}">今</text>
				<text :class="{jin:true,isjin: week4 == today}">今</text>
				<text :class="{jin:true,isjin: week5 == today}">今</text>
				<text :class="{jin:true,isjin: week6 == today}">今</text>
				<text :class="{jin:true,isjin: week7 == today}">今</text>
			</view>
		</view>
		<view class="listbox">
			<view class="linebox">
				<view class="box">
					<p class="classname">生活</p>
					<p class="nums">10条清单</p>
					<view class="itemlist">
						<view class="listone">
							已完成 3
						</view>
						<view class="listtwo">
							未完成 2
						</view>
					</view>
				</view>
				<view class="box">
					<p class="classname">工作</p>
					<p class="nums">10条清单</p>
					<view class="itemlist">
						<view class="listone">
							已完成 3
						</view>
						<view class="listtwo">
							未完成 2
						</view>
					</view>
				</view>
			</view>
			<view class="linebox">
				<view class="box">
					<p class="classname">学习</p>
					<p class="nums">10条清单</p>
					<view class="itemlist">
						<view class="listone">
							已完成 3
						</view>
						<view class="listtwo">
							未完成 2
						</view>
					</view>
				</view>
				<view class="box">
					<p class="classname">健康</p>
					<p class="nums">10条清单</p>
					<view class="itemlist">
						<view class="listone">
							已完成 3
						</view>
						<view class="listtwo">
							未完成 2
						</view>
					</view>
				</view>
			</view>
			<view class="linebox">
				<view class="box">
					<p class="classname">社交</p>
					<p class="nums">10条清单</p>
					<view class="itemlist">
						<view class="listone">
							已完成 3
						</view>
						<view class="listtwo">
							未完成 2
						</view>
					</view>
				</view>
				<view class="box">
					<p class="classname">其它</p>
					<p class="nums">10条清单</p>
					<view class="itemlist">
						<view class="listone">
							已完成 3
						</view>
						<view class="listtwo">
							未完成 2
						</view>
					</view>
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
		created() {
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
		},

	}
</script>

<style>
	page {
		background-color: #F8F8FB;
	}
	.content {
		width: 100%;
		height: 100%;
		
	}

	.navigate {
		width: 100%;
		height: 165px;
		background-color: #ffffff;
		background-image: linear-gradient(62deg, #ffffff 9%, #8EC5FC 49%, #E0C3FC 63%);
		position: relative;
	}

	.colorbg {
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
		margin-top: 30px;
		float: left;
		margin-left: 30px;
		font-size: 23px;
		font-weight: bold;
	}

	.rightdatetime {
		margin-top: 30px;
		float: right;
		margin-right: 30px;
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
		justify-content: space-around ;
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
		height: 325rpx;
		background-color: #ffffff;
		border-radius: 20px;
	}
	.classname {
		color: #383636;
		font-size: 28px;
		margin: 40rpx 0 20rpx 40rpx;
		font-weight: bold;
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
</style>
