import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import TasksModel from './model/task-model.js';
import TasksApiService from './tasks-api-service.js';

const END_POINT = 'https://680c87bc2ea307e081d43315.mockapi.io';
const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.new-task-section');
const taskBoardContainer = document.querySelector('.site-main')

const formAddTaskComponent = new FormAddTaskComponent({
    onClick: handleNewTaskButtonClick
});

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(formAddTaskComponent, formContainer);

const tasksModel = new TasksModel({
    tasksApiService: new TasksApiService(END_POINT)
});


const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: taskBoardContainer,
    tasksModel: tasksModel
});


tasksBoardPresenter.init();



function handleNewTaskButtonClick() {
    tasksBoardPresenter.createTask();
}