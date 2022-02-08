import { ChatFriendsList } from "@/entity";
import dayjs from "dayjs";

/**
 * 根据身份证获取信息
 * IdCard('142223198503226111',3)
 */
export function IdCard(UUserCard, num) {
    if (num == 1) {
        //获取出生日期
        // year, month, day, hours, minutes, seconds, milliseconds
        return {
            year: UUserCard.substring(6, 10),
            month: UUserCard.substring(10, 12),
            day: UUserCard.substring(12, 14)
        }
    }

    if (num == 2) {
        //获取性别
        if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
            //男
            return "男";
        } else {
            //女
            return "女";
        }
    }

    if (num == 3) {
        //获取年龄
        var myDate = new Date();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
        if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
            age++;
        }
        return age;
    }
}

export function urlParse(url) {
    let obj = {};
    let reg = /[?&][^?&]+=[^?&%]+/g;
    let arr = url.match(reg);
    arr.forEach((item) => {
        let tempArr = item.substring(1).split("=");
        let key = decodeURIComponent(tempArr[0]);
        let val = decodeURIComponent(tempArr[1]);
        obj[key] = val;
    });
    return obj;
}

export function getResheightAndWidth() {
    //设计尺寸 w:750 h:1108
    //1.计算屏幕实际尺寸width / 设计图宽度比 750  宽度比;
    //2.通过比例算出高度应该是多少时，是完美比例
    //3.计算出实际高度与完美高度 的比例
    let adpter_scale = 1;
    let screen_width = document.body.clientWidth; //屏幕实际宽度
    let screen_height = document.body.clientHeight; //屏幕实际高度
    let w_scale = screen_width / 750; //计算屏幕实际尺寸width / 设计图宽度比 750  宽度比;
    let compute_height = 1108 * w_scale; //通过比例算出高度应该是多少时，是完美比例
    adpter_scale = parseInt((screen_height / compute_height) * 100) / 100; //计算出实际高度与完美高度 的比例
    return adpter_scale;
}

//好友分组 分组  好友列表
export function friendManagementFun(Group, List) {
    let Groups = JSON.parse(JSON.stringify(Group))
    let Lists = JSON.parse(JSON.stringify(List))

    //循环好友
    for (let i in Groups) {
        Groups[i].userList = [];
        for (let l in Lists) {
            if (Lists[l].groupId == Groups[i].groupId) {
                Groups[i].userList.push(Lists[l]);
                delete Lists[l];
            }
        }
    }
    let index = -1;
    for (let i in Groups) {
        if (Groups[i].groupId == -1) {
            index = i;
            break;
        }
    }
    for (let i in Lists) {
        Groups[index].userList.push(Lists[i])
        delete Lists[i];
    }

    //排序
    for (let i in Groups) {
        Groups[i].userList.sort(function (a, b) {
            return a.isLogin - b.isLogin
        })
    }

    return Groups;
}

//好友消息处理 好友列表  消息
export function messageReceivedFun(list, obj) {
    let lists = JSON.parse(JSON.stringify(list));
    let objs = JSON.parse(JSON.stringify(obj));

    for (let i in lists) {
        //自己发
        if (obj.isOwn) {
            if (lists[i].frUserId == objs.toUserId) {
                lists[i].listMessages.push(objs);
                return lists;
            }
        } else {
            //客户发
            if (lists[i].frUserId == objs.fromUserId) {
                lists[i].numberMessages += 1;
                lists[i].listMessages.push(objs);
                return lists;
            }
        }
    }

    let chat = ChatFriendsList();
    chat.userId = obj.toUserId;
    chat.frUserId = obj.fromUserId;
    chat.realName = obj.fromUserName;
    chat.avatarUrl = obj.fromUserHeadUrl;
    chat.loginState = 2;
    chat.loginDate = dayjs(obj.outTime).format('YYYY-MM-DD HH:mm:ss.SSS');
    chat.state = 1;
    chat.isLogin = 1;
    chat.numberMessages += 1;
    chat.listMessages.push(obj);
    lists.push(chat)

    return lists;
}

//判断当前聊天人并清除聊天数量 好友列表  当前聊天
//返回 聊天列表 和好友列表
export function messageClearNumberFun(list, obj) {
    let lists = JSON.parse(JSON.stringify(list));
    let objs = JSON.parse(JSON.stringify(obj));
    for (let i in lists) {
        if (lists[i].frUserId == objs.CusUserId) {
            lists[i].numberMessages = 0;
            return { list: lists, chat: lists[i].listMessages }
        }
    }
    return null;
}

//刷新好友列表 好友列表  新列表
export function messageRefreshFun(val, oldVal) {
    let vals = JSON.parse(JSON.stringify(val))
    let oldVals = JSON.parse(JSON.stringify(oldVal))

    let keys = {};
    for (let i in vals) {
        keys[vals[i].frUserId] = vals[i];
    }

    for (let i in oldVals) {
        let item = keys[oldVals[i].frUserId];
        if (item) {
            oldVals[i].numberMessages = item.numberMessages;
            oldVals[i].listMessages = item.listMessages;
        }
    }
    return oldVals;
}

