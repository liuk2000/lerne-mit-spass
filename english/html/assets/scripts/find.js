const find_data = (current, current_index, data) => {
    let shuffledArray = []
    if (data.length < 8) {
        shuffledArray = data.slice().sort((a, b) => 0.5 - Math.random())
    } else {
        if (current_index >= 8) {
            shuffledArray = data.slice(current_index - 7, +current_index + 1)
        } else {
            shuffledArray = data.slice(0, 8)
        }
        shuffledArray = shuffledArray.slice().sort((a, b) => 0.5 - Math.random())
    }
    document.getElementById('word').innerHTML = `<h2>${current.german}</h2>`
    let _html = ''
    for (const elem of shuffledArray) {
        _html += `<div class="card"><h3><span class="random-word">${elem.english}</span><span class="inline-result"></span></h3>
        </div>`
    }
    document.getElementById('words').innerHTML = _html
    for (const elem of document.querySelectorAll('.random-word')) {
        const div = elem.parentElement.parentElement
        div.addEventListener('click', () => {
            div.classList.add('clicked')
            if (current.english === elem.innerHTML) {
                div.classList.add('correct')
                elem.nextSibling.innerHTML = `<i class="fa fa-thumbs-up"></i>`
                for (const _elem of document.querySelectorAll('div.card')) {
                    if (!_elem.classList.contains('clicked')) {
                        _elem.style.display = 'none'
                    }
                }
            } else {
                div.classList.add('wrong')
                elem.nextSibling.innerHTML = `<i class="fa fa-frown-o"></i>`
            }
        })
    }

    for (const elem of document.querySelectorAll('button.excercises')) {
        elem.classList.remove('active')
    }
    document.getElementById('find-btn').classList.add('active')

    if (current_index > 0) {
        document.getElementById('prev-btn').removeAttribute('disabled')
    } else {
        document.getElementById('prev-btn').setAttribute('disabled', 'disabled')
    }
    if (current_index < data.length - 1) {
        document.getElementById('next-btn').removeAttribute('disabled')
    } else {
        document.getElementById('next-btn').setAttribute('disabled', 'disabled')
    }
}

module.exports = { find_data }