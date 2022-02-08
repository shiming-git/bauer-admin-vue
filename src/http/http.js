
import axios from "axios";
const qs = require('qs');
axios.defaults.timeout = 60000; // 请求超时
axios.defaults.baseURL = "/sap"; // 增加请求默认路径前缀

const headersjson = {
    "Content-Type": "application/json; charset=utf-8"
}
const fromData = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

export default {
    /**
     * get 请求
     * @param url 接口路由
     * @returns {AxiosPromise<any>}
     */
    get(url, params, headers = headersjson) {
        let options = {};

        if (params) {
            options.params = params;
        }
        if (headers) {
            options.headers = headers;
        }
        return axios.get(url, options);
    },

    /**
     * post 请求
     *
     * @param url 接口路由
     * @param params 接口参数
     * @returns {AxiosPromise<any>}
     */
    post(url, data, headers = headersjson) {
        let options = {};
        if (headers) {
            options.headers = headers;
        }
        return axios.post(url, data, options);
    },

    /**
     * put 请求
     * @param {*} url 
     * @param {*} data 
     * @param {*} headers 
     * @returns 
     */
    put(url, data, headers = headersjson) {
        let options = {};
        if (headers) {
            options.headers = headers;
        }
        return axios.put(url, data, options)
    },

    /**
     * delete
     * @param {*} url 
     * @param {*} params 
     * @param {*} headers 
     * @returns 
     */
    delete(url, params, headers = headersjson) {
        let options = {};
        if (params) {
            options.data = params;
        }
        if (headers) {
            options.headers = headers;
        }
        return axios.delete(url, options)
    },


    /**
     * from 表单提交
     */
    fromReq(url, data, headers = fromData) {
        const options = {
            method: 'POST',
            headers: headers,
            data: qs.stringify(data),
            url,
        };
        return axios(options);
    },


    /**
     * get获取文件流
     */
    fileStream(url) {
        const options = {
            url: url,
            method: "get",
            responseType: "blob",
        }
        return axios(options);
    },
}
