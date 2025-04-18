import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
    return (
        `<form class="new-task_form">
            <h2>Новая задача</h2>
            <section class="task-input-container">
                <input type="text" class="task-input" placeholder="Название задачи...">
                    <button type="submit" class="add-btn">+ Добавить</button>
            </section>
        </form>`
    );
}

export default class FormAddTaskComponent extends AbstractComponent {
    #handleClick = null;

    constructor({onClick}) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('submit', this.#clickHandler);
    }
    
    get template() {
        return createFormAddTaskComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    }
}