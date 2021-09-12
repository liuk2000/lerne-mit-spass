const find_data = (subject, current, current_index, data) => {
    document.querySelector('.main__grid').innerHTML = ''
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
    document.querySelector('.main .container .main__container .german strong').innerHTML = current.german
    let _html = ''
    for (const elem of shuffledArray) {
        _html += `<div class="card"><h3><span class="random-word">${elem[subject]}</span><span class="inline-result"></span></h3>
        </div>`
    }
    document.querySelector('.main .container .stats').innerHTML = `${+current_index + 1} von ${data.length}`
    document.getElementById('words').innerHTML = _html
    for (const elem of document.querySelectorAll('.random-word')) {
        const div = elem.parentElement.parentElement
        div.addEventListener('click', () => {
            div.classList.add('clicked')
            if (current[subject] === elem.innerHTML) {
                div.classList.add('correct')
                elem.nextSibling.innerHTML = `<i class="fa fa-thumbs-up"></i>`
                // for (const _elem of document.querySelectorAll('div.card')) {
                //     if (!_elem.classList.contains('clicked')) {
                //         _elem.style.display = 'none'
                //     }
                // }
            } else {
                div.classList.add('wrong')
                elem.nextSibling.innerHTML = `<i class="fa fa-frown-o"></i>`
            }
        })
    }

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