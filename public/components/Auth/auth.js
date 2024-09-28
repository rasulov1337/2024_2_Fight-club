'use strict';

class Auth {
    constructor() {
        this.loginPage = document.createElement('div');
        this.loginPage.classList.add('popup');

        this.render();
    }

    renderCross() {
        const crossContainer = document.createElement('div');
        const cross = document.createElement('a');
        crossContainer.classList.add('close-cross');
        cross.innerHTML = `<img src="./images/svg/cross.svg" width="30px" height="30px">`
        crossContainer.appendChild(cross);
        cross.addEventListener('click', (e)=>{
            e.preventDefault = '';
            this.loginPage.classList.add('hide-div');
        })
        this.loginPage.appendChild(crossContainer);
    }

    renderImg() {
        const imgElement = document.createElement('img');
        imgElement.classList.add('auth-img');
        imgElement.src = './images/name.png';
        imgElement.height = 200;
        imgElement.height = 60;
        this.loginPage.appendChild(imgElement);
    }

    renderMessage() {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('auth-message')
        messageContainer.textContent = "Войти в аккаунт";
        this.loginPage.appendChild(messageContainer);
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
        this.loginPage.appendChild(inputContainer);
    }

    renderButton() {
        const loginButton = document.createElement('button');
        loginButton.classList.add('login-button');
        loginButton.textContent = "Войти";
        this.loginPage.appendChild(loginButton);
    }

    renderHaveAccount() {
        const haveAccount = document.createElement('div');
        haveAccount.classList.add('have-account');
        const haveAccountText = document.createElement('p');
        haveAccountText.textContent = "Еще нет аккаунта?";
        const haveAccountHref = document.createElement('a');
        haveAccountHref.href = "#";
        haveAccountHref.textContent = "Создать"
        haveAccount.appendChild(haveAccountText);
        haveAccount.appendChild(haveAccountHref);
        this.loginPage.appendChild(haveAccount);
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
        return this.loginPage;
    }
}

export default Auth;