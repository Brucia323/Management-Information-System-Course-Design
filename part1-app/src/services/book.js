import $ from 'jquery'
const baseUrl = 'http://localhost:8080/Library_war_exploded'

const getBook = (props) => {
    return $.get(`${baseUrl}/BookServlet`, {
        isbn: props,
        flag: 'getOneBook'
    }, (response) => {
        return response
    })
}

const updateBook = (props) => {
    return $.post(`${baseUrl}/BookServlet`, {
        flag: 'bookEdit',
        bookIsbn: props.bookIsbn,
        bookName: props.bookName,
        bookMoney: props.bookMoney,
        bookPublictime: props.bookPublictime,
        bookTypeId: props.bookTypeId,
        bookPress: props.bookPress,
        bookAuthor: props.bookAuthor,
        oldIsbn: props.oldIsbn,
    }, (response) => {
        return response
    })
}

const bookUp = (props) => {
    return $.post(`${baseUrl}/BookServlet`, {
        flag: 'upOneBook',
        bookId: props
    }, response => {
        return response
    })
}

const bookDown = (props) => {
    return $.post(`${baseUrl}/BookServlet`, {
        flag: 'downOneBook',
        bookId: props
    }, response => {
        return response
    })
}

const bookLost = (props) => {
    return $.post(`${baseUrl}/BookServlet`, {
        flag: 'lost',
        bookId: props
    }, response => {
        return response
    })
}

export default { getBook, updateBook, bookUp, bookDown, bookLost }