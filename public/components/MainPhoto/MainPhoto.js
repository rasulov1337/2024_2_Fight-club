'use strict';

class MainPhoto {
    constructor() {
        this.mainPhotoContainer = document.createElement('div');
        this.mainPhotoContainer.classList.add('photo-container');

        this.render();
    }

    render() {
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
        hostsHrefs.classList.add('hosts')
        searchCityForm.classList.add('search-container');

        hostsHrefs.appendChild(findHost);
        hostsHrefs.appendChild(beHost);
        this.mainPhotoContainer.appendChild(hostsHrefs);

        searchButtonDiv.appendChild(search);
        searchButtonDiv.appendChild(findButton);
        searchCityForm.appendChild(searchButtonDiv);
        this.mainPhotoContainer.appendChild(searchCityForm);
    }

    getMainPhoto() {
        return this.mainPhotoContainer;
    }
}

export default MainPhoto;