import { ComponentC } from "./componentC";

export class ComponentB extends HTMLElement {
    componentC: ComponentC
}

customElements.define('component-b', ComponentB);