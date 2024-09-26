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

const header = new Header(headerCallbacks);
root.appendChild(header.getMainContainer());


function loadMainPage() {
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

}