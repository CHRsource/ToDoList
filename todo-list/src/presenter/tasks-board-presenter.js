import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/task-board-component.js";
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
        this.#boardTasks = [...this.#tasksModel.getTasks()];

        render(this.#tasksBoardComponent, this.#boardContainer);

        const tasksByStatus = {
            [Status.BACKLOG]: [],
            [Status.PROCESSING]: [],
            [Status.DONE]: [],
            [Status.BASKET]: []
        };

        this.#boardTasks.forEach(task => {
            tasksByStatus[task.status].push(task);
        });

        Object.entries(tasksByStatus).forEach(([status, tasks]) => {
            const taskListComponent = new TaskListComponent(status);
            render(taskListComponent, this.#tasksBoardComponent.getElement());

            const taskListElement = taskListComponent.getElement().querySelector('.task-list');

            tasks.forEach(task => {
                const taskComponent = new TaskComponent({ task });
                render(taskComponent, taskListElement);
            });
        });
    }
}