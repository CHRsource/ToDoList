import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/task-board-component.js";
import NoTaskComponent from "../view/no-task-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
import {render} from '../framework/render.js';
import {Status, StatusLabel} from '../const.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;

    #tasksBoardComponent = new TaskBoardComponent();

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {      
        this.#renderBoard();
    }

    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);

        this.#renderTasksList();
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({ task });
        render(taskComponent, container);
    }

    #renderTasksList() {
        Object.values(Status).forEach((status) => {
            const taskListComponent = new TaskListComponent({status: status, label: StatusLabel[status],
                onTaskDrop: this.#handleTaskDrop.bind(this)});
            render(taskListComponent, this.#tasksBoardComponent.element);

            const taskListElement = taskListComponent.element.querySelector('.task-list');

            const tasksByStatus = this.tasks.filter(task => task.status === status);

            if (tasksByStatus.length === 0) {
                this.#renderNoTask(taskListElement);
            } else {
                tasksByStatus.forEach(task => {
                    this.#renderTask(task, taskListElement);
                });
            }

            if (status === Status.BASKET) {
                const hasTasks = tasksByStatus.length > 0;
                const clearButtonComponent = new ClearButtonComponent({
                    onClick: this.#handleClearBasket.bind(this),
                    disabled: !hasTasks
                });
                render(clearButtonComponent, taskListComponent.element);
            }
        });
    }
    
    #handleTaskDrop(taskId, newStatus, targetIndex) {
        this.#tasksModel.moveTask(taskId, newStatus, targetIndex);
    }

    #renderNoTask(container) {
        const noTaskComponent = new NoTaskComponent();
        render(noTaskComponent, container);
    }

    createTask() {
        const taskTitle = document.querySelector('.task-input').value.trim();
        if (!taskTitle) {
            return;
        }

        this.#tasksModel.addTask(taskTitle);

        document.querySelector('.task-input').value = '';
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }

    #handleClearBasket() {
        this.#tasksModel.clearBasket();
    }
}