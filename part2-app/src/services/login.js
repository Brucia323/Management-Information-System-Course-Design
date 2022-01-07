import $ from 'jquery'
const baseUrl = 'http://localhost:8080/Library_war_exploded'

const getUser = (user) => {
    return $.post(`${baseUrl}/UserServlet`, {
        userId: user.userid,
        userPwd: user.password,
        flag: 'login'
    }, (response) => {
        return response
    })
}

export default getUser