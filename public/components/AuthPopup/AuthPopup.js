'use strict'

import { register, login } from '../../modules/Auth.js'

class AuthPopup {
    constructor() {
        this.overlay = document.createElement('div')
        this.overlay.classList.add('overlay')

        this.popup = document.createElement('form')
        this.popup.noValidate = true;
        this.popup.method = 'POST'
        this.popup.onsubmit = this.onFormSubmit

        this.popup.classList.add('popup')
        this.popup.addEventListener('submit', (e)=>{
            e.preventDefault();
            let longerThen6 = this.checkLongerThan(6);

            if (this.currentState === 'auth'){
                const loginInput = document.getElementById('login');
                const passwordInput = document.getElementById('password');

                const loginValidation = document.getElementById('loginValidationSign');
                const passwordValidation = document.getElementById('passwordValidationSign');

                this.makeValidationMessage(loginValidation, "loginValidation", "Минимальная длина логина - 6 символов");
                this.makeValidationMessage(passwordValidation, "passwordValidation", "Минимальная длина пароля - 6 символов");

                if (!longerThen6(loginInput, loginValidation)) return;
                if (!longerThen6(passwordInput, passwordValidation)) return;

            } else {
                const nameInput = document.getElementById('name');
                const loginInput = document.getElementById('login');
                const passwordInput = document.getElementById('password');
                const passwordRepeatInput = document.getElementById('password2');

                const nameValidation = document.getElementById('nameValidationSign');
                const loginValidation = document.getElementById('loginValidationSign');
                const passwordValidation = document.getElementById('passwordValidationSign');
                const passwordRepeatValidation = document.getElementById('password2ValidationSign');

                this.makeValidationMessage(nameValidation, "nameValidation", "Минимальная длина имени - 6 символов");
                this.makeValidationMessage(loginValidation, "loginValidation", "Минимальная длина логина - 6 символов");
                this.makeValidationMessage(passwordValidation, "passwordValidation", "Минимальная длина пароля - 6 символов");
                this.makeValidationMessage(passwordRepeatValidation, "passwordRepeatValidation", "Минимальная длина пароля - 6 символов");
                
                if (!longerThen6(nameInput, nameValidation)) return;
                if (!longerThen6(loginInput, loginValidation)) return;
                if (!longerThen6(passwordInput, passwordValidation)) return;
                if (!longerThen6(passwordRepeatInput, passwordRepeatValidation)) return;

                if (passwordInput.value !== passwordRepeatInput.value) {
                    console.log(passwordInput);
                    console.log(passwordRepeatInput);
                    passwordInput.value = "";
                    passwordRepeatInput.value = "";
                    passwordInput.classList.add('popup__input__error');
                    passwordRepeatInput.classList.add('popup__input__error');

                    passwordValidation.classList.remove('none');

                    this.makeValidationMessage(passwordValidation, "passwordValidation", "Пароли не совпадают");
                    return;
                }
            }

            this.popup.submit();
        })
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
                        maxLen: 20,
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
                    password2: {
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
        Object.entries(inputs).forEach(([name, {placeholder, type, minLen}]) => {
            const inputValidation = document.createElement('div');
            inputValidation.classList.add('popup__inputValidation');
            const input = document.createElement('input')
            input.id = name;
            input.name = name
            input.placeholder = placeholder
            input.type = type;
            input.minLength = minLen;
            input.required = true;

            const validationSigh = document.createElement('a');
            validationSigh.id = name + 'ValidationSign';
            validationSigh.innerHTML = `<img src="/images/svg/exclamation.svg" width="20px" height="20px">`;
            validationSigh.classList.add('none')
            validationSigh.classList.add('popup__inputValidation__exclamation');

            const validationMessage = document.createElement('div');
            validationMessage.id = name + 'ValidationMessage';
            validationMessage.classList.add('popup__inputValidation__validationMessage');

            inputValidation.appendChild(input);
            inputValidation.appendChild(validationSigh);
            inputValidation.appendChild(validationMessage);
            this.popup.appendChild(inputValidation);
        })
    }

    renderButton(text) {
        const loginButton = document.createElement('button')
        loginButton.classList.add('login-button')
        loginButton.textContent = text
        loginButton.addEventListener('click', () => {
            this.isAuthorized = true;
        });
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

        if (this.currentState === 'signup') {
            // todo: validate data
            register({
                username: data['username'],
                password: data['password'],
                email: data['email'],
            }).then((res) => {
                if (res.ok) location.reload()
            })
            return
        }

        login({
            username: data['username'],
            password: data['password'],
        }).then((r) => {
            if (r.ok) location.reload()
        })
    }

    checkLongerThan(len) {
        return function(input, exclamation) {
            if (input.value.length < len) {
                input.classList.add('popup__input__error');
                exclamation.classList.remove('none');
                return false;
            } else {
                input.classList.remove('popup__input__error');
                exclamation.classList.add('none');
                return true;
            }
        }
    }

    showPopup(validationContainer, message) {
        validationContainer.innerHTML = `<p>${message}</p>`
        validationContainer.classList.remove('none');
    }

    hidePopup(validationContainer) {
        validationContainer.innerHTML = '';
        validationContainer.classList.add('none');
    }

    makeValidationMessage(nameOfValidation, id, message) {
        const validationMessage = document.getElementById(id + 'Message');
        nameOfValidation.addEventListener('mouseover', _ => this.showPopup(validationMessage, message));
        nameOfValidation.addEventListener('mouseout', _ => this.hidePopup(validationMessage));
    }
}

export default AuthPopup
