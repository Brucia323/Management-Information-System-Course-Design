import $ from 'jquery'
const baseUrl = 'http://localhost:8080/Library_war_exploded'

const getReserve = (userid) => {
    return $.get(`${baseUrl}/UserServlet`, {
        flag: 'getBookingInfo',
        userId: userid
    }, response => {
        return response
    })
}

const getBorrow = (userid) => {
    return $.get(`${baseUrl}/UserServlet`, {
        flag: 'getBorrowInfo',
        userId: userid
    }, response => {
        return response
    })
}

const cancelReserve = (userid, bookIsbn) => {
    return $.post(`${baseUrl}/UserServlet`, {
        bookIsbn: bookIsbn,
        userId: userid,
        flag: 'cancelReserve'
    }, response => {
        return response
    })
}

const returnBook = (userid, bookid, borrowId) => {
    return $.post(`${baseUrl}/UserServlet`, {
        flag: 'returnBook',
        bookId: bookid,
        userId: userid,
        borrowId: borrowId
    }, response => {
        return response
    })
}

const renew = (userid, borrowId) => {
    return $.post(`${baseUrl}/UserServlet`, {
        flag: 'renew',
        borrowId: borrowId,
        userId: userid
    }, response => {
        return response
    })
}

export default { getReserve, getBorrow, cancelReserve, returnBook, renew }