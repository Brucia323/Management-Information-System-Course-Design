import $ from 'jquery'
const baseUrl = 'http://localhost:8080/Library_war_exploded'

const getRule = () => {
    return $.get(`${baseUrl}/AdminServlet`, {
        flag: 'getRule'
    }, response => {
        return response
    })
}

const setRule = (props) => {
    return $.post(`${baseUrl}/AdminServlet`, {
        teacherMaxCount: props.teacherMaxCount,
        studentMaxCount: props.studentMaxCount,
        teacherMaxTime: props.teacherMaxTime,
        studentMaxTime: props.studentMaxTime,
        lateRatio: props.lateRatio,
        flag: 'setRule',
        addTime: props.addTime
    }, response => {
        return response
    })
}

const getData = () => {
    return $.get(`${baseUrl}/AdminServlet`, {
        flag: 'showDataAnalyze'
    }, response => {
        return response
    })
}

export default { getRule, setRule, getData }