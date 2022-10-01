import Flowrigami = require('../assets/Flowrigami.umd');

declare var XTagElement: any;

export class ArkeosFlowrigami extends XTagElement  {
    private flowrigami: any;
    private host: HTMLElement;
    private anchor: HTMLAnchorElement;

    private promise: Promise<void> = new Promise<void>((resolve) => resolve());

    private _artifacto = "";
    set 'artifacto::attr'(val: any) {
        this._artifacto = val;
    }

    get 'artifacto::attr'(): any {
        return this._artifacto
    }

    private _view_mode: boolean = null;
    set 'view-mode::attr'(val: boolean) {
        this._view_mode = val;

        this.promise.then(() => {
            if (this.flowrigami) {
                this.flowrigami.unmount();
            }
    
            this.flowrigami = new Flowrigami.default(this.host.firstElementChild, { viewMode: this._view_mode });
        });
    }

    get 'view-mode::attr'(): boolean {
        return this._view_mode
    }

    clear() {
        this.flowrigami.diagramApi.clear();
    } 

    async importFromUrl(url: string): Promise<void> {
        let response = await fetch(url);
        this.flowrigami.diagramApi.import(await response.text());
    }

    'click::event:delegate(#arkeos-flowrigami-export)'(e: PointerEvent) {
        const _this = (e as unknown as any)["path"][1];
        const json = _this.flowrigami.diagramApi.export();
        const blob = new Blob([json], { type: 'application/json' });
        const dataUrl = URL.createObjectURL(blob);

        _this.anchor.download = 'diagram.json';
        _this.anchor.href = dataUrl;

        _this.promise.then(() => URL.revokeObjectURL(_this.anchor.href));
    }

    'click::event:delegate(#indicator-form)'(e: PointerEvent) {
        const _this = (e as unknown as any)["path"].find((item: HTMLElement) => item.localName == "arkeos-florigami");
        e.preventDefault();

        const indicatorId = _this.host.getElementById('indicatorId') as HTMLInputElement;
        const indicatorValue = _this.host.getElementById('indicatorValue') as HTMLInputElement;
        const indicatorColor = _this.host.getElementById('indicatorColor') as HTMLInputElement;
    
        const id = indicatorId.value;
        const parsedValue = Number(indicatorValue.value);
        const value = parsedValue === parsedValue ? parsedValue : indicatorValue.value;
        const color = indicatorColor.value || undefined;

        _this.flowrigami.indicatorApi.setIndicatorValue(id, value, color);  
    }

    exportData() {
        this.anchor.click();
    }

    constructor() {
        super();
    }

    '::template(ready)'() {
        
        return `<div>i'm here</div><a id="arkeos-flowrigami-export" style="width: 0px; height: 0px;"></a>`;
    }

    connectedCallback() {
        this.host = this as unknown as HTMLElement;
        this.anchor = this.host.querySelector("#arkeos-flowrigami-export");

        this.host.setAttribute("style", "width: 100%; height:100%; overflow: none;");

        if(this._view_mode === null) {
            this["view-mode"] = true; 
        }
    }
}


