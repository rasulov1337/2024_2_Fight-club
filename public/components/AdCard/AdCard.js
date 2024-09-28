export class AdCard {
    constructor(parent) {
        this.parent = parent;

        if (parent === undefined || parent === null) {
            console.log("Wrong parent!")
        }
    }

    render() {
        const template = Handlebars.templates['AdCard.hbs']
        this.parent.innerHTML += template({})
    }
}

export default AdCard;