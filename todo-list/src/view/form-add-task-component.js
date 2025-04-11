import {createElement} from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

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

export default class FormAddTaskComponent extends AbstractComponent {
    constructor() {
        super();
    }
    
    get template() {
        return createFormAddTaskComponentTemplate();
    }
}