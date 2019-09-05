import {render, html} from "../lit-html/lit-html.js"

        const myDom = (prop) => html`<style>      
        .quadrante  {
            border: solid 1px ${prop.myColor};
            border-radius: 50%;
            position: relative;
            top: 10px;
            left:50px;
            width: ${prop.myWidth}px;
            height: ${prop.myWidth}px;
        }
        .lancetta {
            position: absolute;
            top: 0%; 
            left: 50%;
            margin: -1px;
            border: solid 1px black;
            height: ${(prop.myWidth / 2) -2}px;
            width: 2px;
            border-top-left-radius: 50%;
            border-top-right-radius: 50%;
            transform-origin: 1px ${prop.myWidth / 2}px;   

            animation-name: ruota;
            animation-duration: 6s;
            animation-iteration-count: infinite;
            animation-direction: normal;
            animation-timing-function: linear;
            animation-play-state: paused;

        }
        .quadrante:hover .lancetta {

            animation-play-state: running;
        }

        @keyframes ruota{

            100% {

                transform: rotate(360deg);
            }
        }
        </style>
       <div class="quadrante">
            <div class="lancetta"></div>
        </div>

`
export default class Orologio extends HTMLElement {

    constructor() {
        super();
        //serve perche non venga visto dai CSS

        this.root = this.attachShadow({mode: "open"});
        this.prop = {};
    }
    
    connectedCallback() {
        this.prop = {
            myWidth: 650,
            myColor: "orange"
        }
        render(myDom(this.prop), this.root);
    }
}

customElements.define("my-time", Orologio);