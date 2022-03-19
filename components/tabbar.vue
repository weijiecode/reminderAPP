<!-- <template>
	<view class="tabcontent">
		<view class="tabbarbox">
			<view class="tabbar">
				<ul>
					<li :class="{ item: true, active: isacive == 1 }" @click="setActive1">
						<view :class="{ activecircle: true, jello: isacive == 1,addcolorbg: isacive == 1 }">
							<view class="iconfont icon-daibanshixiang" :class="{addcolorico: isacive == 1}">
							</view>
						</view>
					</li>
					<li :class="{ item: true, active: isacive == 2 }" @click="setActive2">
						<view :class="{ activecircle: true, jello: isacive == 2, addcolorbg: isacive == 2 }">
							<view class="iconfont icon-guanli" :class="{addcolorico: isacive == 2}">
							</view>
						</view>
					</li>
					<li :class="{ item: true, active: isacive == 3 }" @click="setActive3">
						<view :class="{ activecircle: true, jello: isacive == 3, addcolorbg: isacive == 3 }">
							<view class="iconfont icon-weizhi" :class="{addcolorico: isacive == 3}">
							</view>
						</view>
					</li>
					<li :class="{ item: true, active: isacive == 4 }" @click="setActive4">
						<view :class="{ activecircle: true, jello: isacive == 4, addcolorbg: isacive == 4 }">
							<view class="iconfont icon-wode2" :class="{addcolorico: isacive == 4}">
							</view>
						</view>
					</li>
				</ul>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tabbar",
		data() {
			return {
				isacive: 1,
			};
		},
		created() {},
		methods: {
			setActive1() {
				this.isacive = 1;
				uni.navigateTo({
					url: "/pages/index/index"
				})
				setTimeout(() => {
					this.isjello = false;
				}, 500);
			},
			setActive2() {
				this.isacive = 2;
				uni.navigateTo({
					url: "/pages/more/more"
				})
				setTimeout(() => {
					this.isjello = false;
				}, 500);
			},
			setActive3() {
				this.isacive = 3;
				setTimeout(() => {
					this.isjello = false;
				}, 500);
			},
			setActive4() {
				this.isacive = 4;
				setTimeout(() => {
					this.isjello = false;
				}, 500);
			},
		}
	}
</script>

<style>
	.tabcontent {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.tabbarbox {
		width: 100%;
		margin: 0;
		padding: 0;

		/* 弹性布局 水平+垂直居中 */
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.addcolorbg {
		background-color: #FFFFFF;
	}
	.addcolorico {
		color: #B1A9EF !important;
	}
	.tabbar {
		width: 100%;
		/* 相对定位 */
		position: relative;
		background-color: #B1A9EF;
		border-radius: 25px 25px 0 0;
		padding-bottom: 5px;
	}

	.tabbar ul {

		/* 去掉前面的小黑点 */
		list-style: none;
		/* 让li横向排列 */
		display: flex;
		padding-left: 0;
		justify-content: center;
	}

	.tabbar ul li {
		/* 相对定位 */
		position: relative;
		z-index: 1;
		width: 48px;
		height: 40px;
		border-radius: 50%;

		margin: 15px;
		/* 光标变小手 */
		cursor: pointer;
		/* 设置过渡 */
		transition: 1s;
		/* flex-direction: column; */
	}


	.tabbar ul li .iconfont {
		/* 字体图标大小 */
		font-size: 28px;
		transition: 0.5s;
		color: #ffffff;
		margin-top: 8px;
	}

	/* 分别为每一个选中项的字体图标设置颜色（通过var函数调用自定义颜色进行设置） */
	.tabbar ul li.active .iconfont {
		color: #ffffff;
	}

	/* 选中项的背景圆 */
	.activecircle {
		width: 50px;
		height: 50px;
		/* background-color: #ffffff; */
		border-radius: 50%;
		/* 绝对定位 */
		position: absolute;
		z-index: 0;
		display: flex;
		justify-content: center;
		flex-direction: inherit;
		/* 设置过渡 */
		transition: 0.4s ease-in-out;
	}

	/* 选中项的背景圆的果冻动画 */
	.jello {
		/* 执行动画：动画名 时长 线性的 停留在最后一帧 */
		animation: jello 0.8s linear forwards;
	}

	/* 定义动画 */
	/* 果冻Q弹感觉 */
	@keyframes jello {
		0% {
			transform: scale(1, 1);
		}

		30% {
			transform: scale(1.25, 0.75);
		}

		40% {
			transform: scale(0.75, 1.25);
		}

		50% {
			transform: scale(1.15, 0.85);
		}

		65% {
			transform: scale(0.95, 1.05);
		}

		75% {
			transform: scale(1.05, 0.95);
		}

		100% {
			transform: scale(1, 1);
		}
	}
</style>
 -->