'use strict';

import Header from "./components/Header/Header.js";
import Filter from "./components/Filter/Filter.js";
import AdCard from "./components/AdCard/AdCard.js";
import Auth from "./components/Auth/auth.js";
import MainPhoto from "./components/MainPhoto/MainPhoto.js";

const root = document.getElementById('root');

const AD_CARDS = [
    {
        locationMain: 'Россия, г. Москва',
        locationStreet: 'Малая Ботаническая ул., 10А',
        position: null,
        pictures: ['images/1.webp', 'images/2.webp', 'images/3.webp'],
        onMap: undefined,  // ??? What should be here?
        author: {
            name: 'Leo D.',
            score: 4.98,
            avatar: ''
        },
    }
]

const headerCallbacks = {
    mainPage: loadMainPage,
    mapPage: loadMapPage,
    articlesPage: loadArticlesPage,
    messagesPage: loadMessagesPage,
    favoritesPage: loadFavoritesPage,
    notificationsPage: loadNotificationsPage,
    signInPage: loadSignInPage,
}

function loadMainPage() {
    //Контент главной страницы
    const pageContent = document.createElement('div');
    pageContent.id = 'main-content';

    //Фильтр
    const filter = new Filter();
    pageContent.appendChild(filter.getFilter());

    //Здесь будет витрина
    const addShowcaseContent = document.createElement('div');
    addShowcaseContent.classList.add('advert');
    const adCard = new AdCard(AD_CARDS[0], addShowcaseContent);
    adCard.render()
    pageContent.appendChild(addShowcaseContent);

    root.appendChild(pageContent);
}

function loadMapPage() {
}

function loadArticlesPage() {
}

function loadMessagesPage() {
}

function loadFavoritesPage() {
}

function loadNotificationsPage() {
}

function loadSignInPage() {
    const auth = new Auth();
    root.appendChild(auth.getAuth());
}

const header = new Header(headerCallbacks);
root.appendChild(header.getMainContainer());

const mainPhotoContainer = new MainPhoto();
root.appendChild(mainPhotoContainer.getMainPhoto());

loadMainPage();