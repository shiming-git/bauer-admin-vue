const mutations = {
    setToken(state, item) {
        let row = JSON.parse(JSON.stringify(item))
        state.token = row;
    },
    //设置用户信息
    setUserInfo(state, item) {
        let row = JSON.parse(JSON.stringify(item));
        state.userInfo = row;
    },
    //设置导航
    setNavigationList(state, item) {
        let row = JSON.parse(JSON.stringify(item));
        state.navigationList = row;
    },
    //添加记录聊天列表
    addChatList(state, item) {
        let row = JSON.parse(JSON.stringify(item));
        state.chatList.push(row)
    },
    //聊天记录列表
    setChatList(state, item) {
        let row = JSON.parse(JSON.stringify(item));
        state.chatList = row;
    },
    //设置客服信息
    setCusUserInfo(state, item) {
        let row = JSON.parse(JSON.stringify(item));
        state.CusUserInfo = row;
    },
    //设置分组列表
    setChatFriend(state, item) {
        let row = JSON.parse(JSON.stringify(item));
        state.ChatFriend = row;
    },
    //设置好友列表
    setChatFriendsList(state, item) {
        let row = JSON.parse(JSON.stringify(item));
        state.ChatFriendsList = row;
    },
    //设置标签列表
    setEditableTabs(state, item) {
        let row = JSON.parse(JSON.stringify(item));
        state.editableTabs = row;
    },
    //删除标签列表 id
    deleteEditableTabs(state, id) {
        let lis = state.editableTabs;
        for (let i in lis) {
            if (lis[i].id == id) {
                if (id == state.editableTabsValue) {
                    state.editableTabsValue = "-1"
                }
                const index = state.cachedViews.indexOf(lis[i].pageName)
                index > -1 && state.cachedViews.splice(index, 1)
                state.editableTabs.splice(i, 1);
                return
            }
        }
    },
    //触发导航
    triggerEditableTabs(state, item) {
        let lis = state.editableTabs;
        for (let i in lis) {
            if (lis[i].id == item.id) {
                state.editableTabsValue = item.id + '';
                return
            }
        }
        lis.push(item);
        state.editableTabs = lis;
        state.editableTabsValue = item.id + '';
        // 缓存页面
        if (state.cachedViews.includes(item.pageName)) return;
        state.cachedViews.push(item.pageName);
    },

    //设置当前标签
    setEditableTabsValue(state, item) {
        let row = JSON.parse(JSON.stringify(item));
        state.editableTabsValue = row;
    },
    //设置缓存页面
    setCachedViews(state, item) {
        let row = JSON.parse(JSON.stringify(item));
        state.cachedViews = row;
    },
    // 设置菜单导航
    setCacheNavigation(state, item) {
        let row = JSON.parse(JSON.stringify(item));
        state.cacheNavigation = row;
    },
    // 数组表
    setCacheTableFiled(state, item) {
        let row = JSON.parse(JSON.stringify(item));
        state.cacheTableFiled = row
    }
}

export default mutations;