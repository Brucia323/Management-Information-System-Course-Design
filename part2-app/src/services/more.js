import $ from 'jquery'
const baseUrl = 'http://localhost:8080/Library_war_exploded'

const getTypes = () => {
    return $.get(`${baseUrl}/BookServlet`, {
        flag: 'getBookType'
    }, response => {
        return response
    })
}

const commit = (props, userid) => {
    return $.post(`${baseUrl}/UserServlet`, {
        bookName: props.bookName,
        bookIsbn: props.bookIsbn,
        bookAuthor: props.bookAuthor,
        bookMoney: props.bookMoney,
        bookPress: props.bookPress,
        bookPublicTime: props.bookPublicTime,
        bookTypeId: props.bookType,
        flag: 'recommendBook',
        userId: userid
    }, response => {
        return response
    })
}

const getMoney = (userid) => {
    return $.get(`${baseUrl}/UserServlet`, {
        flag: 'getTotalMoney',
        userId: userid
    }, response => {
        return response
    })
}

const setMoney = (userid) => {
    return $.post(`${baseUrl}/UserServlet`, {
        flag: 'setTotalMoney',
        userId: userid
    }, response => {
        return response
    })
}

const compensationBook = (props, userid) => {
    return $.post(`${baseUrl}/UserServlet`, {
        // bookName: props.bookName,
        bookIsbn: props.bookIsbn,
        // bookAuthor: props.bookAuthor,
        // bookMoney: props.bookMoney,
        // bookPress: props.bookPress,
        // bookPublicTime: props.bookPublicTime,
        // bookTypeId: props.bookType,
        flag: 'compensationBook',
        userId: userid
    }, response => {
        return response
    })
}

export default { getTypes, commit, getMoney, setMoney, compensationBook }