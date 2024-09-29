import Filter from '../Filter/Filter.js'
import AdCard from '../AdCard/AdCard.js'
import MainPhoto from '../MainPhoto/MainPhoto.js'

/** Главная страница с витриной объявлений, поиском и фильтрами */
class MainPage {
    constructor(root) {
        this.root = root

        this.mainPhotoContainer = new MainPhoto()

        this.pageContent = document.createElement('div')
        this.pageContent.id = 'main-content'

        // Фильтр
        const filter = new Filter()
        this.pageContent.appendChild(filter.getFilter())

        // Здесь будет витрина
        this.adsContainer = document.createElement('div')
        this.adsContainer.classList.add('advert')
    }

    render() {
        fetch(BACKEND_URL + '/ads')
            .then((res) => res.json())
            .then((data) => {
                data = data['places']
                for (const [_, d] of Object.entries(data)) {
                    const card = new AdCard(d, this.adsContainer)
                    card.render()
                }
                this.pageContent.appendChild(this.adsContainer)
            })
        this.root.replaceChildren(
            this.mainPhotoContainer.getMainPhoto(),
            this.pageContent
        )
    }
}

export default MainPage
