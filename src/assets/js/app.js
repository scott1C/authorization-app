import { isValid } from "./utils"
import { Question } from "./question"

const form = document.getElementById('form')
const input = document.querySelector('#question-input')
const submitBtn = document.querySelector('#submit')

form.addEventListener('submit', submitFormHandler)
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

        // Async request to server for saving the question
        Question.create(question).then(() => {
            input.value = ''
            input.className = ''
            submitBtn.disabled = true
        })
    }
}
