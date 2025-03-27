import {createElement} from '../framework/render.js';

function createFormAddTaskComponentTemplate() {
    return (
        `<form class="new-task_form">
            <h2>Новая задача</h2>
            <section class="task-input-container">
                <input type="text" class="task-input" placeholder="Название задачи...">
                    <button type="button" class="add-btn">+ Добавить</button>
            </section>
        </form>`
    );
}

export default class FormAddTaskComponent {
    getTemplate() {
        return createFormAddTaskComponentTemplate();
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