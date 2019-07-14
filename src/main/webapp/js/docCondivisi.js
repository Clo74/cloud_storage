/**
 * 
 */

import AbstractService from "./AbstractService.js";
import DocumentiService from "./documentiService.js";
import UtentiService from "./utentiService.js";
import {render, html} from "../lit-html/lit-html.js";

class PagDocCondivisi extends AbstractService {

    constructor() {
        super();
        this.bindingAll();
        this.service = new DocumentiService();

        this.ArrCol = [];
        this.myJson = {};
        this.myArrJson = [];
        this.elTags = "";
        this.arrOpt = [];
        this.data = [];
        this.docUt = [];
        this.docCond;

        this.getCampi();
        this.getDocUt();
        this.getAllData();
    }

    getCampi() {
        document.getElementById("butSendFile").onclick = this.sendFile;
        document.getElementById("butGetFile").onclick = this.getFile;
        
        
        this.file = document.getElementById("file");

        this.titolo = document.getElementById("titolo");
        this.contSelect = document.getElementById("contSelect");
        this.usrCond = document.getElementById("inUtente");
        this.fileGet = document.getElementById("docCond");
        this.utPropFile = document.getElementById("utPropFile");
        

    }

    //leggo i documenti dell'utente
    getDocUt() {
        this.service.all().
                then((ArrJson) => {
                    if (ArrJson == "non auth") {
                        localStorage.clear();
                        window.location = this.firstPage;
                    } else {
                        if (ArrJson == false) {
                            this.docUt = []
                        } else {
                            this.docUt = ArrJson;
                        }
                        render(this.caricaSelect(), this.contSelect);
                    }
                });
    }

    createRow(doc) {
        return html `
            <option value=${doc.id}>${doc.titolo} - ${doc.documento}</option>
        `
    }
    //crea la select con tutti i documenti dell'utente che si possono condividere
    caricaSelect() {
        return html `
            <select class="custom-select custom-select-lg mb-3" id="selDoc">
                <option value=0 selected>Choose...</option>
                ${this.docUt.map(doc => this.createRow(doc))}
            </select>`
    }

    //prendo solo i dati dei documenti condivisi
    getOnlyDoc(ArrJson) {
        this.myJson = {};
        ArrJson.map((json) => {
            this.myJson = {
                utente: json.doc.utente.user,
                id: json.doc.id,
                titolo: json.doc.titolo,
                documento: json.doc.documento
            }
            this.data.push(this.myJson);
        })

    }

    //leggo la tabella condivisioni per caricare la tabella
    getAllData() {
        this.service.allCond().
                then((ArrJson) => {
                    if (ArrJson == "non auth") {
                        localStorage.clear();
                        window.location = this.firstPage;
                    } else {
                        if (ArrJson == false) {
                            this.data = []
                        } else {
                            this.getOnlyDoc(ArrJson)
                        }
                        this.creaTabella();
                    }
                });
    }

    createColumn() {
        const first = this.data[0];
        this.fields = Reflect.ownKeys(first);
        this.fields.map((col) => {
            this.myJson = {
                data: col,
                title: col,
                type: "readonly"
            }

            this.ArrCol.push(this.myJson);
        });
    }

    creaTabella() {
        if (this.data.length > 0) {

            this.createColumn();
            this.myTable = $('#documenti').DataTable({
                "sPaginationType": "full_numbers",
                data: this.data,
                columns: this.ArrCol,
                dom: 'Bfrtip', // Needs button container
                select: 'single',
                responsive: true,
                altEditor: false, // Enable altEditor
                buttons: []

            });

            $('#documenti tbody').on('click', 'tr', function () {
                document.getElementById("docCond").value = this.cells[3].innerHTML
                document.getElementById("utPropFile").value = this.cells[0].innerHTML
            });
        }
    }

    sendFile() {
        this.DocCond = document.getElementById("selDoc");

        this.service.sendFileCond(this.usrCond.value, this.DocCond.value)
                .then((response) => {
                    if (response == "Non auth") {
                        alert("Documento non condiviso, controllare che il nome utente esista")
                    }
                    location.reload();
                });
    }

    getFile() {
        if (this.fileGet.value !== "" && this.utPropFile.value !== "") {
            this.service.getFileCond(this.fileGet.value, this.utPropFile.value)
                    .then((response) => {
                        console.dir(response)
                        var url = window.URL.createObjectURL(response);
                        var a = document.createElement('a');
                        a.href = url;
                        a.download = this.fileGet.value;    
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);    
                    });
        }
    }

    bindingAll() {

        this.getAllData = this.getAllData.bind(this);
        this.creaTabella = this.creaTabella.bind(this);
        this.sendFile = this.sendFile.bind(this);
        this.getFile = this.getFile.bind(this);
        this.getCampi = this.getCampi.bind(this);

    }
}

$(document).ready(function () {
    new PagDocCondivisi();
});

