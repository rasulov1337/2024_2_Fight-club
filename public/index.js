const root = document.getElementById('root');

const menuContainer = document.createElement('header');
const iconContainer = document.createElement('div');
const hrefs = document.createElement('div');
iconContainer.classList.add('icon');
hrefs.classList.add('header-hrefs');
menuContainer.appendChild(iconContainer);
menuContainer.appendChild(hrefs);
root.appendChild(menuContainer);


const config = {
    menu: {
        Main : {
            'href': '/dashboard',
            'text': 'Главная',
        },
        Map : {
            'href': '/map',
            'text': 'Карта',
        },
        Articles : {
            'href': '/articles',
            'text': 'Статьи',
        }
    }
}

function renderIcon() {
    const imgElement = document.createElement('img');
    imgElement.src="./images/icon.jpg"
    imgElement.width = 100;
    imgElement.height = 100;
    iconContainer.appendChild(imgElement);
}

function renderMenu() {
    renderIcon();
    Object.entries(config.menu).forEach(([_, {href, text}])=>{
        const menuElement = document.createElement('a');
        menuElement.href = href;
        menuElement.text = text;
        menuElement.classList.add('hrefs')

        hrefs.appendChild(menuElement);
    });
}

renderMenu();

