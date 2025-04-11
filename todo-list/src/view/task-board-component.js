import {createElement} from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskBoardComponentTemplate() {
    return (
        `<section class="task-container"></section>`
    );
}

export default class TaskBoardComponent extends AbstractComponent {
    constructor() {
        super();
    }
    
    get template() {
        return createTaskBoardComponentTemplate();
    }
}