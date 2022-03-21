<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
		@import "@/uni_modules/uview-ui/index.scss";
	/*每个页面公共css */
	@import './static/fonts/iconfont-weapp-icon.css';
	page {
		height: 100%;
		background-color: #F8F8FB;
	}
</style>
