'use strict'

import { register, login } from '../../modules/Auth.js'

class AuthPopup {
    constructor() {
        this.overlay = document.createElement('div')
        this.overlay.classList.add('overlay')

        this.popup = document.createElement('form')
        this.popup.method = 'POST'
        this.popup.onsubmit = this.onFormSubmit
        this.popup.classList.add('popup')
        this.overlay.appendChild(this.popup)

        this.isAuthorized = false

        document.body.classList.add('no-scroll')

        this.currentState = 'auth'
        this.config = {
            auth: {
                message: 'Войти в аккаунт',
                inputs: {
                    username: {
                        placeholder: 'Логин',
                        type: 'text',
                        minLen: 6,
                    },
                    password: {
                        placeholder: 'Пароль',
                        type: 'password',
                        minLen: 6,
                    },
                },
                buttonText: 'Войти',
                haveAccountText: 'Еще нет аккаунта?',
                haveAccountHrefText: 'Создать',
            },

            signup: {
                message: 'Зарегистрироваться',
                inputs: {
                    name: {
                        placeholder: 'Полное имя',
                        type: 'text',
                        minLen: 6,
                    },
                    username: {
                        placeholder: 'Логин',
                        type: 'text',
                        minLen: 6,
                    },
                    email: {
                        placeholder: 'Почта',
                        type: 'email',
                        minLen: 6,
                    },
                    password: {
                        placeholder: 'Пароль',
                        type: 'password',
                        minLen: 6,
                    },
                    password2: {
                        placeholder: 'Повторите пароль',
                        type: 'password',
                        minLen: 6,
                    },
                },
                buttonText: 'Создать аккаунт',
                haveAccountText: 'Уже есть аккаунт?',
                haveAccountHrefText: 'Войти',
            },
        }

        this.render()
    }

    renderCross() {
        const crossContainer = document.createElement('div')
        const cross = document.createElement('a')
        crossContainer.classList.add('close-cross')
        const crossImg = document.createElement('img')
        crossImg.src = '/images/svg/cross.svg'
        crossImg.width = 30
        cross.appendChild(crossImg)
        crossContainer.appendChild(cross)
        cross.addEventListener('click', (e) => {
            e.preventDefault()
            this.overlay.remove()
            document.body.classList.remove('no-scroll')
        })
        this.popup.appendChild(crossContainer)
    }

    renderImg() {
        const imgElement = document.createElement('img')
        imgElement.classList.add('auth-img')
        imgElement.src = '/images/name.png'
        this.popup.appendChild(imgElement)
    }

    renderMessage(message) {
        const messageContainer = document.createElement('div')
        messageContainer.classList.add('auth-message')
        messageContainer.textContent = message
        this.popup.appendChild(messageContainer)
    }

    renderInputs(inputs) {
        Object.entries(inputs).forEach(
            ([name, { placeholder, type, minLen }]) => {
                const input = document.createElement('input')
                input.classList.add('inputs')
                input.name = name
                input.placeholder = placeholder
                input.type = type
                input.minLength = minLen
                this.popup.appendChild(input)
            }
        )
    }

    renderButton(text) {
        const loginButton = document.createElement('button')
        loginButton.classList.add('login-button')
        loginButton.textContent = text
        loginButton.addEventListener('click', () => {
            this.isAuthorized = true
            console.log(this.isAuthorized)
        })
        this.popup.appendChild(loginButton)
    }

    renderHaveAccount(text, hrefText) {
        const haveAccount = document.createElement('div')
        haveAccount.classList.add('have-account')

        const haveAccountText = document.createElement('p')
        haveAccountText.textContent = text

        const haveAccountHref = document.createElement('a')
        haveAccountHref.classList.add('bold')
        haveAccountHref.textContent = hrefText
        haveAccountHref.addEventListener('click', (e) => {
            e.preventDefault()
            if (this.currentState === 'auth') {
                this.currentState = 'signup'
            } else {
                this.currentState = 'auth'
            }

            this.popup.replaceChildren()
            this.render()
        })

        haveAccount.appendChild(haveAccountText)
        haveAccount.appendChild(haveAccountHref)

        this.popup.appendChild(haveAccount)
    }

    render() {
        const method = this._getMethod()
        const config = this.config[method]

        this.renderCross()
        this.renderImg()
        this.renderMessage(config.message)
        this.renderInputs(config.inputs)
        this.renderButton(config.buttonText)
        this.renderHaveAccount(
            config.haveAccountText,
            config.haveAccountHrefText
        )
    }

    _getMethod() {
        return this.currentState
    }

    getAuth() {
        return this.overlay
    }

    getAuthStatus() {
        return this.isAuthorized
    }

    onFormSubmit(e) {
        e.preventDefault()

        const data = {}
        Array.from(e.target.elements).forEach((el) => {
            const { name, value } = el
            data[name] = value
        })
        console.log(data)

        // todo: validate data
        register({
            username: data['username'],
            password: data['password'],
            email: data['email'],
        }).then(() => {
            // todo: on success
            location.reload()
        })
    }
}

export default AuthPopup
