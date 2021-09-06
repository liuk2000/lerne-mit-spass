const learn_data = (current_page, page_size, data) => {
    let html = '<tr><th class="german">de</th><th class="english">en</th></tr>'
    for (let i = current_page * page_size; i < current_page * page_size + page_size && i < data.length; i++) {
        current = data[i]
        html += `<tr>
            <td class="german">${current.german}</td>
            <td class="english">${current.english}</td>
        </tr>`
    }
    document.querySelector('table.table').innerHTML = html
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