'use strict';

import {Header} from "./components/header.js";

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

function loadMainPage() {}
function loadMapPage() {}
function loadArticlesPage() {}
function loadMessagesPage() {}
function loadFavoritesPage() {}
function loadNotificationsPage() {}
function loadSignInPage() {}

const header = new Header(headerCallbacks);
root.appendChild(header.getMainContainer());

const mainPhotoContainer = document.createElement('div')
function renderMainPoto(mainPhotoContainer) {
    const hostsHrefs = document.createElement('div');
    const findHost = document.createElement('a');
    const beHost = document.createElement('a');
    const searchCityForm = document.createElement('form');
    const searchButtonDiv = document.createElement('div');
    const search = document.createElement('input')
    const findButton = document.createElement('button');

    findHost.text = "Найти хоста";
    beHost.text = "Стать хостом";
    findHost.href = '#';
    beHost.href = '#';
    searchCityForm.action = "#";
    search.placeholder = "Search location";

    searchButtonDiv.classList.add('custom-search');
    mainPhotoContainer.classList.add('photo-container');
    hostsHrefs.classList.add('hosts')
    searchCityForm.classList.add('search-container');

    hostsHrefs.appendChild(findHost);
    hostsHrefs.appendChild(beHost);
    mainPhotoContainer.appendChild(hostsHrefs);
    searchButtonDiv.appendChild(search);
    searchButtonDiv.appendChild(findButton);
    searchCityForm.appendChild(searchButtonDiv);
    mainPhotoContainer.appendChild(searchCityForm);
}

renderMainPoto(mainPhotoContainer);
root.appendChild(mainPhotoContainer);