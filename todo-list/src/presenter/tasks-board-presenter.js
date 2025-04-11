import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/task-board-component.js";
import NoTaskComponent from "../view/no-task-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
import {render} from '../framework/render.js';
import {Status} from '../const.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;

    #tasksBoardComponent = new TaskBoardComponent();

    #boardTasks = [];

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        
        this.#renderBoard();
    }

    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);

        Object.values(Status).forEach((status) => {
            this.#renderTasksList(status, this.#boardTasks);
        });
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({ task });
        render(taskComponent, container);
    }

    #renderTasksList(status, tasks) {
        const taskListComponent = new TaskListComponent(status);
        render(taskListComponent, this.#tasksBoardComponent.element);

        const taskListElement = taskListComponent.element.querySelector('.task-list');

        const tasksByStatus = tasks.filter(task => task.status === status);

        if (tasksByStatus.length === 0) {
            this.#renderNoTask(taskListElement);
        } else {
            tasksByStatus.forEach(task => {
                this.#renderTask(task, taskListElement);
            });
        }

        if (status === Status.BASKET) {
            const clearButtonComponent = new ClearButtonComponent();
            render(clearButtonComponent, taskListComponent.element);
        }
    }
    

    #renderNoTask(container) {
        const noTaskComponent = new NoTaskComponent();
        render(noTaskComponent, container);
    }
}