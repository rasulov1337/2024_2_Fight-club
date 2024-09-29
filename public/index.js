'use strict';

import Header from "./components/Header/Header.js";
import Filter from "./components/Filter/Filter.js";
import AdCard from "./components/AdCard/AdCard.js";
import Auth from "./components/Auth/auth.js";
import MainPhoto from "./components/MainPhoto/MainPhoto.js";

const root = document.getElementById('root');

const headerCallbacks = {
    mainPage: loadMainPage,
    mapPage: loadMapPage,
    articlesPage: loadArticlesPage,
    messagesPage: loadMessagesPage,
    favoritesPage: loadFavoritesPage,
    notificationsPage: loadNotificationsPage,
    signInPage: loadSignInPage,
}

async function loadMainPage() {
    //Контент главной страницы
    const pageContent = document.createElement('div');
    pageContent.id = 'main-content';

    //Фильтр
    const filter = new Filter();
    pageContent.appendChild(filter.getFilter());

    //Здесь будет витрина
    const adsContainer = document.createElement('div');
    adsContainer.classList.add('advert');

    const res = await fetch('http://localhost:8080/api/ads')
    let data = await res.json();
    data = data['places']
    for (const [_, d] of Object.entries(data)) {
        const card = new AdCard(d, adsContainer);
        card.render()
    }
    pageContent.appendChild(adsContainer);

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

await loadMainPage();