'use strict';

const root = document.getElementById('root');

const menuContainer = document.createElement('header');

const iconContainer = document.createElement('div');
const hrefs = document.createElement('div');
const nameContainer = document.createElement('div');
const signsContainer = document.createElement('div');
const buttonContainer = document.createElement('div');

iconContainer.classList.add('icon');
hrefs.classList.add('header-hrefs');
nameContainer.classList.add('name');
signsContainer.classList.add('signs');
buttonContainer.classList.add('entry-button');

menuContainer.appendChild(iconContainer);
menuContainer.appendChild(hrefs);
menuContainer.appendChild(nameContainer);
menuContainer.appendChild(signsContainer);
menuContainer.appendChild(buttonContainer);

root.appendChild(menuContainer);

const config = {
    menu: {
        Main : {
            'href': '/dashboard',
            'text': 'Главная',
        },
        Map : {
            'href': '/map',
            'text': 'Карта',
        },
        Articles : {
            'href': '/articles',
            'text': 'Статьи',
        }
    },

    signs: {
        Messages: {
            'src': './images/svg/messages.svg',
            'href': '/messages',
        },
        Favorites: {
            'src': './images/svg/favorites.svg',
            'href': '/favorites'
        },
        Notifications: {
            'src': './images/svg/notifications.svg',
            'href': '/notifications'
        }
    }
}

const headerState = {
    activePageLink: null,
    headerElements: {}
}

function renderIcon() {
    const imgElement = document.createElement('img');
    imgElement.src="./images/icon.jpg"
    imgElement.width = 100;
    imgElement.height = 100;
    iconContainer.appendChild(imgElement);
}

function renderMainText() {
    const imgElement = document.createElement('img');
    imgElement.src = './images/name.png';
    imgElement.width = 200;
    imgElement.height = 60;
    nameContainer.appendChild(imgElement);
}

function renderHrefs() {
    Object.entries(config.menu).forEach(([key, {href, text}], index)=>{
        const menuElement = document.createElement('a');
        menuElement.href = href;
        menuElement.text = text;
        menuElement.classList.add('hrefs')

        if (index === 0) {
            menuElement.classList.add('active-href');
            headerState.activePageLink = menuElement;
        }

        headerState.headerElements[key] = menuElement;
        hrefs.appendChild(menuElement);
    });
}

function renderSigns() {
    Object.entries(config.signs).forEach(([_, {href, src}])=>{
        const signElement = document.createElement('a');
        signElement.href = href;
        signElement.innerHTML = `<img src="${src}" width="30" height="30">`;

        signsContainer.appendChild(signElement);
    })
}

function renderButton() {
    const button = document.createElement('button');
    button.textContent = "Войти!";
    buttonContainer.appendChild(button);
}

function renderHeader() {
    renderIcon();
    renderHrefs();
    renderMainText();
    renderSigns();
    renderButton();
}

renderHeader();