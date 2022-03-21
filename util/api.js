const BASE_URL = 'http://localhost:5001/'//接口地址
export const http = (options) => {
	return new Promise((resolve,reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: {Authorization:'Bearer ' + uni.getStorageSync('token')},
			success: (res) => {
					if (res.data.code != '200') {
					// return uni.showToast({
					// 	icon: 'loading',
					// 	title:'获取数据失败'
					// })
				}
				resolve(res)
			},
			fail: (err) => {
				return uni.showToast({
					icon: 'loading',
					title:'请求失败'
				})
				reject(err)
			}
		})
	})
}