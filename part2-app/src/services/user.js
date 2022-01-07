import $ from 'jquery'
const baseUrl = 'http://localhost:8080/Library_war_exploded'

const getRule = (userid) => {
    return $.get(`${baseUrl}/UserServlet`, {
        flag: 'getRule',
        userId: userid
    }, response => {
        return response
    })
}

const changePassword = (userid, oldPassword, newPassword) => {
    return $.post(`${baseUrl}/UserServlet`, {
        flag: 'editUserPwd',
        oldPassword: oldPassword,
        newPassword: newPassword,
        userId: userid
    }, response => {
        return response
    })
}

export default { getRule, changePassword }