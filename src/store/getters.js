import state from "./state";

const getters = {
    // 获取用户token
    getToken: state => {
        return state.token;
    },
    //获取用户信息
    getUserInfo: state => {
        return state.userInfo;
    },
    //导航栏
    getNavigationList: state => {
        return state.navigationList;
    },
    //聊天记录列表
    getChatList: state => {
        return state.chatList;
    },
    //获取客服信息
    getCusUserInfo: state => {
        return state.CusUserInfo;
    },
    //获取分组列表
    getChatFriend: state => {
        return state.ChatFriend;
    },
    //获取好友列表
    getChatFriendsList: state => {
        return state.ChatFriendsList;
    },
    //获取标签列表
    getEditableTabs: state => {
        return state.editableTabs;
    },
    //获取当前标签
    getEditableTabsValue: state => {
        return state.editableTabsValue;
    },
    //获取页面缓存
    getCachedViews: state => {
        return state.cachedViews;
    },
    //菜单
    getCacheNavigation: state => {
        return state.cacheNavigation;
    },
    // 表字段
    getCacheTableFiled:state=>{
        return state.cacheTableFiled
    }
}
export default getters;