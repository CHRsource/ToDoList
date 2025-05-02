import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearButtonTemplate(disabled) {
    return `<button class="clear-btn" ${disabled ? 'disabled' : ''}>X Очистить</button>`;
}

export default class ClearButtonComponent extends AbstractComponent {
    #handleClick = null;
    #disabled = null;
    
    constructor({ onClick, disabled = false }) {
        super();
        this.#handleClick = onClick;
        this.#disabled = disabled;

        this.element.addEventListener('click', this.#clickHandler);
    }

    get template() {
        return createClearButtonTemplate(this.#disabled);
    }

    toggleDisabled(value) {
        this.#disabled = value;
    }

    #clickHandler = () => {
        if (!this.#disabled) {
            this.#handleClick();
        }
    }
}
