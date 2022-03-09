module.exports = {
    devServer: {
        port: 7030,
        https: false,
        proxy: {
            '/api': {
                target: 'http://localhost:8001',
                // target: "http://lookup.sichuangde.com",
                // target: "http://120.24.92.68:8821",
                ws: true, //是否跨域
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            },
        },
    }
}