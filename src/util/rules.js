export default {
    phoneLength: { pattern: /^[0-9]{11}$/, message: '手机号长度错误' },
    phoneFormat: { pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/, message: '手机号格式错误' }, //手机号格式
    idCardLength: { pattern: /^[0-9Xx]{18}$/, message: '证件长度错误' },
    idCardFormat: { pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '证件格式错误' },//身份证格式
    verqq: { pattern: /^[1-9][0-9]{4,10}$/, message: "输入的QQ号有误" },
    
}

// { pattern, message: '请输入正确内容' }   正则
// { validator, message: '请输入正确内容' } 函数
// { validator: asyncValidator, message: '请输入正确内容' } 异步函数