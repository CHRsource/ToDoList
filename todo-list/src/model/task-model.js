import {tasks} from '../mock/task.js';
import { generateID } from '../util.js';
import { Status } from '../const.js';

export default class TasksModel {
    #boardtasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardtasks;
    }

    getTasksByStatus(status) {
        return this.#boardtasks.filter(task => task.status === status);
    }

    addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: generateID()
        }
        this.#boardtasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }

    clearBasket() {
        this.#boardtasks = this.#boardtasks.filter(task => task.status != Status.BASKET);
        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removerObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }
}