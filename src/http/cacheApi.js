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
export function cacheTableFilde(table_name){
    return new Promise((resolve, reject)=>{
        let item = store.getters.getCacheTableFiled
        if (item && item[table_name]) {
            resolve(item[table_name])
        }else{
            api.getOnlTableFaild({"table_name":table_name}).then(res=>{
                if (res.code != "00000") {
                    reject([]);
                }else{
                    if(!item){
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
