const repeat_data = (current, current_index, data) => {
    document.getElementById('german').innerHTML = current.german
    document.getElementById('english').innerHTML = current.english
    if (current.audio) {
        document.getElementById('audio').innerHTML = `<audio controls>
            <source src="ogg/${current.audio}" type="audio/ogg">
        Your browser does not support the audio element.
        </audio>`
    } else {
        document.getElementById('audio').innerHTML = ''
    }
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