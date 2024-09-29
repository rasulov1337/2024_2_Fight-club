'use strict'

import Header from './components/Header/Header.js'
import AuthPopup from './components/AuthPopup/AuthPopup.js'
import MainPage from './components/MainPage/MainPage.js'
import Ajax from './modules/Ajax.js'

const root = document.getElementById('root')
const pageContainer = document.createElement('div')

/** Объект с коллбеками для header`а */
const headerCallbacks = {
    mainPage: renderMainPage,
    mapPage: renderMapPage,
    articlesPage: renderArticlesPage,
    messagesPage: renderMessagesPage,
    favoritesPage: renderFavoritesPage,
    notificationsPage: renderNotificationsPage,
    signInPage: renderSignInPage,
}

function renderMainPage() {
    const mainPage = new MainPage(pageContainer)
    mainPage.render()
}

function renderMapPage() {}

function renderArticlesPage() {}

function renderMessagesPage() {}

function renderFavoritesPage() {}

function renderNotificationsPage() {}

function renderSignInPage() {
    const auth = new AuthPopup()
    root.appendChild(auth.getAuth())
}

/** Главная функция */
;(async () => {
    const response = await Ajax.get('http://localhost:8080/api/getSessionData')
    let isAuthorized = true
    if (!response.ok) {
        console.log('not ok')
        isAuthorized = false
    } else {
        const sessionInfo = await response.json()
    }

    const header = new Header(headerCallbacks, isAuthorized)
    root.appendChild(header.getMainContainer())

    pageContainer.classList.add('page-container')
    root.appendChild(pageContainer)

    renderMainPage()
})()
