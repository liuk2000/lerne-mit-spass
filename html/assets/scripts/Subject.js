class Subject {
    constructor() {
        this.items = []
    }

}

class SubjectItem {
    constructor(subject, image) {
        this.subject = subject
        this.image = image
    }
}

class Vocabulary extends SubjectItem {
    
    get_menu = () => {
        const html = `<nav>
            <input type="checkbox" id="check">
            <label for="check" class="bars">
                <i class="fa fa-bars"></i>
            </label>
            <label class="logo"><span id="item">Vokabeln</span></label>
            <ul>
                <li id="learn-btn"><a>Lerne</a></li>
                <li id="repeat-btn"><a>Widerhole</a></li>
                <li id="find-btn"><a>Ordne zu</a></li>
                <li id="type-btn"><a>Schreibe</a></li>
                <li id="listen-btn"><a>Höre zu</a></li>
            </ul>
            <span id="subject">
                <img src="images/${self.image}">
            </span>
        </nav>`
        return html
    }

    learn_data = (current_page, page_size, data) => {
        let html = ''
        for (let i = current_page * page_size; i < current_page * page_size + page_size && i < data.length; i++) {
            current = data[i]
            html += `<div class="card">
                <div class="german">
                    <strong>${current.german}</strong>
                </div>
                <div class="${self.subject}">
                    <span class="play${current.audio ? '' : ' invisible'}" num="${i}">
                        <i class="fa fa-play-circle"></i>
                    </span>
                    <strong>${current[self.subject]}</strong>
                </div>
                <div class="audio invisible">
                    <audio num="${i}" controls="">
                        <source src="${self.subject}/ogg/${current.audio}" type="audio/ogg">
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

    repeat_data = (current, current_index, data) => {
        document.querySelector('.main__grid').innerHTML = ''
        document.querySelector(`div > div.${self.subject}`).innerHTML = `<span class="play">
            <i class="fa fa-play-circle"></i>
        </span>
        <strong></strong>`
        document.querySelector('.main .container .main__container .card .german strong').innerHTML = current.german
        document.querySelector(`.main .container .main__container .card .${self.subject} strong`).innerHTML = current[self.subject]
        
        if (current.audio) {
            document.querySelector('span.play').classList.remove('invisible')
            document.querySelector('.main__container div.audio').innerHTML = `<audio controls=""><source src="${self.subject}/ogg/${current.audio}" type="audio/ogg">
                Your browser does not support the audio element.</audio>`
            document.querySelector('.main__container span.play').addEventListener('click', () => {
                document.querySelector('div.audio > audio').play()
            })
        } else {
            document.querySelector('span.play').classList.add('invisible')
        }

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

    find_data = (current, current_index, data) => {
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
            _html += `<div class="card"><h3><span class="random-word">${elem[self.subject]}</span><span class="inline-result"></span></h3>
            </div>`
        }
        document.querySelector('.main .container .stats').innerHTML = `${+current_index + 1} von ${data.length}`
        document.getElementById('words').innerHTML = _html
        for (const elem of document.querySelectorAll('.random-word')) {
            const div = elem.parentElement.parentElement
            div.addEventListener('click', () => {
                div.classList.add('clicked')
                if (current[self.subject] === elem.innerHTML) {
                    div.classList.add('correct')
                    elem.nextSibling.innerHTML = `<i class="fa fa-thumbs-up"></i>`
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

}

class Verbs extends SubjectItem {

}

class Grammar extends SubjectItem {

}

export { Subject, Vocabulary, Verbs, Grammar }