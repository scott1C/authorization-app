export class Question {
    static create(question) {
        return fetch('https://authorization-app-88153-default-rtdb.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                question.id = data.name
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }
    static renderList() {
        const questions = getQuestionsFromLocalStorage()
        const html = questions.length
            ? questions.map(toCard).join('')
            : `<div class="mui--text-headline">You have not entered something, yet</div>`
        const list = document.getElementById('list')
        list.innerHTML = html
    }

    static fetch(token) {
        if (!token) {
            return Promise.resolve('<p class="error">You do not have a token</p>') // if you log in with the incorrect password
        }
        return fetch(`https://authorization-app-88153-default-rtdb.firebaseio.com/questions.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if (response && response.error) {
                    return `<p class="error">${response.error}</p>` // if are some errors from the server, for example, the link is incorrect
                }
                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : []
            })
    }

    static listToHTML(questions) {
        return questions.length
            ? `<ol>${questions.map(question => `<li>${question.text}</li>`).join('')}</ol>`
            : '<p>There are not any questions, yet</p>'
    }
}

function addToLocalStorage(question) {
    const all = getQuestionsFromLocalStorage()
    all.push(question)
    localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
    if (!question) {
        return ''
    }

    return `
        <div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
        </div>
        ${question.text}
        <br>
        <br>
    `
}