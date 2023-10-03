const insert_data = (subject, current, current_index, data) => {
  document.querySelector('.main__grid').innerHTML = ''
  document.querySelector('.main__container .card').innerHTML = `<div>
        <div>Setze das richtige Wort an Stelle von Sternchen ein</div>
        <div class="sentence"><strong></strong></div>
        <div class="input">
            <input id="typed-text" type="text" class="form-control">
            <input id="hidden-text" type="hidden">
            <button id="check-typed" class="big button"><i class="fa fa-check-circle"></i></button>
            <button id="help" class="big button"><i class="fa fa-question-circle"></i></button>
        </div>

    </div>`

  let content = ''
  let hidden_text = data[current_index][subject]
  for (const part of data[current_index].sentences[0]) {
    if (part.startsWith('***')) {
      content += '*** '
      if (part.length > 3) {
        hidden_text = part.replaceAll('*', '')
      }
    } else {
      content += part + ' '
    }
  }
  document.querySelector('.main__container .card .sentence strong').innerHTML =
    content
  document.getElementById('hidden-text').value = hidden_text
  document.getElementById('typed-text').value = ''
  btn = document.getElementById('check-typed')
  btn.classList.remove('correct')
  btn.classList.remove('wrong')
  document.querySelector('.main .container .stats').innerHTML = `${
    +current_index + 1
  } von ${data.length}`

  document.getElementById('check-typed').addEventListener('click', () => {
    const word = document.getElementById('hidden-text').value
    const typed_text = document.getElementById('typed-text').value
    btn = document.getElementById('check-typed')

    if (word.toLowerCase() === typed_text.toLowerCase()) {
      btn.classList.remove('wrong')
      btn.classList.add('correct')
    } else {
      if (current.alternatives) {
        for (const _alternative of current.alternatives) {
          if (_alternative.toLowerCase() === typed_text.toLowerCase()) {
            btn.classList.remove('wrong')
            btn.classList.add('correct')
            break
          }
        }
      } else {
        btn.classList.remove('correct')
        btn.classList.add('wrong')
      }
    }
  })

  document.getElementById('help').addEventListener('click', () => {
    const typed_text = document.getElementById('typed-text').value
    document.getElementById('typed-text').value = hidden_text
    setTimeout(() => {
      document.getElementById('typed-text').value = typed_text
    }, 200)
  })

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

module.exports = { insert_data }
