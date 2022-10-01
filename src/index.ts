import { ArkeosFlowrigami } from "./components/arkeos-flowrigami.xtag";

export { ArkeosFlowrigami } from "./components/arkeos-flowrigami.xtag";

declare var xtag: any;

function registerComponent(webComponent: string, newComponent: any) {
    let component: any = customElements.get(webComponent);
    if(component) {
        if(component.version < newComponent.version) {
            xtag.create(webComponent, newComponent);
        }
    } else {
        xtag.create(webComponent, newComponent);
    }   
}

registerComponent("arkeos-flowrigami", ArkeosFlowrigami);

