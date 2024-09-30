'use strict'

import { register, login } from '../../modules/Auth.js'

class AuthPopup {
    constructor() {
        this.overlay = document.createElement('div')
        this.overlay.classList.add('overlay')

        this.popup = document.createElement('form')
        this.popup.noValidate = true
        this.popup.method = 'POST'
        this.popup.onsubmit = (e) => this.onFormSubmit(e)
        this.currentState = 'auth'
        console.log(this.currentState)

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
                        maxLen: 50,
                    },
                    password: {
                        placeholder: 'Пароль',
                        type: 'password',
                        minLen: 6,
                        maxLen: 16,
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
                        maxLen: 50,
                    },
                    username: {
                        placeholder: 'Логин',
                        type: 'text',
                        minLen: 6,
                        maxLen: 20,
                    },
                    email: {
                        placeholder: 'Почта',
                        type: 'email',
                        minLen: 6,
                        maxLen: 40,
                    },
                    password: {
                        placeholder: 'Пароль',
                        type: 'password',
                        minLen: 6,
                        maxLen: 16,
                    },
                    passwordAgain: {
                        placeholder: 'Повторите пароль',
                        type: 'password',
                        minLen: 6,
                        maxLen: 16,
                    },
                },
                buttonText: 'Создать аккаунт',
                haveAccountText: 'Уже есть аккаунт?',
                haveAccountHrefText: 'Войти',
            },
        }

        this.render()
    }

    /**
     * @private
     * Рисует крест для закрытия поп-апа
     */
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

    /**
     * @private
     */
    renderImg() {
        const imgElement = document.createElement('img')
        imgElement.classList.add('auth-img')
        imgElement.src = '/images/name.png'
        this.popup.appendChild(imgElement)
    }

    /**
     * @private
     */
    renderMessage(message) {
        const messageContainer = document.createElement('div')
        messageContainer.classList.add('auth-message')
        messageContainer.textContent = message
        this.popup.appendChild(messageContainer)
    }

    /**
     * @private
     */
    renderInputs(inputs) {
        const inputContainer = document.createElement('div')
        inputContainer.classList.add('popup__div')
        Object.entries(inputs).forEach(
            ([name, { placeholder, type, minLen, maxLen }]) => {
                const inputValidation = document.createElement('div')
                inputValidation.classList.add('popup__inputValidation')
                const input = document.createElement('input')
                input.id = name
                input.name = name
                input.placeholder = placeholder
                input.type = type
                input.minLength = minLen
                input.maxLength = maxLen
                input.required = true

                const validationSign = document.createElement('a')
                validationSign.id = name + 'ValidationSign'
                const img = document.createElement('img')
                img.src = '/images/svg/exclamation.svg'
                img.width = 20

                validationSign.appendChild(img)
                validationSign.classList.add('none')
                validationSign.classList.add(
                    'popup__inputValidation__exclamation'
                )

                const validationMessage = document.createElement('div')
                validationMessage.id = name + 'ValidationMessage'
                validationMessage.classList.add(
                    'popup__inputValidation__validationMessage',
                    'none'
                )

                inputValidation.appendChild(input)
                inputValidation.appendChild(validationSign)
                inputValidation.appendChild(validationMessage)
                inputContainer.appendChild(inputValidation)
            }
        )
        this.popup.appendChild(inputContainer)
    }

    /**
     * @private
     */
    renderButton(text) {
        const loginButton = document.createElement('button')
        loginButton.classList.add('login-button')
        loginButton.textContent = text
        loginButton.addEventListener('click', () => {
            this.isAuthorized = true
        })
        this.popup.appendChild(loginButton)
    }

    /**
     * @private
     */
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

    /**
     * @private
     */
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

    /**
     * @private
     */
    _getMethod() {
        return this.currentState
    }

    /**
     * @public
     */
    getAuth() {
        return this.overlay
    }

    /**
     * @public
     */
    getAuthStatus() {
        return this.isAuthorized
    }

    /**
     * @private
     * @description Функция для валидации данных\
     * @returns boolean
     */
    validateData() {
        if (this.currentState === 'auth') {
            return this.validateAuthData()
        }
        return this.validateRegistrationData()
    }

    /**
     * @returns boolean
     */
    validateAuthData() {
        const usernameInput = document.getElementById('username')
        const passwordInput = document.getElementById('password')

        const usernameValidation = document.getElementById(
            'usernameValidationSign'
        )
        const passwordValidation = document.getElementById(
            'passwordValidationSign'
        )

        this.makeValidationMessage(
            usernameValidation,
            'usernameValidation',
            'Длина логина - от 6 до 20 символов'
        )
        this.makeValidationMessage(
            passwordValidation,
            'passwordValidation',
            'Длина пароля - от 6 до 16 символов'
        )

        const correctUsername = this.validateLength(
            usernameInput,
            usernameValidation
        )
        const correctPassword = this.validateLength(
            passwordInput,
            passwordValidation
        )
        return correctUsername && correctPassword
    }

    validateRegistrationData() {
        const nameInput = document.getElementById('name')
        const usernameInput = document.getElementById('username')
        const emailInput = document.getElementById('email')
        const passwordInput = document.getElementById('password')
        const passwordRepeatInput = document.getElementById('passwordAgain')

        const nameValidation = document.getElementById('nameValidationSign')
        const usernameValidation = document.getElementById(
            'usernameValidationSign'
        )
        const emailValidation = document.getElementById('emailValidationSign')
        const passwordValidation = document.getElementById(
            'passwordValidationSign'
        )
        const passwordRepeatValidation = document.getElementById(
            'passwordAgainValidationSign'
        )

        this.makeValidationMessage(
            nameValidation,
            'nameValidation',
            'Имя пользователя - от 6 до 50 символов'
        )
        this.makeValidationMessage(
            usernameValidation,
            'usernameValidation',
            'Длина логина - от 6 до 20 символов'
        )
        this.makeValidationMessage(
            emailValidation,
            'emailValidation',
            'Почта - от 6 до 40 символов'
        )
        this.makeValidationMessage(
            passwordValidation,
            'passwordValidation',
            'Пароль - от 6 до 16 символов'
        )
        this.makeValidationMessage(
            passwordRepeatValidation,
            'passwordRepeatValidation',
            'Пароль - от 6 до 16 символов'
        )

        const validName = this.validateLength(nameInput, nameValidation)
        const validUsername = this.validateLength(
            usernameInput,
            usernameValidation
        )
        const validEmail = this.validateLength(emailInput, emailValidation)
        const validPassword = this.validateLength(
            passwordInput,
            passwordValidation
        )
        const validPasswordRepeat = this.validateLength(
            passwordRepeatInput,
            passwordRepeatValidation
        )

        if (
            !(
                validName &&
                validUsername &&
                validEmail &&
                validPassword &&
                validPasswordRepeat
            )
        ) {
            return false
        }

        const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!emailRegexp.test(emailInput.value)) {
            emailInput.classList.add('popup__input__error')
            emailValidation.classList.remove('none')
            this.makeValidationMessage(
                emailValidation,
                'emailValidation',
                `Почта должна иметь формат admin@example.com `
            )
            return false
        }

        if (passwordInput.value !== passwordRepeatInput.value) {
            passwordInput.value = ''
            passwordRepeatInput.value = ''
            passwordInput.classList.add('popup__input__error')
            passwordRepeatInput.classList.add('popup__input__error')

            passwordValidation.classList.remove('none')

            this.makeValidationMessage(
                passwordValidation,
                'passwordValidation',
                'Пароли не совпадают'
            )
            return false
        }

        return true
    }

    /**
     * @private
     */
    onFormSubmit(e) {
        e.preventDefault()

        if (!this.validateData()) {
            return
        }

        const data = {}
        Array.from(e.target.elements).forEach((el) => {
            const { name, value } = el
            data[name] = value
        })

        if (this.currentState === 'signup') {
            // todo: validate data
            register({
                username: data['username'],
                password: data['password'],
                email: data['email'],
            })
                .then((res) => {
                    if (res.ok) location.reload()
                })
                .catch((err) => {
                    console.error(err)
                })
            return
        }

        login({
            username: data['username'],
            password: data['password'],
        })
            .then((r) => {
                if (r.ok) location.reload()
            })
            .catch((err) => {
                console.error(err)
            })
    }

    /**
     * @private
     */
    validateLength(input, exclamation) {
        if (
            input.value.length > input.maxLength ||
            input.value.length < input.minLength
        ) {
            input.classList.add('popup__input__error')
            exclamation.classList.remove('none')
            return false
        } else {
            input.classList.remove('popup__input__error')
            exclamation.classList.add('none')
            return true
        }
    }

    /**
     * @private
     */
    showPopup(validationContainer, message) {
        validationContainer.textContent = message
        validationContainer.classList.remove('none')
    }

    /**
     * @private
     */
    hidePopup(validationContainer) {
        validationContainer.replaceChildren()
        validationContainer.classList.add('none')
    }

    /**
     * @private
     */
    makeValidationMessage(nameOfValidation, id, message) {
        const validationMessage = document.getElementById(id + 'Message')
        nameOfValidation.addEventListener('mouseover', (_) =>
            this.showPopup(validationMessage, message)
        )
        nameOfValidation.addEventListener('mouseout', (_) =>
            this.hidePopup(validationMessage)
        )
    }
}

export default AuthPopup
