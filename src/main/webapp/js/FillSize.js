import {render, html} from "../lit-html/lit-html.js"

        const myDom = (myWidth) => html`<style>
        #myProgress {
            width: 100%;
            background-color: grey;
        }

        #myBar {
            width: ${myWidth}%;
            height: 30px;
            background-color: blue;
        }

        </style>
        <div id="myProgress">
          <div id="myBar"></div>
        </div>
`
export default class FillSize extends HTMLElement {

    constructor() {
        super();
        //serve perche non venga visto dai CSS

        this.root = this.attachShadow({mode: "open"});

        this._tot = 1;
        this._parz = 1;
        this.withBar = 0;
    }

    connectedCallback() {

        this.withBar = (this._parz * 100) / this._tot;
        render(myDom(this.withBar), this.root);
    }

    get tot() {
        return this._tot;
    }

    get parz() {
        return this._parz;
    }

    set tot(val) {
        this._tot = val;
        this.setAttribute("tot", val);
        //render(this.createBar(), this.root);
    }

    set parz(val) {
        this._parz = val;
        this.setAttribute("parz", val);
        // render(this.createBar(), this.root);
    }

    static get observedAttributes() {
        return ["tot", "parz"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case "tot":
                    this._tot = newValue;
                    break;
                case "parz":
                    this._parz = newValue;
                    break;
            }
            this.withBar = (this._parz * 100) / this._tot;
            render(myDom(this.withBar), this.root);
        }
    }

}

customElements.define("fill-size", FillSize);