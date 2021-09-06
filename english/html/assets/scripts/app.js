import { learn_data } from './learn.js'
import { repeat_data } from './repeat.js'
import { find_data } from './find.js'
import { type_data } from './type.js'
import { listen_data } from './listen.js'

let data = []
let current_index = 0
let current = data[current_index]

const learn_page_size = 5

document.getElementById('next-btn').addEventListener('click', () => {
    if (current_index < data.length - 1) {
        current_index++
    } else {
        current_index = 0
    }
    current = data[current_index]
    const active = document.querySelector('button.excercises.active')
    if (active.id === 'learn-btn') {
        learn_data(current_index, learn_page_size, data)
    } else if (active.id === 'repeat-btn') {
        repeat_data(current, current_index, data)
    } else if (active.id === 'find-btn') {
        find_data(current, current_index, data)
    } else if (active.id === 'type-btn') {
        type_data(current, current_index, data)
    } else if (active.id === 'listen-btn') {
        listen_data(current, current_index, data)
    }
})

document.getElementById('prev-btn').addEventListener('click', () => {
    const active = document.querySelector('button.excercises.active')
    if (current_index > 0) {
        current_index--
    } else {
        current_index = data.length - 1
    }
    current = data[current_index]
    if (active.id === 'learn-btn') {
        learn_data(current_index, learn_page_size, data)
    } else if (active.id === 'repeat-btn') {
        repeat_data(current, current_index, data)
    } else if (active.id === 'find-btn') {
        find_data(current, current_index, data)
    } else if (active.id === 'type-btn') {
        type_data(current, current_index, data)
    } else if (active.id === 'listen-btn') {
        listen_data(current, current_index, data)
    }
})

const shuffle_data = (data) => {
    const shuffledArray = data.slice().sort((a, b) => 0.5 - Math.random())
    return shuffledArray
}

document.getElementById('learn-btn').addEventListener('click', () => {
    document.getElementById('main').innerHTML = `<table class="table"></table>`
    current_index = 0
    for (const elem of document.querySelectorAll('button.excercises')) {
        elem.classList.remove('active')
    }
    document.getElementById('learn-btn').classList.add('active')
    learn_data(current_index, learn_page_size, data)
})

document.getElementById('repeat-btn').addEventListener('click', () => {
    document.getElementById('main').innerHTML = `<div class="words">
            <h2 id="german"></h2>
            <h2 id="english"></h2>
            <div id="audio"></div>
        </div>
    <div id="picture"></div>`
    current_index = 0
    data = shuffle_data(data)
    current = data[current_index]
    for (const elem of document.querySelectorAll('button.excercises')) {
        elem.classList.remove('active')
    }
    document.getElementById('repeat-btn').classList.add('active')
    repeat_data(current, current_index, data)
})

document.getElementById('find-btn').addEventListener('click', () => {
    document.getElementById('main').innerHTML = `<div id="word"></div>
    <div id="words" class="words"></div>`
    current_index = 0
    data = shuffle_data(data)
    current = data[current_index]
    find_data(current, current_index, data)
})

document.getElementById('type-btn').addEventListener('click', () => {
    document.getElementById('main').innerHTML = `<div id="word"></div>`
    current_index = 0
    data = shuffle_data(data)
    current = data[current_index]
    type_data(current, current_index, data)
})

document.getElementById('listen-btn').addEventListener('click', () => {
    document.getElementById('main').innerHTML = `<div id="word"></div>`
    current_index = 0
    data = shuffle_data(data)
    current = data[current_index]
    listen_data(current, current_index, data)
})

const grade_select = document.getElementById('grade')
const topic_select = document.getElementById('topic')
const lesson_select = document.getElementById('lesson')

const toggle_load_data_btn = () => {
    const btn = document.getElementById('load-data-btn')
    const grade = grade_select.value
    if (grade === '') {
        btn.setAttribute('disabled', 'disabled')
        return
    } else if (grade === 'all') {
        btn.removeAttribute('disabled')
        return
    }
    const topic = topic_select.value
    if (topic === '') {
        btn.setAttribute('disabled', 'disabled')
        return
    } else if (topic === 'all') {
        btn.removeAttribute('disabled')
        return
    }
    const lesson = lesson_select.value
    if (lesson === '') {
        btn.setAttribute('disabled', 'disabled')
        return
    } else {
        btn.removeAttribute('disabled')
        return
    }
}

grade_select.addEventListener('change', () => {
    const grade = grade_select.value
    console.log(grade)
    if (grade === '' || grade === 'all') {
        topic_select.style.display = 'none'
        lesson_select.style.display = 'none'
    } else {
        topic_select.style.display = 'inline'
        topic_select.value = ''
        lesson_select.style.display = 'none'
        fetch(`/api/list/${grade}`)
            .then(response => response.json())
            .then(data => {
                let html = '<option value=""></option>'
                for (const elem of data) {
                    html += `<option value="${elem}">${elem.replaceAll('_', ' ')}</option>`
                }
                html += '<option value="all">Alle</option>'
                topic_select.innerHTML = html
            });
    }
    toggle_load_data_btn()
})

topic_select.addEventListener('change', () => {
    const grade = grade_select.value
    const topic = topic_select.value
    if (topic === '' || topic === 'all') {
        lesson_select.style.display = 'none'
    } else {
        lesson_select.style.display = 'inline'
        lesson_select.value = ''
        fetch(`/api/list/${grade}/${topic}`)
            .then(response => response.json())
            .then(data => {
                let html = '<option value=""></option>'
                for (const elem of data) {
                    html += `<option value="${elem}">${elem.replaceAll('_', ' ')}</option>`
                }
                html += '<option value="all">Alle</option>'
                lesson_select.innerHTML = html
            });
    }
    toggle_load_data_btn()
})

lesson_select.addEventListener('change', () => {
    toggle_load_data_btn()
})

window.addEventListener('load', () => {
    document.querySelector('div.excercises').style.display = 'none'
    document.querySelector('div#main').style.display = 'none'
    document.querySelector('div.panel').style.display = 'none'
    fetch(`/api/list/all`)
        .then(response => response.json())
        .then(data => {
            let html = '<option value=""></option>'
            for (const elem of data) {
                html += `<option value="${elem}">${elem.replaceAll('_', ' ')}</option>`
            }
            html += '<option value="all">Alle</option>'
            grade_select.innerHTML = html
        });
})

toggle_load_data_btn()
//document.getElementById('learn-btn').click()
document.getElementById('load-data-btn').addEventListener('click', () => {
    const grade = grade_select.value
    let topic = ''
    let lesson = ''
    let uri = `/api/load/${grade}`
    if (grade !== 'all') {
        topic = topic_select.value
        uri += `/${topic}`
        if (topic !== 'all') {
            lesson = lesson_select.value
            uri += `/${lesson}`
        }
    }
    fetch(uri)
        .then(response => response.json())
        .then(json => {
            data = json
            document.querySelector('div.excercises').style.display = 'block'
            document.querySelector('div#main').style.display = 'flex'
            document.querySelector('div.panel').style.display = 'flex'
            document.getElementById('learn-btn').click()
        })
})