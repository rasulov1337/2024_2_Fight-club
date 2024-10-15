'use strict';

import Header from './components/Header/Header';
import AuthPopup from './components/AuthPopup/AuthPopup';
import ProfilePopup from './components/ProfilePopup/ProfilePopup';

import MainPage from './components/MainPage/MainPage';
import ProfilePage from './components/ProfilePage/ProfilePage';

import Ajax from './modules/Ajax';
import {clearPage} from './modules/Clear';

import './components/precompiled-templates';

import { BACKEND_URL } from './modules/Consts';

const root = document.getElementById('root')!;
const pageContainer = document.createElement('div');

/** Объект с коллбеками для header`а */
const headerCallbacks = {
    mainPage: renderMainPage,
    mapPage: renderMapPage,
    articlesPage: renderArticlesPage,
    messagesPage: renderMessagesPage,
    favoritesPage: renderFavoritesPage,
    notificationsPage: renderNotificationsPage,
    signInPage: renderSignInPage,
    profileList: renderProfileList,
};

/** Объект с коллбеками для попапа профиля */
const profilePopupCallbacks = {
    profilePage: renderProfilePage,
    donatePage: null,
}

function renderMainPage() {
    const mainPage = new MainPage(pageContainer);
    mainPage.render();
}

function renderMapPage() {}

function renderArticlesPage() {}

function renderMessagesPage() {}

function renderFavoritesPage() {}

function renderNotificationsPage() {}

function renderSignInPage() {
    const auth = new AuthPopup();
    auth.render(root);
}

function renderProfileList() {
    const profileList = new ProfilePopup(profilePopupCallbacks);
    profileList.render(root);
}

function renderProfilePage() {
    clearPage('main-photo', 'main-content');
    const profilePage = new ProfilePage();
    profilePage.render(pageContainer);
}

/** Главная функция */
const main = async () => {
    const response = await Ajax.get(BACKEND_URL + '/getSessionData');
    let isAuthorized = false;
    if (response.ok) {
        isAuthorized = true;
        const sessionInfo = await response.json();
    } else if (response.status !== 401) {
        console.error('Wrong response from server', response);
    }

    const header = new Header(headerCallbacks, isAuthorized);
    root.appendChild(header.getMainContainer());

    pageContainer.classList.add('page-container');
    root.appendChild(pageContainer);

    renderMainPage();
};

main();
