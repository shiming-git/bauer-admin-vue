import axios from "axios";
import router from '@/router/index';
import { Message } from 'element-ui';

import { getSession, removeSession } from "@/util/sessionStorage";

// 请求拦截
axios.interceptors.request.use(

    config => {
        let token = getSession("token")
        if (token) {
            config.headers.common['token'] = token;
        }
        // 1. 这个位置就请求前最后的配置
        // 2. 当然你也可以在这个位置 加入你的后端需要的用户授权信息
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截
axios.interceptors.response.use(
    response => {
        switch (response.data.code) {
            case "A0101":
                removeSession("token");
                Message.error(response.data.message)
                router.push({ path: "/login" });
                break
            case "A0102":
                removeSession("token");
                Message.error(response.data.message)
                router.push({ path: "/login" });
                break
            case "A0103":
                removeSession("token");
                Message.error(response.data.message)
                router.push({ path: "/login" });
                break
            case "A0200":
                removeSession("token");
                Message.error(response.data.message)
                router.push({ path: "/login" });
                break
        }

        // 请求成功
        // 1. 根据自己项目需求定制自己的拦截
        // 2. 然后返回数据
        return response.data;
    },
    error => {
        // 请求失败
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    // 对400错误您的处理
                    console.log("错误请求");
                    break;
                case 403:
                    // 对 403 错误进行处理
                    console.log("拒绝访问");
                    break;
                case 404:
                    // 对 404 错误进行处理
                    console.log("请求错误,未找到该资源");
                    break;
                case 500:
                    // 对 500 错误进行处理
                    console.log("服务器端出错");
                    break;
                case 502:
                    // 对 502 错误进行处理
                    console.log("网络错误");
                    break;
                case 503:
                    // 对 503 错误进行处理
                    console.log("服务不可用");
                    break;
                case 504:
                    // 对 504 错误进行处理
                    console.log("网络超时");
                    break;
                default:
                    // 如果以上都不是的处理
                    return Promise.reject(error);
            }
        } else {
            console.log("连接到服务器失败");
        }
    }
);