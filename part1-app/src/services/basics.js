import $ from 'jquery'
const baseUrl = 'http://localhost:8080/Library_war_exploded'

const getCollege = () => {
    return $.get(`${baseUrl}/BasicServlet`, {
        flag: 'getTotalCollege'
    }, response => {
        return response
    })
}

const getMajor = () => {
    return $.get(`${baseUrl}/BasicServlet`, {
        flag: 'getTotalMajor'
    }, response => {
        return response
    })
}

const getReader = () => {
    return $.get(`${baseUrl}/BasicServlet`, {
        flag: 'getTotalStudent'
    }, response => {
        return response
    })
}

const resetPassword = (userId) => {
    return $.post(`${baseUrl}/AdminServlet`, {
        flag: 'resetPassword',
        userId: userId
    }, response => {
        return response
    })
}

export default { getCollege, getMajor, getReader, resetPassword }