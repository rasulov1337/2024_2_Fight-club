'use strict';

import ProfileInfo from '../ProfileInfo/ProfileInfo';
import {profile} from '../../modules/Profile';

class ProfilePage{   
    #name: string | undefined;
    #username: string | undefined;
    #city: string | undefined;
    #address: string | undefined;
    #email: string | undefined;
    #guestCount: number | undefined;
    #score: number | undefined;
    #sex: string | undefined;
    #isHost: boolean | undefined;
    #age: number | undefined;
    #avatar: string | undefined;
    
    constructor() {}

    /**
     * @private
     * @description Получение данных с бэка и заполнение полей класса
     */
    async #getProfileData() {
        const response = await profile();
        if (response.ok) {
            const data = await response.json();
            this.#name = data.Name;
            this.#username = data.Username;
            this.#email = data.Email;
            this.#guestCount = data.GuestCount;
            this.#score = data.Score;
            this.#isHost = data.IsHost;
            this.#avatar = data.Avatar;

            this.#sex = this.#calculateSex(data.Sex);
            this.#age = this.#calculateAge(data.Birthdate);

            const splitedAddress = this.#splitAddress(data.Address);
            this.#city = splitedAddress.city;
            this.#address = splitedAddress.address;
        } else if (response.status !== 401) {
            console.error('Wrong response from server', response);
        }
    }

    /**
     * @private
     * @param {string} birthdate
     * @returns {number} 
     */
    #calculateAge(birthdate: string) {
        //TODO
        return 10;
    }

    /**
     * @private
     * @param {number} sex
     * @returns {string} 
     */
    #calculateSex(sex: number) {
        if (sex === 0) return 'Не указано';
        else if (sex === 1) return 'Муж.';
        else return 'Жен.';
    }

    /**
     * @private
     * @description Деление полного адреса на город и адрес
     * @param {string} longAddress
     * @returns {Object} 
     */
    #splitAddress(longAddress: string){
        const parts = longAddress.split(',');
        const city = parts.slice(0, 2).join(', ').trim();
        const address = parts.slice(2).join(', ').trim();
        return {
            city: city,
            address: address,
        };
    }

    /**
     * @private
     * @description Рендер левой колонки с данными
     * @param {HTMLElement} parent
     */
    async #renderProfileInfo(parent: HTMLElement) {
        await this.#getProfileData();
        const profileData = {
            name: this.#name,
            username: this.#username,
            city: this.#city,
            address: this.#address,
            email: this.#email,
            guestCount: this.#guestCount,
            score: this.#score,
            sex: this.#sex,
            isHost: this.#isHost,
            age: this.#age,
            avatar: this.#avatar,
        };
        console.log(profileData);
        const profileInfo = new ProfileInfo(profileData);
        profileInfo.render(parent);
    }
   
    
    /**
     * @description Рендер всех элементов
     * @param {HTMLElement} parent
     */
    render(parent: HTMLElement) {
        const profileContent = document.createElement('div');
        profileContent.id = 'profile-content';

        const profileContainer = document.createElement('div');
        profileContainer.id = 'profile-container';
        profileContainer.classList.add('profile__profile-container');
        this.#renderProfileInfo(profileContainer);

        const dataContainer = document.createElement('div');
        dataContainer.id = 'data-container';
        dataContainer.classList.add('profile__data-container');

        profileContent.appendChild(profileContainer);
        profileContent.appendChild(dataContainer);

        parent.appendChild(profileContent);
    }
}

export default ProfilePage;