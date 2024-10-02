'use strict'

import Validation from '../../modules/Validation.js'

import { login, register } from '../../modules/Auth.js'

class AuthPopup {
    #config
    #currentState

    constructor() {
        this.overlay = document.createElement('div')
        this.overlay.classList.add('overlay')

        this.form = document.createElement('form')
        this.form.noValidate = true
        this.form.method = 'POST'
        this.form.onsubmit = (e) => this.#onFormSubmit(e)
        this.#currentState = 'auth'

        this.form.classList.add('popup')
        this.overlay.appendChild(this.form)

        document.body.classList.add('no-scroll')

        this.#currentState = 'auth'
        this.#config = {
            auth: {
                message: 'Войти в аккаунт',
                inputs: {
                    username: {
                        placeholder: 'Логин',
                        type: 'text',
                        minLen: 5,
                        maxLen: 20,
                    },
                    password: {
                        placeholder: 'Пароль',
                        type: 'password',
                        minLen: 8,
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
                        minLen: 5,
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
                        minLen: 3,
                        maxLen: 40,
                    },
                    password: {
                        placeholder: 'Пароль',
                        type: 'password',
                        minLen: 8,
                        maxLen: 16,
                    },
                    passwordRepeat: {
                        placeholder: 'Повторите пароль',
                        type: 'password',
                        minLen: 8,
                        maxLen: 16,
                    },
                },
                buttonText: 'Создать аккаунт',
                haveAccountText: 'Уже есть аккаунт?',
                haveAccountHrefText: 'Войти',
            },
        }

        this.#render()
    }

    /**
     * @private
     * Рисует крест для закрытия поп-апа
     */
    #renderCross() {
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
        this.form.appendChild(crossContainer)
    }

    /**
     * @private
     */
    #renderImg() {
        const imgElement = document.createElement('img')
        imgElement.classList.add('auth-img')
        imgElement.src = '/images/name.png'
        this.form.appendChild(imgElement)
    }

    /**
     * @private
     */
    #renderMessage(message) {
        const messageContainer = document.createElement('div')
        messageContainer.classList.add('auth-message')
        messageContainer.textContent = message
        this.form.appendChild(messageContainer)
    }

    /**
     * @private
     */
    #renderInputs(inputs) {
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
        this.form.appendChild(inputContainer)
    }

    /**
     * @private
     */
    #renderButton(text) {
        const loginButton = document.createElement('button')
        loginButton.classList.add('login-button')
        loginButton.textContent = text
        this.form.appendChild(loginButton)
    }

    /**
     * @private
     */
    #renderHaveAccount(text, hrefText) {
        const haveAccount = document.createElement('div')
        haveAccount.classList.add('have-account')

        const haveAccountText = document.createElement('p')
        haveAccountText.textContent = text

        const haveAccountHref = document.createElement('a')
        haveAccountHref.classList.add('bold')
        haveAccountHref.textContent = hrefText
        haveAccountHref.addEventListener('click', (e) => {
            e.preventDefault()

            if (this.#currentState === 'auth') {
                this.#currentState = 'signup'
            } else {
                this.#currentState = 'auth'
            }

            this.form.replaceChildren()
            this.#render()
        })

        haveAccount.appendChild(haveAccountText)
        haveAccount.appendChild(haveAccountHref)

        this.form.appendChild(haveAccount)
    }

    /**
     * @private
     */
    #render() {
        const method = this.#getMethod()
        const config = this.#config[method]

        this.#renderCross()
        this.#renderImg()
        this.#renderMessage(config.message)
        this.#renderFailureMessage()
        this.#renderInputs(config.inputs)
        this.#renderButton(config.buttonText)
        this.#renderHaveAccount(
            config.haveAccountText,
            config.haveAccountHrefText
        )
    }

    /**
     * @private
     */
    #getMethod() {
        return this.#currentState
    }

    /**
     * @public
     */
    getAuth() {
        return this.overlay
    }

    /**
     * @private
     * @description Функция для валидации данных\
     * @returns boolean
     */
    #validateData() {
        if (this.#currentState === 'auth') {
            return this.#validateAuthData()
        }
        return this.#validateRegistrationData()
    }

    /**
     * @returns boolean
     */
    #validateAuthData() {
        const usernameInput = document.getElementById('username')
        const passwordInput = document.getElementById('password')

        const usernameValidation = document.getElementById(
            'usernameValidationSign'
        )
        const passwordValidation = document.getElementById(
            'passwordValidationSign'
        )

        const usernameValidationInfo =
            Validation.validateUsername(usernameInput)

        if (!usernameValidationInfo.ok) {
            this.showErrorMessage(
                usernameInput,
                usernameValidation,
                'usernameValidation',
                usernameValidationInfo.text
            )
        } else {
            this.hideErrorMsg(usernameInput, usernameValidation)
        }

        const passwordValidationInfo =
            Validation.validatePassword(passwordInput)
        if (!passwordValidationInfo.ok) {
            this.showErrorMessage(
                passwordInput,
                passwordValidation,
                'passwordValidation',
                passwordValidationInfo.text
            )
        } else {
            this.hideErrorMsg(passwordInput, passwordValidation)
        }

        return usernameValidationInfo.ok && passwordValidationInfo.ok
    }

    #validateRegistrationData() {
        const nameInput = document.getElementById('name')
        const usernameInput = document.getElementById('username')
        const emailInput = document.getElementById('email')
        const passwordInput = document.getElementById('password')
        const passwordRepeatInput = document.getElementById('passwordRepeat')

        const nameValidation = document.getElementById('nameValidationSign')
        const usernameValidation = document.getElementById(
            'usernameValidationSign'
        )
        const emailValidation = document.getElementById('emailValidationSign')
        const passwordValidation = document.getElementById(
            'passwordValidationSign'
        )
        const passwordRepeatValidation = document.getElementById(
            'passwordRepeatValidationSign'
        )

        const nameValidInfo = Validation.validateName(nameInput)
        const usernameValidInfo = Validation.validateUsername(usernameInput)
        const emailValidInfo = Validation.validateEmail(emailInput)
        const passwordValidInfo = Validation.validatePassword(passwordInput)
        const passwordRepeatValidInfo =
            Validation.validatePassword(passwordRepeatInput)
        const passwordsValidInfo = Validation.validatePasswords(
            passwordInput,
            passwordRepeatInput
        )

        if (!nameValidInfo.ok) {
            this.showErrorMessage(
                nameInput,
                nameValidation,
                'nameValidation',
                nameValidInfo.text
            )
        } else {
            this.hideErrorMsg(nameInput, nameValidation)
        }

        if (!usernameValidInfo.ok) {
            this.showErrorMessage(
                usernameInput,
                usernameValidation,
                'usernameValidation',
                usernameValidInfo.text
            )
        } else {
            this.hideErrorMsg(usernameInput, usernameValidation)
        }

        if (!emailValidInfo.ok) {
            this.showErrorMessage(
                emailInput,
                emailValidation,
                'emailValidation',
                emailValidInfo.text
            )
        } else {
            this.hideErrorMsg(emailInput, emailValidation)
        }

        if (!passwordValidInfo.ok) {
            this.showErrorMessage(
                passwordInput,
                passwordValidation,
                'passwordValidation',
                passwordValidInfo.text
            )
        } else {
            this.hideErrorMsg(passwordInput, passwordValidation)
        }

        if (!passwordRepeatValidInfo.ok) {
            this.showErrorMessage(
                passwordRepeatInput,
                passwordRepeatValidation,
                'passwordRepeatValidation',
                passwordRepeatValidInfo.text
            )
        } else {
            if (!passwordsValidInfo.ok) {
                this.showErrorMessage(
                    passwordRepeatInput,
                    passwordRepeatValidation,
                    'passwordRepeatValidation',
                    passwordsValidInfo.text
                )
            } else {
                this.hideErrorMsg(passwordRepeatInput, passwordRepeatValidation)
            }
        }

        return (
            nameValidInfo.ok &&
            usernameValidInfo.ok &&
            emailValidInfo.ok &&
            passwordValidInfo.ok &&
            passwordRepeatValidInfo.ok &&
            passwordsValidInfo.ok
        )
    }

    showErrorMessage(inputElem, signElement, id, errorMsg) {
        inputElem.classList.add('popup__input__error')
        signElement.classList.remove('none')
        this.#makeValidationMessage(signElement, id, errorMsg)
    }

    hideErrorMsg(inputElem, signElem) {
        inputElem.classList.remove('popup__input__error')
        signElem.classList.add('none')
    }

    /**
     * @private
     */
    async #onFormSubmit(e) {
        e.preventDefault()

        if (!this.#validateData()) {
            return
        }

        const data = {}
        Array.from(e.target.elements).forEach((el) => {
            const { name, value } = el
            data[name] = value
        })

        if (this.#currentState === 'signup') {
            try {
                const res = await register({
                    name: data['name'],
                    username: data['username'],
                    password: data['password'],
                    email: data['email'],
                })

                if (res.ok) location.reload()
                else if (res.status === 409)
                    this.#setFailureMessage('Такой аккаунт уже создан!')
                else this.#setFailureMessage('Неизвестная ошибка на сервере')
            } catch (err) {
                this.#setFailureMessage('Неизвестная ошибка: ' + err.message)
            }
            return
        }

        login({
            username: data['username'],
            password: data['password'],
        })
            .then((r) => {
                if (r.ok) location.reload()
                else {
                    this.#setFailureMessage('Неверный логин или пароль!')
                }
            })
            .catch((err) => {
                this.#setFailureMessage('Неизвестная ошибка: ' + err.message)
            })
    }

    /**
     * @private
     */
    #showPopup(validationContainer, message) {
        validationContainer.textContent = message
        validationContainer.classList.remove('none')
    }

    /**
     * @private
     */
    #hidePopup(validationContainer) {
        validationContainer.replaceChildren()
        validationContainer.classList.add('none')
    }

    /**
     * @param  nameOfValidation
     * @param {string} id
     * @param {string} message
     * @private
     */
    #makeValidationMessage(nameOfValidation, id, message) {
        const validationMessage = document.getElementById(id + 'Message')
        nameOfValidation.addEventListener('mouseover', () => {
            this.#showPopup(validationMessage, message)
        })
        nameOfValidation.addEventListener('mouseout', () =>
            this.#hidePopup(validationMessage)
        )
    }

    /**
     * @private
     */
    #renderFailureMessage() {
        this.failureMessage = document.createElement('div')
        this.failureMessage.classList.add('popup__failure-message', 'none')
        this.failureMessage.textContent = 'Неверный логин или пароль'
        this.form.appendChild(this.failureMessage)
    }

    /**
     * @private
     * @param {string} message
     */
    #setFailureMessage(message) {
        if (message === null) {
            this.failureMessage.classList.add('none')
        }
        this.failureMessage.classList.remove('none')
        this.failureMessage.textContent = message
    }
}

export default AuthPopup
