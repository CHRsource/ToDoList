import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearButtonTemplate() {
    return `<button class="clear-btn">X Очистить</button>`;
}

export default class ClearButtonComponent extends AbstractComponent {
    constructor() {
        super();
    }

    get template() {
        return createClearButtonTemplate();
    }
}
