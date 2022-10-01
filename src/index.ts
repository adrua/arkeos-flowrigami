import { ArkeosFlowrigami } from "./arkeos-flowrigami/arkeos-flowrigami.xtag";
import('./assets/Flowrigami.umd');
import('./assets/FlowrigamiOptions.umd');

declare var xtag: any;

const webComponent = "arkeos-flowrigami";
if(customElements.get(webComponent)) {
    xtag.create(webComponent, ArkeosFlowrigami);
}
