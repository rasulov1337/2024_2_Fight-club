'use strict'

class Header {
    constructor(headerCallbacks) {
        this.headerCallbacks = headerCallbacks
        this.menuContainer = document.createElement('header')
        this.menuContainer.classList.add('header')

        this.logoImg = document.createElement('img')
        this.hrefs = document.createElement('div')
        this.nameImg = document.createElement('img')
        this.signsContainer = document.createElement('div')
        this.entryButton = document.createElement('button')

        this.logoImg.classList.add('header__img1')
        this.hrefs.classList.add('header__hrefs')
        this.nameImg.classList.add('header__img2')
        this.signsContainer.classList.add('header__signs')
        this.entryButton.classList.add('header__button')

        this.menuContainer.appendChild(this.logoImg)
        this.menuContainer.appendChild(this.hrefs)
        this.menuContainer.appendChild(this.nameImg)
        this.menuContainer.appendChild(this.signsContainer)
        this.menuContainer.appendChild(this.entryButton)

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
        this.logoImg.src = './images/icon.jpg'
    }

    renderMainText() {
        this.nameImg.src = './images/name.png'
    }

    renderHrefs() {
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
                this.hrefs.appendChild(menuElement)
            }
        )
    }

    renderSigns() {
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

                this.signsContainer.appendChild(signElement)
            }
        )
    }

    renderButton() {
        this.entryButton.textContent = 'Войти!'
        this.entryButton.addEventListener(
            'click',
            this.headerCallbacks.signInPage
        )
    }

    render() {
        this.renderIcon()
        this.renderHrefs()
        this.renderMainText()
        this.renderSigns()
        this.renderButton()
    }

    getMainContainer() {
        return this.menuContainer
    }
}

export default Header
