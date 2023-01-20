import { ComponentB } from "./componentB";


export class ComponentA extends HTMLElement {

    otherComponent: ComponentB
}



customElements.define("component-a", ComponentA);