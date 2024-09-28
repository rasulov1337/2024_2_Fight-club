'use strict';

import Header from "./components/Header/Header.js";
import Filter from "./components/Filter/Filter.js";
import AdCard from "./components/AdCard/AdCard.js";


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
}


//mainPhotoContainer предлагаю тоже в отдельную компоненту вынести
const mainPhotoContainer = document.createElement('div')

function renderMainPhoto(mainPhotoContainer) {
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
    findButton.innerHTML += "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "<path d=\"M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z\" stroke=\"#808080\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n" +
        "</svg>\n"

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


window.onload = () => {
    const root = document.getElementById('root');

    const header = new Header(headerCallbacks);
    root.appendChild(header.getMainContainer());

    renderMainPhoto(mainPhotoContainer);
    root.appendChild(mainPhotoContainer);
    loadMainPage()
}