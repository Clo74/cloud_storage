/**
 * 
 */
import DocumentiService from "./documentiService.js";

import AbstractService from "./AbstractService.js";
import {render, html} from "../lit-html/lit-html.js"

class PagDocCondivisi extends AbstractService {

    constructor() {
        super();
        this.bindingAll();
        this.service = new DocumentiService();

        document.getElementById("butSendFile").onclick = this.sendFile;
        this.file = document.getElementById("file");

        this.titolo = document.getElementById("titolo");
        this.contSelect = document.getElementById("contSelect");

        this.ArrCol = [];
        this.myJson = {};
        this.myArrJson = [];
        this.elTags = "";
        this.arrOpt = [];
        this.data = [];
        this.docUt = [];

        this.getDocUt();
        this.getAllData();
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
    
    createRow(doc){
        return html `
            <option value=${doc.id}>${doc.titolo}</option>
        `
    }
    //crea la select con tutti i documenti dell'utente che si possono condividere
    caricaSelect() {
        return html `<label for="selDoc">Elenco Documenti</label>
            <select class="custom-select" id="selDoc">
                <option selected>Choose...</option>
                ${this.docUt.map(doc => this.createRow(doc))}
            </select>`
    }

    //prendo solo i dati dei documenti condivisi
    getOnlyDoc(ArrJson) {
        this.myJson = {};
        ArrJson.map((json) => {
            this.myJson = {
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
            switch (col) {
                case "id":
                    this.myJson = {
                        data: col,
                        title: col,
                        type: "readonly"
                    };
                    break;
                case "documento":
                    this.myJson = {
                        data: col,
                        title: col,
                        type: "readonly"
                    };
                    break;
                case "titolo":
                    this.myJson = {
                        data: col,
                        title: col
                    };
                    break;
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
                altEditor: true, // Enable altEditor
                onDeleteRow: this.deleteRow,
                onEditRow: this.editRow,
//		    onAddRow: this.addRow,
                buttons: [
                    {
                        extend: 'selected', // Bind to Selected row
                        text: 'Delete',
                        name: 'delete'      // do not change name
                    },
                    {
                        extend: 'selected', // Bind to Selected row
                        text: 'Edit',
                        name: 'edit'        // do not change name
                    }]
            });
        }
    }

    deleteRow(datatable, rowdata, success, error) {
        this.service.delete(rowdata.id)
                .then(response => {
                    if (response.ok) {
                        success();
                        location.reload();
                    } else {
                        error();
                    }
                });
    }

    /*addRow(datatable, rowdata, success, error) {
     this.service.add(rowdata)
     .then((JsonRes) => {
     success(JSON.stringify(JsonRes))
     });
     }*/

    correggiJsonEdt(Json) {
        this.myArrJson = [];
        if (Json.tags) {
            Json.tags.map(v => {
                this.myJson = {
                    id: v
                };
                this.myArrJson.push(this.myJson);
            });
        }
        return {
            titolo: Json.titolo,
            documento: Json.documento,
            tags: this.myArrJson
        }
    }

    editRow(datatable, rowdata, success, error) {
        this.service.update(rowdata.id, this.correggiJsonEdt(rowdata))
                .then((JsonRes) => {
                    success(JSON.stringify(JsonRes))
                    location.reload();
                });
    }

    sendFile() {
        var fd = new FormData();


        fd.append("file", this.file.files[0], this.file.files[0].name);
        fd.append("titolo", this.titolo.value);

        this.service.sendFile(fd)
                .then((response) => {
                    location.reload();
                });
    }

    bindingAll() {

        this.getAllData = this.getAllData.bind(this);
        this.creaTabella = this.creaTabella.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.correggiJsonEdt = this.correggiJsonEdt.bind(this);
        this.editRow = this.editRow.bind(this);
        this.sendFile = this.sendFile.bind(this);

    }
}

$(document).ready(function () {
    new PagDocCondivisi();
});

/*document.addEventListener("submit", function(event){
 event.preventDefault();
 });*/