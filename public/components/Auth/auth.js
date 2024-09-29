'use strict';

class Auth {
    constructor() {
        this.overlay = document.createElement('div');
        this.overlay.classList.add('overlay');

        this.popup = document.createElement('form');
        this.popup.classList.add('popup');
        this.overlay.appendChild(this.popup);

        document.body.classList.add('no-scroll');

        this.currentState = 'auth';
        this.config = {
            'auth': {
                message: "Войти в аккаунт",
                inputs: {
                    "login": "Логин (почта)",
                    "password": "Пароль",
                },
                buttonText: "Войти",
                haveAccountText: "Еще нет аккаунта?",
                haveAccountHrefText: "Создать" 
            },

            'signup': {
                message: "Зарегистрироваться",
                inputs: {
                    "name": "Полное имя",
                    "login": "Почта",
                    "password": "Пароль",
                    "password2": "Повторите пароль",
                },
                buttonText: "Создать аккаунт",
                haveAccountText: "Уже есть аккаунт?",
                haveAccountHrefText: "Войти" 
            }
        }

        this.render();
    }

    renderCross() {
        const crossContainer = document.createElement('div');
        const cross = document.createElement('a');
        crossContainer.classList.add('close-cross');
        cross.innerHTML = `<img src="./images/svg/cross.svg" width="30px" height="30px">`
        crossContainer.appendChild(cross);
        cross.addEventListener('click', (e) => {
            e.preventDefault();
            this.overlay.remove()
            document.body.classList.remove('no-scroll')
        })
        this.popup.appendChild(crossContainer);
    }

    renderImg() {
        const imgElement = document.createElement('img');
        imgElement.classList.add('auth-img');
        imgElement.src = './images/name.png';
        imgElement.height = 200;
        imgElement.height = 60;
        this.popup.appendChild(imgElement);
    }

    renderMessage(message) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('auth-message')
        messageContainer.textContent = message;
        this.popup.appendChild(messageContainer);
    }

    renderInputs(inputs) {
        Object.entries(inputs).forEach(([name, placeholderText])=>{
            const input = document.createElement('input');
            input.classList.add('inputs');
            input.name = name;
            input.placeholder = placeholderText;
            this.popup.appendChild(input);
        })
    }

    renderButton(text) {
        const loginButton = document.createElement('button');
        loginButton.classList.add('login-button');
        loginButton.textContent = text;
        this.popup.appendChild(loginButton);
    }

    renderHaveAccount(text, hrefText) {
        const haveAccount = document.createElement('div');
        haveAccount.classList.add('have-account');

        const haveAccountText = document.createElement('p');
        haveAccountText.textContent = text;

        const haveAccountHref = document.createElement('a');
        haveAccountHref.classList.add('bold');
        haveAccountHref.textContent = hrefText;
        haveAccountHref.addEventListener('click', (e)=>{
            e.preventDefault();
            if (this.currentState === 'auth'){
                this.currentState = 'signup';
            } else {
                this.currentState = 'auth';
            }

            this.popup.innerHTML = '';
            this.render();
        });

        haveAccount.appendChild(haveAccountText);
        haveAccount.appendChild(haveAccountHref);

        this.popup.appendChild(haveAccount);
    }


    render() {
        const method = this._getMethod();
        const config = this.config[method];
        console.log(config);

        this.renderCross();
        this.renderImg();
        this.renderMessage(config.message);
        this.renderInputs(config.inputs);
        this.renderButton(config.buttonText);
        this.renderHaveAccount(config.haveAccountText, config.haveAccountHrefText);
    }

    _getMethod(){
        return this.currentState;
    }

    getAuth() {
        return this.overlay;
    }
}

export default Auth;