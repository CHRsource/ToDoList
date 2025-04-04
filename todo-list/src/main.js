import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import TasksModel from './model/task-model.js';


const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.new-task-section');
const taskBoardContainer = document.querySelector('.site-main')

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent(), formContainer);

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: taskBoardContainer,
    tasksModel
});


tasksBoardPresenter.init();
