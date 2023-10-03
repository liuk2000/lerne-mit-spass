import { learn_data } from './learn.js'
import { repeat_data } from './repeat.js'
import { find_data } from './find.js'
import { insert_data } from './insert.js'
import { type_data } from './type.js'
import { listen_data } from './listen.js'

let data = []
let sentences = []
let current_index = 0
let current = data[current_index]

let subject = null
let topics = null

const learn_page_size = 4

document.getElementById('next-btn').addEventListener('click', () => {
  if (current_index < data.length - 1) {
    current_index++
  } else {
    current_index = 0
  }
  current = data[current_index]
  const active = document.querySelector('nav li.selected')
  if (active.id === 'learn-btn') {
    learn_data(get_subject(), current_index, learn_page_size, data)
  } else if (active.id === 'repeat-btn') {
    repeat_data(get_subject(), current, current_index, data)
  } else if (active.id === 'insert-btn') {
    insert_data(get_subject(), current, current_index, sentences)
  } else if (active.id === 'find-btn') {
    find_data(get_subject(), current, current_index, data)
  } else if (active.id === 'type-btn') {
    type_data(get_subject(), current, current_index, data)
  } else if (active.id === 'listen-btn') {
    listen_data(get_subject(), current, current_index, data)
  }
})

document.getElementById('prev-btn').addEventListener('click', () => {
  const active = document.querySelector('nav li.selected')
  if (current_index > 0) {
    current_index--
  } else {
    current_index = data.length - 1
  }
  current = data[current_index]
  if (active.id === 'learn-btn') {
    learn_data(get_subject(), current_index, learn_page_size, data)
  } else if (active.id === 'repeat-btn') {
    repeat_data(get_subject(), current, current_index, data)
  } else if (active.id === 'find-btn') {
    find_data(get_subject(), current, current_index, data)
  } else if (active.id === 'insert-btn') {
    insert_data(get_subject(), current, current_index, sentences)
  } else if (active.id === 'type-btn') {
    type_data(get_subject(), current, current_index, data)
  } else if (active.id === 'listen-btn') {
    listen_data(get_subject(), current, current_index, data)
  }
})

const shuffle_data = (data) => {
  const shuffledArray = data.slice().sort((a, b) => 0.5 - Math.random())
  return shuffledArray
}

document.getElementById('learn-btn').addEventListener('click', () => {
  document.querySelector('.main .container .main__grid').style.display = 'grid'
  document.querySelector('.main .container .main__container').style.display =
    'none'
  current_index = 0
  for (const elem of document.querySelectorAll('nav ul li')) {
    elem.classList.remove('selected')
  }
  document.getElementById('learn-btn').classList.add('selected')
  if (document.querySelector('#check:checked')) {
    document.querySelector('#check:checked').checked = false
  }
  learn_data(get_subject(), current_index, learn_page_size, data)
})

document.getElementById('repeat-btn').addEventListener('click', () => {
  document.querySelector('.main .container .main__grid').style.display = 'none'
  document.querySelector('.main .container .main__container').style.display =
    'block'
  document.querySelector(
    '.main .container .main__container'
  ).innerHTML = `<div class="card mono">
        <div>
            <div class="german">
                <strong></strong>
            </div>
            <div class="${get_subject()}"></div>
            <div class="audio invisible"></div>
        </div>
        <div id="picture" class="picture"></div>
    </div>`
  current_index = 0
  data = shuffle_data(data)
  current = data[current_index]
  for (const elem of document.querySelectorAll('nav ul li')) {
    elem.classList.remove('selected')
  }
  document.getElementById('repeat-btn').classList.add('selected')
  if (document.querySelector('#check:checked')) {
    document.querySelector('#check:checked').checked = false
  }
  repeat_data(get_subject(), current, current_index, data)
})

document.getElementById('find-btn').addEventListener('click', () => {
  document.querySelector('.main .container .main__grid').style.display = 'none'
  document.querySelector('.main .container .main__container').style.display =
    'block'
  document.querySelector(
    '.main .container .main__container'
  ).innerHTML = `<div class="card mono">
        <div>
            <div class="german"><strong></strong></div>
        </div>
        <div id="words" class="words"></div>
    </div>`
  current_index = 0
  data = shuffle_data(data)
  current = data[current_index]
  for (const elem of document.querySelectorAll('nav ul li')) {
    elem.classList.remove('selected')
  }
  document.getElementById('find-btn').classList.add('selected')
  if (document.querySelector('#check:checked')) {
    document.querySelector('#check:checked').checked = false
  }
  find_data(get_subject(), current, current_index, data)
})

document.getElementById('insert-btn').addEventListener('click', () => {
  const subject = get_subject()
  document.querySelector('.main .container .main__grid').style.display = 'none'
  document.querySelector('.main .container .main__container').style.display =
    'block'
  document.querySelector(
    '.main .container .main__container'
  ).innerHTML = `<div class="card mono"></div>`
  current_index = 0
  data = shuffle_data(data)
  current = data[current_index]
  for (const elem of document.querySelectorAll('nav ul li')) {
    elem.classList.remove('selected')
  }
  document.getElementById('insert-btn').classList.add('selected')
  if (document.querySelector('#check:checked')) {
    document.querySelector('#check:checked').checked = false
  }
  insert_data(subject, current, current_index, shuffle_data(sentences))
})

document.getElementById('type-btn').addEventListener('click', () => {
  const subject = get_subject()
  document.querySelector('.main .container .main__grid').style.display = 'none'
  document.querySelector('.main .container .main__container').style.display =
    'block'
  document.querySelector(
    '.main .container .main__container'
  ).innerHTML = `<div class="card mono"></div>`
  current_index = 0
  data = shuffle_data(data)
  current = data[current_index]
  for (const elem of document.querySelectorAll('nav ul li')) {
    elem.classList.remove('selected')
  }
  document.getElementById('type-btn').classList.add('selected')
  if (document.querySelector('#check:checked')) {
    document.querySelector('#check:checked').checked = false
  }
  type_data(subject, current, current_index, data)
})

document.getElementById('listen-btn').addEventListener('click', () => {
  const subject = get_subject()
  document.querySelector('.main .container .main__grid').style.display = 'none'
  document.querySelector('.main .container .main__container').style.display =
    'block'
  document.querySelector(
    '.main .container .main__container'
  ).innerHTML = `<div class="card mono"></div>`
  current_index = 0
  data = shuffle_data(data)
  current = data[current_index]
  for (const elem of document.querySelectorAll('nav ul li')) {
    elem.classList.remove('selected')
  }
  document.getElementById('listen-btn').classList.add('selected')
  if (document.querySelector('#check:checked')) {
    document.querySelector('#check:checked').checked = false
  }
  listen_data(subject, current, current_index, data)
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
    fetch(`/api/${get_subject()}/list/${grade}`)
      .then((response) => response.json())
      .then((data) => {
        let html = '<option value=""></option>'
        for (const elem of data) {
          html += `<option value="${elem}">${elem.replaceAll(
            '_',
            ' '
          )}</option>`
        }
        html += '<option value="all">Alle</option>'
        topic_select.innerHTML = html
      })
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
    fetch(`/api/${get_subject()}/list/${grade}/${topic}`)
      .then((response) => response.json())
      .then((data) => {
        let html = '<option value=""></option>'
        for (const elem of data) {
          html += `<option value="${elem}">${elem.replaceAll(
            '_',
            ' '
          )}</option>`
        }
        html += '<option value="all">Alle</option>'
        lesson_select.innerHTML = html
      })
  }
  toggle_load_data_btn()
})

lesson_select.addEventListener('change', () => {
  toggle_load_data_btn()
})

// window.addEventListener('load', () => {
//     document.querySelector('div.excercises').style.display = 'none'
//     document.querySelector('div#main').style.display = 'none'
//     document.querySelector('div.panel').style.display = 'none'
//     fetch(`/api/list/all`)
//         .then(response => response.json())
//         .then(data => {
//             let html = '<option value=""></option>'
//             for (const elem of data) {
//                 html += `<option value="${elem}">${elem.replaceAll('_', ' ')}</option>`
//             }
//             html += '<option value="all">Alle</option>'
//             grade_select.innerHTML = html
//         });
// })

// toggle_load_data_btn()
// //document.getElementById('learn-btn').click()
document.getElementById('load-data-btn').addEventListener('click', () => {
  set_topics()
  init_page()
})

const get_subject = () => {
  return localStorage.getItem('subject')
}

const set_subject = (subject) => {
  return localStorage.setItem('subject', subject)
}

const get_topics = () => {
  subject = get_subject()
  return JSON.parse(localStorage.getItem('data-' + subject))
}

const set_topics = () => {
  console.log('setting topics ...')
  subject = get_subject()
  const v1 = grade_select.value
  if (v1 === 'all') {
    localStorage.setItem('data-' + subject, JSON.stringify([v1]))
  } else {
    const v2 = topic_select.value
    if (v2 === 'all') {
      localStorage.setItem('data-' + subject, JSON.stringify([v1, v2]))
    } else {
      const v3 = lesson_select.value
      localStorage.setItem('data-' + subject, JSON.stringify([v1, v2, v3]))
    }
  }
}

for (const subject_card of document.querySelectorAll(
  'section.subjects div.subject.card'
)) {
  subject_card.addEventListener('click', () => {
    const name = subject_card.querySelector(
      'div.subject-name input[type="hidden"]'
    ).value
    set_subject(name)
    init_page()
  })
}

document.querySelector('section.subjects').addEventListener('click', () => {
  if (get_subject()) {
    hide_subjects()
  }
})

document
  .getElementById('cancel-load-data-btn')
  .addEventListener('click', () => {
    const subject = get_subject()
    if (subject) {
      const topics = get_topics(subject)
      if (topics) {
        hide_topics()
      }
    }
  })

document
  .querySelector('section.menu span#subject')
  .addEventListener('click', () => {
    display_subjects()
  })

const hide_subjects = () => {
  document.querySelector('section.subjects').style.display = 'none'
  document.querySelector('section.subjects').style.zIndex = '-1'
}

const display_subjects = () => {
  document.querySelector('section.subjects').style.display = 'block'
  document.querySelector('section.subjects').style.zIndex = '1'
}

const hide_topics = () => {
  document.querySelector('section.topics').style.display = 'none'
  document.querySelector('section.topics').style.zIndex = '-1'
}

async function load_grades() {
  console.log('load_grades')
  const subject = get_subject()
  const response = await fetch(`/api/${subject}/list/`)
  return await response.json()
}

async function load_topics(grade) {
  console.log('load_topics')
  const subject = get_subject()
  const response = await fetch(`/api/${subject}/list/${grade}`)
  return await response.json()
}

async function load_lessons(grade, topic) {
  console.log('load_lessons')
  const subject = get_subject()
  const response = await fetch(`/api/${subject}/list/${grade}/${topic}`)
  return await response.json()
}

async function load_categories() {
  console.log('calling load_categories ...')
  const subject = get_subject()
  const topics = get_topics(subject)
  console.log('topics', topics)
  let json1 = await load_grades()
  let json2 = []
  let json3 = []
  if (topics && topics.length > 0 && topics[0] !== 'all') {
    json2 = await load_topics(topics[0])
    if (topics.length > 1 && topics[1] !== 'all') {
      json3 = await load_lessons(topics[0], topics[1])
    }
  }
  return [json1, json2, json3]
}

const display_topics = () => {
  subject = get_subject()
  topics = get_topics(subject)
  grade_select.value = ''
  topic_select.value = ''
  lesson_select.value = ''
  if (subject) {
    load_categories().then((res) => {
      let html = '<option value=""></option>'
      for (const elem of res[0]) {
        html += `<option value="${elem}">${elem.replaceAll('_', ' ')}</option>`
      }
      html += '<option value="all">Alle</option>'
      grade_select.innerHTML = html
      if (topics) {
        grade_select.value = topics[0]

        html = '<option value=""></option>'
        for (const elem of res[1]) {
          html += `<option value="${elem}">${elem.replaceAll(
            '_',
            ' '
          )}</option>`
        }
        html += '<option value="all">Alle</option>'
        topic_select.innerHTML = html
        if (topics.length > 1) {
          topic_select.value = topics[1]

          html = '<option value=""></option>'
          for (const elem of res[2]) {
            html += `<option value="${elem}">${elem.replaceAll(
              '_',
              ' '
            )}</option>`
          }
          html += '<option value="all">Alle</option>'
          lesson_select.innerHTML = html
          if (topics.length > 2) {
            lesson_select.value = topics[2]
          }
        }
      }

      if (grade_select.value !== '' && grade_select.value !== 'all') {
        topic_select.style.display = 'block'
        if (topic_select.value !== '' && topic_select.value !== 'all') {
          lesson_select.style.display = 'block'
        } else {
          lesson_select.style.display = 'none'
        }
      } else {
        topic_select.style.display = 'none'
        lesson_select.style.display = 'none'
      }
      toggle_load_data_btn()
      document.querySelector('section.topics').style.display = 'block'
      document.querySelector('section.topics').style.zIndex = '1'
    })
  }
}

const load_data = () => {
  subject = get_subject()
  if (!subject) {
    display_subjects()
    return
  }
  if (!topics) {
    display_topics()
    return
  }
  topics = get_topics(subject)
  let category = topics[0].replaceAll('_', ' ')

  const grade = topics[0]
  let topic = ''
  let lesson = ''
  let uri = `/api/${subject}/load/${grade}`
  if (grade !== 'all') {
    topic = topics[1]
    category += ' -> ' + topics[1].replaceAll('_', ' ')
    uri += `/${topic}`
    if (topic !== 'all') {
      lesson = topics[2]
      category += ' -> ' + topics[2].replaceAll('_', ' ')
      uri += `/${lesson}`
    }
  }
  fetch(uri)
    .then((response) => response.json())
    .then((json) => {
      data = json
      sentences = []
      for (const word of data) {
        if (word.sentences && word.sentences.length > 0) {
          sentences.push(word)
        }
      }
      if (sentences.length > 0) {
        document.getElementById('insert-btn').style.display = 'inline-block'
      } else {
        document.getElementById('insert-btn').style.display = 'none'
      }
      document.querySelector('.container > h4 > span.category').innerHTML =
        category
      current_index = 0
      learn_data(subject, current_index, learn_page_size, data)
      document.getElementById('learn-btn').click()
      hide_topics()
    })
}

const init_page = () => {
  subject = get_subject()
  console.log(subject)
  if (!subject) {
    display_subjects()
    return
  }
  console.log(document.querySelector('section.menu span#subject img'))
  document
    .querySelector('section.menu span#subject img')
    .setAttribute('src', `images/flag_${subject}.svg`)
  topics = get_topics()
  console.log('topics', topics)
  if (!topics) {
    display_topics()
  }
  console.log('Loading data ...')
  load_data()
}

window.addEventListener('load', () => {
  document
    .querySelector('.container > h4 > span.category-change')
    .addEventListener('click', () => {
      display_topics()
    })
  init_page()
})
