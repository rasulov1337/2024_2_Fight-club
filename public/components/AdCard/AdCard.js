class AdCard {
    constructor(data, parent) {
        this.data = data
        this.parent = parent;

        if (parent === undefined || parent === null) {
            console.log("Wrong parent!")
        }
    }

    render() {
        const template = Handlebars.templates['AdCard.hbs']
        console.log(this.data)
        this.parent.innerHTML += template(this.data)
    }
}

export default AdCard;