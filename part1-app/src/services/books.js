import $ from 'jquery'
const baseUrl = 'http://localhost:8080/Library_war_exploded'

const getBooks = () => {
    return $.get(`${baseUrl}/BookServlet`, {
        flag: 'getTotalBook'
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

const upBooks = (props) => {
    return $.post(`${baseUrl}/BookServlet`, {
        flag: 'bookUp',
        bookUpIsbn: JSON.stringify(props)
    }, response => {
        return response
    })
}

const downBooks = (props) => {
    return $.post(`${baseUrl}/BookServlet`, {
        flag: 'bookDown',
        bookDownIsbn: JSON.stringify(props)
    }, response => {
        return response
    })
}

export default { getBooks, getTypes, upBooks, downBooks }