import $ from 'jquery'
const baseUrl = 'http://localhost:8080/Library_war_exploded'

const getBooks = () => {
    return $.get(`${baseUrl}/BookServlet`, {
        flag: 'getAllBook'
    }, response => {
        return response
    })
}

const getTypes = () => {
    return $.get(`${baseUrl}/BookServlet`, {
        flag: 'getBookType'
    }, response => {
        return response
    })
}

const reserve = (bookIsbn, userid) => {
    return $.post(`${baseUrl}/UserServlet`, {
        bookIsbn: bookIsbn,
        userId: userid,
        flag: 'setBooking'
    }, response => {
        return response
    })
}

const borrow = (bookId, userid) => {
    return $.post(`${baseUrl}/UserServlet`, {
        flag: 'borrowBook',
        bookId: bookId,
        userId: userid
    }, response => {
        return response
    })
}

export default { getBooks, getTypes, reserve, borrow }