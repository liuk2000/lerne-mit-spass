const learn_data = (subject, current_page, page_size, data) => {
    let html = ''
    for (let i = current_page * page_size; i < current_page * page_size + page_size && i < data.length; i++) {
        current = data[i]
        html += `<div class="card">
            <div class="german">
                <strong>${current.german}</strong>
            </div>
            <div class="${subject}">
                <span class="play${current.audio ? '' : ' invisible'}" num="${i}">
                    <i class="fa fa-play-circle"></i>
                </span>
                <strong>${current[subject]}</strong>
            </div>
            <div class="audio invisible">
                <audio num="${i}" controls="">
                    <source src="${subject}/ogg/${current.audio}" type="audio/ogg">
                Your browser does not support the audio element.
                </audio>
            </div>
        </div>`
    }
    document.querySelector('.main .container .main__grid').innerHTML = html

    for (const span of document.querySelectorAll('span.play[num]')) {
        span.addEventListener('click', () => {
            const i = span.getAttribute('num')
            document.querySelector(`audio[num="${i}"]`).play()
        })
    }

    document.querySelector('.main .container .stats').innerHTML = `${current_page * page_size + 1} - ${Math.min(current_page * page_size + page_size, data.length)} von ${data.length}`
    if (current_page > 0) {
        document.getElementById('prev-btn').removeAttribute('disabled')
    } else {
        document.getElementById('prev-btn').setAttribute('disabled', 'disabled')
    }
    if (current_page < (data.length - page_size) / page_size) {
        document.getElementById('next-btn').removeAttribute('disabled')
    } else {
        document.getElementById('next-btn').setAttribute('disabled', 'disabled')
    }
}

module.exports = { learn_data }