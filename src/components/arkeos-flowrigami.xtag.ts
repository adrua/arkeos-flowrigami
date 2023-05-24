import Flowrigami = require("../../../dist/flowrigami/index");

declare var XTagElement: any;
declare var xtag: any;

export class ArkeosFlowrigami extends XTagElement  {
    private flowrigami: any;
    private host: HTMLElement;
    private anchor: HTMLAnchorElement;

    private promise: Promise<void> = new Promise<void>((resolve) => resolve());

    set 'source::attr'(val: string) {
        this.promise?.then(() => {
            if (!this.flowrigami && val) {
                this.flowrigami = new Flowrigami.Flowrigami(this.host.firstElementChild, { viewMode: this._view_mode });
            }
    
            val && this.flowrigami?.diagramApi?.import(val);
        });
    }

    get 'source::attr'(): string {
        return this.flowrigami?.diagramApi?.export();
    }

    private _view_mode: boolean = null;
    set 'viewMode::attr'(val: boolean) {
        this._view_mode = val;

        this.promise?.then(() => {
            if (this.flowrigami) {
                this.flowrigami.unmount();
            }
    
            this.flowrigami = new Flowrigami.Flowrigami(this.host.firstElementChild, { viewMode: this._view_mode });
        });
    }

    get 'viewMode::attr'(): boolean {
        return this._view_mode
    }

    clear() {
        this.flowrigami.diagramApi.clear();
    } 

    async importFromUrl(url: string): Promise<void> {
        let response = await fetch(url);
        this.flowrigami.diagramApi.import(await response.text());
    }

    exportData() {
        this.anchor.click();
    }

    constructor() {
        super();

        this.host = this as unknown as HTMLElement;
        this.host.style.width = "100%"; 
        this.host.style.height = "100%"; 
        this.host.style.overflow = "none";

        let _this = this;

        this.render().then(() => {
            this.anchor = this.host.querySelector("#arkeos-flowrigami-export");    
    
            if(this._view_mode === null) {
                this["view-mode"] = true; 
            }    
        }).then(() => {

            this.flowrigami.main.workspace.store.subscribe('SET_NODE', (e: string) => {
                let store = _this.flowrigami.main.workspace.store;
                switch(true) {
                    case !!store.selectedNode:
                        xtag.fireEvent(_this, 'selectedNode',{ detail: store.selectedNode });
                        break;
                    case !!store.selectedConnector:
                        xtag.fireEvent(_this, 'selectedConnector', { detail: store.selectedNode });
                        break;
                }
            });
        });
    }

    '::template'() {        
        return `<div id="arkeos-flowrigami-root" style="width: 100%; height:100%; overflow: none;">i'm here</div><a id="arkeos-flowrigami-export" style="width: 0px; height: 0px;"></a>`;
    }
}


