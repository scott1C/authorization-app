import { isValid, createModal } from "./utils"
import { Question } from "./question"
import { authWithEmailAndPassword, getAuthForm } from "./auth"

const form = document.getElementById('form')
const modalButton = document.getElementById('modal-btn')
const input = document.querySelector('#question-input')
const submitBtn = document.querySelector('#submit')

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler)
modalButton.addEventListener('click', openModal)
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(e) {
    e.preventDefault()
    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        Question.create(question).then(() => {
            input.value = ''
            input.className = ''
            submitBtn.disabled = true
        })
    }
}

function authFormHandler(e) {
    e.preventDefault()
    const loginButton = e.target.querySelector('button')
    const email = e.target.querySelector('#email').value
    const password = e.target.querySelector('#password').value
    loginButton.disabled = true
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(() => loginButton.disabled = false)
}

function renderModalAfterAuth(content) {
    if (typeof content === 'string') {
        createModal('Error!', content) // if you log in with the incorrect password
    } else {
        createModal('List of the questions: ', Question.listToHTML(content))
    }
}

function openModal() {
    createModal('Authorization', getAuthForm())
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, { once: true })
}