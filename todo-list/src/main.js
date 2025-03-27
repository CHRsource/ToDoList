import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import {render, RenderPosition} from './framework/render.js';


const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.new-task-section');
const taskBoardContainer = document.querySelector('.site-main')

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN)
render(new FormAddTaskComponent, formContainer);
render(new TaskBoardComponent, taskBoardContainer);

const taskListContainer = document.querySelector('.task-container');

for (let i = 0; i < 4; i++) {
    const taskListComponent = new TaskListComponent();
    render(taskListComponent, taskListContainer);

    const taskListElement = taskListComponent.getElement().querySelector('.task-list');
    for (let j = 0; j < 4; j++) {
        render(new TaskComponent(), taskListElement);
    }
}
