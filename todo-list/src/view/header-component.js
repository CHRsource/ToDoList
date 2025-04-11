import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createHeaderComponentTemplate() {
    return (
        `<header class="site-header">
            <h1 class="site-header_title">Список задач</h1>
        </header>`
    );
}

export default class HeaderComponent extends AbstractComponent {
    constructor() {
        super();
    }
    
    get template() {
        return createHeaderComponentTemplate();
    }
}
