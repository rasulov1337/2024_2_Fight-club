'use strict';

class Auth {
    constructor() {
        this.overlay = document.createElement('div');
        this.overlay.classList.add('overlay');

        this.popup = document.createElement('div');
        this.popup.classList.add('popup');
        this.overlay.appendChild(this.popup);

        document.body.classList.add('no-scroll')

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

    renderMessage() {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('auth-message')
        messageContainer.textContent = "Войти в аккаунт";
        this.popup.appendChild(messageContainer);
    }

    renderInputs() {
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');

        const loginInput = document.createElement('input');
        loginInput.placeholder = "Логин (почта)";
        const passwordInput = document.createElement('input');
        passwordInput.placeholder = "Пароль";

        inputContainer.appendChild(loginInput);
        inputContainer.appendChild(passwordInput);
        this.popup.appendChild(inputContainer);
    }

    renderButton() {
        const loginButton = document.createElement('button');
        loginButton.classList.add('login-button');
        loginButton.textContent = "Войти";
        this.popup.appendChild(loginButton);
    }

    renderHaveAccount() {
        const haveAccount = document.createElement('div');
        haveAccount.classList.add('have-account');
        const haveAccountText = document.createElement('p');
        haveAccountText.textContent = "Еще нет аккаунта?";
        const haveAccountHref = document.createElement('a');
        haveAccountHref.href = "#";
        haveAccountHref.textContent = "Создать"
        haveAccountHref.classList.add('bold');
        haveAccount.appendChild(haveAccountText);
        haveAccount.appendChild(haveAccountHref);
        this.popup.appendChild(haveAccount);
    }


    render() {
        this.renderCross();
        this.renderImg();
        this.renderMessage();
        this.renderInputs();
        this.renderButton();
        this.renderHaveAccount();
    }

    getAuth() {
        return this.overlay;
    }
}

export default Auth;