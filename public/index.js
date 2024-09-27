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

function loadMainPage() {
    // Let's render a card
    console.log('I was called!')
    const card = document.createElement('div');
    card.innerHTML = `
    <div class="ad-card">
        <div class="ad-images-container">
            <img src="images/ad-card-img.png" alt="Ad card image">
        </div>
            <div class="image-pagination-div">
                    <!-- Здесь будут кружочки -->
                    <div class="circle-full"></div>
                    <div class="circle-empty"></div>
                    <div class="circle-empty"></div>
                    <div class="circle-empty"></div>
                </div>
        
        <button  class="fav-btn">
            <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g style="mix-blend-mode:multiply" filter="url(#filter0_d_181_2)">
            <circle cx="21.5" cy="17.5" r="17.5" fill="#9D9999"/>
            </g>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M22 13.0001C20.5005 11.2526 17.9948 10.7126 16.116 12.3128C14.2372 13.913 13.9727 16.5884 15.4481 18.481C16.6749 20.0545 20.3873 23.3732 21.6041 24.4474C21.7402 24.5676 21.8082 24.6276 21.8877 24.6512C21.9569 24.6718 22.0327 24.6718 22.1021 24.6512C22.1815 24.6276 22.2495 24.5676 22.3857 24.4474C23.6024 23.3732 27.3148 20.0545 28.5416 18.481C30.017 16.5884 29.7848 13.8961 27.8737 12.3128C25.9626 10.7294 23.4995 11.2526 22 13.0001Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
            <filter id="filter0_d_181_2" x="0" y="0" width="43" height="43" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_181_2"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_181_2" result="shape"/>
            </filter>
            </defs>
            </svg>
        </button>
        
        <div class="ad-card-info">
            <div class="location">
                <p class="location-city-country">Россия, г. Москва</p>
                <p class="location-street">Малая Ботаническая ул., 10А</p>
                <a href="" class="show-on-map-btn">Показать на карте</a>
            </div>
            <div class="ad-author-info">
                <img src="images/di-caprio.png" alt="User avatar">
                <p>Leo D.</p>
                <div class="score-container">
                    <img class="star-img" src="images/star.png" alt="star">
                    <span class="score">4.98</span>
                </div>
            </div>
        </div>
    </div>`

    root.appendChild(card);

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

const header = new Header(headerCallbacks);
root.appendChild(header.getMainContainer());

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

renderMainPhoto(mainPhotoContainer);
root.appendChild(mainPhotoContainer);

loadMainPage()