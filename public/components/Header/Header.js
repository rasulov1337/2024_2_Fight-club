'use strict'

class Header {
    constructor(headerCallbacks, isAuth) {
        this.headerCallbacks = headerCallbacks
        this.menuContainer = document.createElement('header')
        this.menuContainer.classList.add('header')

        this.isAuthorized = isAuth;

        this.config = {
            menu: {
                Main: {
                    href: '/dashboard',
                    text: 'Главная',
                    callback: headerCallbacks.mainPage,
                },
                Map: {
                    href: '/map',
                    text: 'Карта',
                    callback: headerCallbacks.mapPage,
                },
                Articles: {
                    href: '/articles',
                    text: 'Статьи',
                    callback: headerCallbacks.articlesPage,
                },
            },

            signs: {
                Messages: {
                    src: './images/svg/messages.svg',
                    href: '/messages',
                    callback: headerCallbacks.messagesPage,
                },
                Favorites: {
                    src: './images/svg/favorites.svg',
                    href: '/favorites',
                    callback: headerCallbacks.favoritesPage,
                },
                Notifications: {
                    src: './images/svg/notifications.svg',
                    href: '/notifications',
                    callback: headerCallbacks.notificationsPage,
                },
            },
        }

        this.headerState = {
            activePageLink: null,
            headerElements: {},
        }

        this.render()
    }

    renderIcon() {
        const logoImg = document.createElement('img')
        logoImg.src = './images/icon.jpg'
        logoImg.classList.add('header__img1')
        this.menuContainer.appendChild(logoImg)
    }

    renderMainText() {
        const nameImg = document.createElement('img')
        nameImg.classList.add('header__img2')
        nameImg.src = './images/name.png'
        this.menuContainer.appendChild(nameImg)
    }

    renderHrefs() {
        const hrefs = document.createElement('div')
        hrefs.classList.add('header__hrefs')
        Object.entries(this.config.menu).forEach(
            ([key, { href, text, callback }], index) => {
                const menuElement = document.createElement('a')
                menuElement.href = href
                menuElement.text = text
                menuElement.addEventListener('click', (e) => {
                    e.preventDefault()
                    callback()
                })
                menuElement.classList.add('header__hrefs__href')

                if (index === 0) {
                    menuElement.classList.add('header__hrefs__href_active')
                    this.headerState.activePageLink = menuElement
                }

                this.headerState.headerElements[key] = menuElement
                hrefs.appendChild(menuElement)
            }
        )
        this.menuContainer.appendChild(hrefs)
    }

    renderSigns() {
        const signsContainer = document.createElement('div')
        signsContainer.classList.add('header__signs')
        Object.entries(this.config.signs).forEach(
            ([_, { href, src, callback }]) => {
                const signElement = document.createElement('a')
                signElement.href = href
                const img = document.createElement('img')
                img.src = src
                img.width = 30
                signElement.appendChild(img)
                signElement.addEventListener('click', (e) => {
                    e.preventDefault()
                    callback()
                })

                signsContainer.appendChild(signElement)
            }
        )
        this.menuContainer.appendChild(signsContainer)
    }

    renderButtonOrAvatar() {
        if (this.isAuthorized) {
            const avatarContainer = document.createElement('div');
            avatarContainer.classList.add('header__avatar-container');
            const avatar = document.createElement('img');
            avatar.src = "/images/default_user_icon.png"
            avatar.width = 50;
            avatar.height = 50;
            avatarContainer.appendChild(avatar);
            this.menuContainer.appendChild(avatarContainer);

        } else {
            const entryButton = document.createElement('button')
            entryButton.classList.add('header__button')
            entryButton.textContent = 'Войти!'
            entryButton.addEventListener(
                'click',
                this.headerCallbacks.signInPage
            )
            this.menuContainer.appendChild(entryButton)
        }
    }

    render() {
        this.renderIcon()
        this.renderHrefs()
        this.renderMainText()
        this.renderSigns()
        this.renderButtonOrAvatar()
    }

    getMainContainer() {
        return this.menuContainer
    }
}

export default Header
