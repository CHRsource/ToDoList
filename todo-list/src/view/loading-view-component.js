import { AbstractComponent } from "../framework/view/abstract-component.js";

function createLoadingViewTemplate() {
    return (
        `<p class="board__no-tasks">
        Loading...
        </p>`
    );
}

export default class LoadingViewComponent extends AbstractComponent {
    get template() {
        return createLoadingViewTemplate();
    }
}

