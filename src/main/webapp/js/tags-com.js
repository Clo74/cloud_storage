import Hello from "./Hello.js";

import FillSize from "./FillSize.js";

import Orologio from "../orologio/Orologio.js";

class App {

    constructor() {
        this.fillSize = document.getElementById("myFillSize");
        this.bindingAll();
        this.inTot = document.getElementById("inTot");
        this.inParz = document.getElementById("inParz");
        document.getElementById("btCSize").onclick = this.changeSize;
    }

    changeSize() {
        this.fillSize.tot = this.inTot.value;
        this.fillSize.parz = this.inParz.value;
    }

    bindingAll() {
        this.changeSize = this.changeSize.bind(this);
    }
}

new App();