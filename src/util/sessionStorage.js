// 保存数据
export const setSession = (key, value) => {
    sessionStorage.setItem(key, value);
    return true
}

// 获取数据
export const getSession = (key) => {
    let value = sessionStorage.getItem(key)
    return value;
}

// 删除数据
export const removeSession = (key) => {
    sessionStorage.removeItem(key)
    return true
}

// 清空数据
export const clearAll = () => {
    sessionStorage.clear();
    return true
}