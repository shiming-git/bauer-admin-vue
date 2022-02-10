import http from "./http";
import store from '@/store/index'
import api from "./api";

export function cacheNavigation(isClear = false) {
    return new Promise((resolve, reject) => {
        let item = store.getters.getCacheNavigation
        if (!isClear && !!item["rootNav"] && !!item["nav"]) {
            resolve(item)
        } else {
            store.commit('setCacheNavigation', {})
            api.getmodelist().then((res) => {
                if (res.code != "00000") {
                    reject(null);
                } else {
                    let obj = {};
                    let list = [];
                    list.push({
                        modelID: "-1", //模板ID
                        modelName: "根目录", //模板名称
                        modelIcon: "", //模块icon
                        children: res.data,
                    });
                    obj["rootNav"] = list;
                    obj["nav"] = res.data;
                    store.commit('setCacheNavigation', obj)
                    resolve(obj)
                }
            }).catch(() => {
                reject(null);
            });
        }
    })

}


/**
 * 获取表字段名
 * @param {*} table_name 
 * @returns 
 */
export function cacheTableFilde(table_name) {
    return new Promise((resolve, reject) => {
        let item = store.getters.getCacheTableFiled
        if (item && item[table_name]) {
            resolve(item[table_name])
        } else {
            api.getOnlTableFaild({ "table_name": table_name }).then(res => {
                if (res.code != "00000") {
                    reject([]);
                } else {
                    if (!item) {
                        item = {}
                    }
                    item[table_name] = res.data;
                    store.commit('setCacheTableFiled', item)
                    resolve(item[table_name])
                }
            }).catch(() => {
                reject([]);
            });
        }
    })
}


/**
 * 数据字典缓存
 * @param {*} code 
 * @param {*} table 
 * @param {*} value 
 * @param {*} where 
 * @returns 
 */
export function cacheDataDict(code, table = null, value = null, where = null) {
    return new Promise((resolve, reject) => {
        let data = {
            code,
            table,
            value,
            where
        }
        let keys = []
        code && keys.push(code)
        table && keys.push(table)
        value && keys.push(value)
        where && keys.push(where)

        let str_key = keys.join("-")
        let v = store.getters.getCacheDictCode(str_key)
        if (v.length > 0) {
            resolve(v)
        } else {
            api.getDictCode(data).then(res => {
                if (res.code != "00000") {
                    reject([]);
                } else {
                    let list = res.data
                    let item = {
                        "key": keys,
                        "value": list
                    }
                    store.commit('setCacheDictCode', item)
                    resolve(list)
                }
            }).catch(() => {
                reject([]);
            });
        }
    })
}