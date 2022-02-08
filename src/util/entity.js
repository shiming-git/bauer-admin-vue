// 实体类  对应Java
// Socket消息
export function SocketMass() {
    return {
        //发送人ID
        fromUserId: "",
        //发送人头像
        fromUserHeadUrl: "",
        //发送人名称
        fromUserName: "",
        //接收人ID
        toUserId: "",
        //发送内容
        outContent: "",
        //发送类型
        outType: "",
        //发送状态
        outStart: "",
        //发送时间
        outTime: "",
        //是否自己
        isOwn: true,
    }
}
//用户信息
export function UserInfo() {
    return {
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
    }
}
export function CusUserInfo() {
    return {
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
    }
}
// 导航消息
export function NavigationList() {
    return {
        //id
        id: "",
        //名称
        name: "",
        //图标
        iconCls: "",
        //页面
        path: "",
        //子类
        children: [],
    }
}

//标签页
export function TabsList() {
    return {
        //id
        id: "",
        //名称
        name: "",
        //页面
        path: "",
        //图标
        iconCls: "",
        //是否可关闭
        isclosable: true,
        //页面名称
        pageName: "",
    }
}

// Socket指令
export function Instructions(doc = "", obj = {}) {
    return {
        doc: doc, //指令 ping心跳包  chat聊天
        data: obj, //数据
    }
}

// 分组
export function ChatFriend() {
    return {
        groupId: -1,//分组Id
        userId: "",//用户ID
        groupName: "我的好友",//分组名称
        newDate: "",//创建时间
        sort: 1,//排序
        userList: [] //用户列表
    }
}
//好友
export function ChatFriendsList() {
    return {
        "userId": "",//用户ID
        "frUserId": "",//好友ID
        "groupId": "",//好友分组ID
        "noteName": "",//备注名称
        "realName": "",//好友名称
        "avatarUrl": "",//好友头像
        "loginState": "",//好友类别 0未知 1商家  2游客
        "loginDate": "",//好友登录时间
        "state": "",//好友状态 1正常 2审核 3停用
        "isLogin": "",//是否登录 1在线  2离线
        "numberMessages": 0,//消息数量
        "listMessages": [],//消息列表
    }
}

//足迹
export function logRecord() {
    return {
        id: "",//ID
        userID: "",//用户ID
        realName: "",//用户名称
        source: "",//来源
        networkId: "",//网路ip
        loginDate: "",//登录时间
        address: "",//地址
        userType: "",//用户类型 0未知 1商家  2游客
        code: "",//邀请码
        codeName: "",
    }
}

//系统配置
export function SysConfig(params) {
    return {
        configOn: "",//配置编码
        configName: "",//配置名称
        configValue: "",//配置属性
        configType: "",//配置类型
        configGroup: "",//配置组名
    }
}