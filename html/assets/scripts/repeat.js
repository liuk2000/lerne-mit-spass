const repeat_data = (subject, current, current_index, data) => {
    document.querySelector('.main__grid').innerHTML = ''
    document.querySelector(`div > div.${subject}`).innerHTML = `<span class="play">
        <i class="fa fa-play-circle"></i>
    </span>
    <strong></strong>`
    document.querySelector('.main .container .main__container .card .german strong').innerHTML = current.german
    document.querySelector(`.main .container .main__container .card .${subject} strong`).innerHTML = current[subject]
    
    if (current.audio) {
        document.querySelector('span.play').classList.remove('invisible')
        document.querySelector('.main__container div.audio').innerHTML = `<audio controls=""><source src="${subject}/ogg/${current.audio}" type="audio/ogg">
            Your browser does not support the audio element.</audio>`
        document.querySelector('.main__container span.play').addEventListener('click', () => {
            document.querySelector('div.audio > audio').play()
        })
    } else {
        document.querySelector('span.play').classList.add('invisible')
    }
    // if (current.audio) {
    //     document.getElementById('audio').innerHTML = `<audio controls>
    //         <source src="ogg/${current.audio}" type="audio/ogg">
    //     Your browser does not support the audio element.
    //     </audio>`
    // } else {
    //     document.getElementById('audio').innerHTML = ''
    // }
    document.querySelector('.main .container .stats').innerHTML = `${+current_index + 1} von ${data.length}`
    if (current.picture) {
        document.getElementById('picture').innerHTML = `<img class="picture" src="images/${current.picture}" alt="">`
    } else {
        document.getElementById('picture').innerHTML = ''
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

module.exports = { repeat_data }