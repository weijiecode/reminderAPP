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
	.content {
		width: 100%;
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
		height: 165px;
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
		font-size: 25px;
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
</style>
