const state = {
    // 用户token
    token: "",
    //用户信息
    userInfo: {
        //用户ID
        userId: "",
        //用户账号
        userAccount: "",
        //用户头像
        userUserHeadUrl: "",
        //用户名称
        userName: "",
        //用户状态
        userState: "",
        //登录时间
        logTime: "",
    },
    //客服
    CusUserInfo: {
        //用户ID
        CusUserId: "",
        //用户账号
        CusUserAccount: "",
        //用户头像
        CusUserUserHeadUrl: "",
        //用户名称
        CusUserName: "",
        //用户状态
        CusUserState: "",
        //登录时间
        logTime: "",
    },
    //导航栏
    navigationList: [],
    //聊天记录列表
    chatList: [],
    //好友分组列表
    ChatFriend: [],
    //好友列表
    ChatFriendsList: [],
    //标签页列表
    editableTabs: [],
    //当前标签页
    editableTabsValue: "",
    //页面缓存
    cachedViews: [],
    //菜单列表缓存
    cacheNavigation: {},
    // 表字段名保存
    cacheTableFiled:{},
}
export default state;