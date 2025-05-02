import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/task-board-component.js";
import NoTaskComponent from "../view/no-task-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
import LoadingViewComponent from "../view/loading-view-component.js";
import {render} from '../framework/render.js';
import {Status, StatusLabel, UserAction} from '../const.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;

    #tasksBoardComponent = new TaskBoardComponent();
    #resetButtonComponent = null;
    #loadingComponent = new LoadingViewComponent();

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
    }

    async init() { 
        render(this.#loadingComponent, this.#boardContainer);
        await this.#tasksModel.init();

        this.#loadingComponent.removeElement();
        this.#clearBoard();     
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

            const tasksByStatus = this.tasks
                .filter(t => t.status === status)
                .sort((a, b) => a.order - b.order);

            if (tasksByStatus.length === 0) {
                this.#renderNoTask(taskListElement);
            } else {
                tasksByStatus.forEach(task => {
                    this.#renderTask(task, taskListElement);
                });
            }

            if (status === Status.BASKET) {
                this.#resetButtonComponent = new ClearButtonComponent({
                    onClick: this.#handleClearBasket.bind(this),
                    disabled: !this.#tasksModel.hasBasketTasks()
                });
                render(this.#resetButtonComponent, taskListComponent.element);
            }
        });
    }
    
    async #handleTaskDrop(taskId, newStatus, targetIndex) {
        try {
            await this.#tasksModel.moveTask(taskId, newStatus, targetIndex);
        } catch (err) {
            console.error('Ошибка при обновлении статуса задачи:', err);
        }
    }

    #renderNoTask(container) {
        const noTaskComponent = new NoTaskComponent();
        render(noTaskComponent, container);
    }

    async createTask() {
        const taskTitle = document.querySelector('.task-input').value.trim();
        if (!taskTitle) {
            return;
        }
        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('.task-input').value = '';
        } catch (err) {
            console.error('Ошибка при создании задачи:', err);
        }
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

    #handleModelEvent(event, payload) {
        switch (event) {
            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderBoard();
                if (this.#resetButtonComponent) {
                    this.#resetButtonComponent.toggleDisabled(!this.#tasksModel.hasBasketTasks());
                }
                break;
        }
    }

    async #handleClearBasket() {
        try {
            await this.#tasksModel.clearBasketTasks();
        } catch (err) {
            console.error('Ошибка при очистке корзины:', err);
        }
    }
}