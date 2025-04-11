import { AbstractComponent } from "../framework/view/abstract-component.js";

function createNoTaskTemplate() {
    return (
        `<div class="no-tasks">Перетащите карточку</div>`
    );
}

export default class NoTaskComponent extends AbstractComponent {
    constructor() {
        super();
    }

    get template() {
        return createNoTaskTemplate();
    }
}
