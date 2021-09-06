const type_data = (current, current_index, data) => {
    document.getElementById('word').innerHTML = `<h3>Schreibe das Wort auf Englisch</h3>
    <h2 id="german"></h2>
    <input id="hidden-text" type="hidden">
    <input id="typed-text" type="text" class="english">
    <button id="check">
        <span>Check</span>
        <span class="inline-result"></span>
    </button>`

    document.getElementById('check').addEventListener('click', () => {
        const word = document.getElementById('hidden-text').value
        const typed_text = document.getElementById('typed-text').value
        console.log(word, typed_text)
        btn = document.getElementById('check')

        if (word.toLowerCase() === typed_text.toLowerCase()) {
            btn.classList = ['correct']
            btn.querySelector('.inline-result').innerHTML = `<i class="fa fa-thumbs-up"></i>`
        } else {
            if (current.alternatives) {
                for (const _alternative of current.alternatives) {
                    if (_alternative.toLowerCase() === typed_text.toLowerCase()) {
                        btn.classList = ['correct']
                        btn.querySelector('.inline-result').innerHTML = `<i class="fa fa-thumbs-up"></i>`
                        break
                    }
                }
            } else {
                btn.classList = ['wrong']
                btn.querySelector('.inline-result').innerHTML = `<i class="fa fa-frown-o"></i>`
            }
        }
    })

    document.getElementById('german').innerHTML = current.german
    document.getElementById('hidden-text').value = current.english

    for (const elem of document.querySelectorAll('button.excercises')) {
        elem.classList.remove('active')
    }
    document.getElementById('type-btn').classList.add('active')

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

module.exports = { type_data }