import { generateID } from '../util.js';
import { Status, UpdateType, UserAction } from '../const.js';
import Observable from '../framework/observable.js';

export default class TasksModel extends Observable {
    #tasksApiService = null;
    #boardtasks = [];

    constructor({tasksApiService}) {
        super();
        this.#tasksApiService = tasksApiService;

        this.#tasksApiService.tasks.then((tasks) => {
            console.log(tasks);
        });
    }

    get tasks() {
        return this.#boardtasks;
    }

    async init() {
        try {
            const tasks = await this.#tasksApiService.tasks;
            this.#boardtasks = tasks.map((task, idx) => ({
                ...task,
                order: task.order ?? idx
            }));
        } catch(err) {
            this.#boardtasks = [];
        }
        this._notify(UpdateType.INIT);
    }

    getTasksByStatus(status) {
        return this.#boardtasks.filter(task => task.status === status);
    }

    async addTask(title) {
        const newTask = {
            title,
            status: Status.BACKLOG,
            id: generateID(),
            order: this.#boardtasks.filter(t => t.status === Status.BACKLOG).length
        }
        try {
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#boardtasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        } catch (err) {
            console.error('Ошибка при добавлении задачи на сервер:', err);
            throw err;
        }
    }

    deleteTask(taskId) {
        this.#boardtasks = this.#boardtasks.filter(task => task.id !== taskId);
        this._notify(UserAction.DELETE_TASK, {id: taskId});
    }

    async clearBasketTasks() {
        const basketTasks = this.#boardtasks.filter(task => task.status === 'trash');

        try {
            await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));
            this.#boardtasks = this.#boardtasks.filter(task => task.status != Status.BASKET);
            this._notify(UserAction.DELETE_TASK, {status: Status.BASKET});
        } catch (err) {
            console.error('Ошибка при удалении задач из корзины на сервере:', err);
            throw err;
        }
    }

    hasBasketTasks() {
        return this.#boardtasks.some(task => task.status === Status.BASKET);
    }

    async updateTaskStatus(taskId, newStatus) {
        const task = this.#boardtasks.find(task => task.id === taskId);
        const previousStatus = task.status;
        if (task) {
            task.status = newStatus;

            try {
                const updatedTask = await this.#tasksApiService.updateTask(task);
                Object.assign(task, updatedTask);
                this._notify(UserAction.UPDATE_TASK, task);
            } catch (err) {
                console.error('Ошибка при обновлении статуса задачи на сервер:', err);
                task.status = previousStatus;
                throw err;
            }
        }
    }

    async moveTask(taskId, newStatus, targetIndex) {
        const taskIdx = this.#boardtasks.findIndex(t => t.id === taskId);
        if (taskIdx === -1) return;

        const [moved] = this.#boardtasks.splice(taskIdx, 1);
        moved.status = newStatus;

        const group = this.#boardtasks
            .filter(t => t.status === newStatus)
            .sort((a, b) => a.order - b.order);

        group.splice(targetIndex, 0, moved);

        group.forEach((task, idx) => {
            task.order = idx;
        });

        this.#boardtasks = [
            ...this.#boardtasks.filter(t => t.status !== newStatus),
            ...group
        ];

        await Promise.all(
            group.map(task => this.#tasksApiService.updateTask(task))
        );

        this._notify(UserAction.UPDATE_TASK, moved);
    }
}
