import $ from 'jquery'
const baseUrl = 'http://localhost:8080/Library_war_exploded'

const getUser = (user) => {
    return $.post(`${baseUrl}/AdminServlet`, {
        adminId: user.userid,
        adminPwd: user.password,
        flag: 'login'
    }, (response) => {
        return response
    })
}

export default getUser