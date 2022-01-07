import $ from 'jquery'
const baseUrl = 'http://localhost:8080/Library_war_exploded'

const getRecommendedBooks = () => {
    return $.get(`${baseUrl}/AdminServlet`, {
        flag: 'getRecommendInfo'
    }, response => {
        return response
    })
}

const review = (bookIsbn, result) => {
    return $.post(`${baseUrl}/AdminServlet`, {
        flag: 'adminAudit',
        bookIsbn: bookIsbn,
        result: result
    }, response => {
        return response
    })
}

export default { getRecommendedBooks, review }