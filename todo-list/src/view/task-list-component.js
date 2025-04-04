import {createElement} from '../framework/render.js';
import {Status, StatusLabel} from '../const.js';

function createTaskListComponentTemplate(status) {
    return (
        `<section class="task-section ${status}">
            <h3>${StatusLabel[status]}</h3>
            <ul class="task-list"></ul>
            ${status == Status.BASKET ?
                '<button class="clear-btn">X Очистить</button>' : ''}
        </section>`
    );
}

export default class TaskListComponent {
    constructor(status) {
        this.status = status;
    }

    getTemplate() {
        return createTaskListComponentTemplate(this.status);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }

        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}