import {render,html} from "../lit-html/lit-html.js"
import TagsService from "./tagsService.js";

export default class Hello extends HTMLElement {

    constructor() {
        super();
        //serve perche non venga visto dai CSS
        this.root = this.attachShadow({mode: "open"});
        this.tagService = new TagsService;
        
    }

    connectedCallback() {   
        this.tagService.all(0,5)
                .then(json => render(this.createView(json),this.root));
    }
    
    createView(json) {
        console.log(json);
               return html`
        <style>
            h1 {
            color: var(--myColor,red);  
            }
            </style>
            <h1>Hello from webcomponents</h1>
            ${json.map(tag => this.creaRiga(tag))}
            `;
    }
    creaRiga(tag){
        return html`
                <p>${tag.tag}</p>
            `;
    }
}

customElements.define("my-hello", Hello);