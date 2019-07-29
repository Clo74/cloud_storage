/**
 * 
 */
import DocumentiService from "./documentiService.js";
import TagsService from "./tagsService.js";
import AbstractService from "./AbstractService.js";
import FillSize from "./FillSize.js";

class PagDocumenti extends AbstractService {

    constructor() {
        super();
        this.bindingAll();
        this.service = new DocumentiService();
        this.serviceTag = new TagsService();
        document.getElementById("butSendFile").onclick = this.sendFile;
        document.getElementById("butGetFile").onclick = this.getFile;
        this.fileGet = document.getElementById("nameDoc");
        this.file = document.getElementById("file");

        this.titolo = document.getElementById("titolo");
        this.fillSize = document.getElementById("myFillSize");
                
        this.ArrCol = [];
        this.myJson = {};
        this.myArrJson = [];
        this.elTags = "";
        this.arrOpt = [];
        this.data = [];
        this.myTable;
        this.getAllData();
    }

    getAllData() {
        this.service.all().
                then((ArrJson) => {
                    if (ArrJson == "non auth") {
                        localStorage.clear();
                        window.location = this.firstPage;
                    } else {
                        if (ArrJson == false) {
                            this.data = []
                        } else {
                            this.data = ArrJson
                        }
                        this.getTags();
                    }
                });
    }

    getTags() {
        this.arrOpt = [];
        this.serviceTag.all().
                then((ArrJson) => {
                    if (ArrJson) {
                        ArrJson.map((v) => {
                            this.arrOpt["'" + v.id + "'"] = v.tag;
                        });
                    }
                    //this.creaTabella();
                    this.getSize();
                });
    }
    
    getSize(){
        this.service.size().
                then((lnSize) => {
                    document.getElementById("spApp").innerHTML = lnSize;
                    this.fillSize.tot = 1000;
                    this.fillSize.parz = lnSize;
                    this.creaTabella();
        })
        
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
                case "tags":
                    this.myJson = {
                        data: col,
                        title: col,
                        type: "select",
                        select2: {width: '100%'},
                        options: this.arrOpt,
                        multiple: true
                    };
                    break;
                default:
                    this.myJson = {
                        data: col,
                        title: col
                    };
                    break;
            }
            this.ArrCol.push(this.myJson);
        });
    }

    correggiJson(json) {
        this.elTags = "";
        json.tags.map((arr) => {
            this.elTags += " - " + arr.tag;
        });

        this.myJson = {
            id: json.id,
            titolo: json.titolo,
            tags: this.elTags,
            documento: json.documento
        }
        return this.myJson;
    }

    correggiArrJson(arrJson) {
        arrJson.map((json) => {
            this.myArrJson.push(this.correggiJson(json));
        })
        return this.myArrJson;
    }

    creaTabella() {
        if (this.data.length > 0) {
            this.data = this.correggiArrJson(this.data)
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
                //onAddRow: this.Carica,
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
            })

            $('#documenti tbody').on('click', 'tr', function () {
                document.getElementById("nameDoc").value = this.cells[3].innerHTML
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

    validateSize() {
        var FileSize = this.file.files[0].size / 1024 / 1024; // in MB
        if (FileSize > 100) {
            alert('La dimensione del file non può eccedere i 100 MB');
            return false;
        } else {
            return true;
        }
    }

    sendFile() {
        if (this.file.value !== "") {
            if (this.validateSize()) {
                var fd = new FormData();


                fd.append("file", this.file.files[0], this.file.files[0].name);
                fd.append("titolo", this.titolo.value);

                this.service.sendFile(fd)
                        .then((response) => {
                            if (response) {
                                location.reload();
                            } else
                            {
                                alert("Documento non salvato")
                            }
                        });
            }
        }
    }

    getFile() {
        if (this.fileGet.value !== "") {
            this.service.getFile(this.fileGet.value)
                    .then((response) => {
                        console.dir(response)
                        var url = window.URL.createObjectURL(response);
                        var a = document.createElement('a');
                        a.href = url;
                        a.download = this.fileGet.value;
                        document.getElementById("contFile").appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                    });
        }
    }

    bindingAll() {
        this.getAllData = this.getAllData.bind(this);
        this.getTags = this.getTags.bind(this);
        this.creaTabella = this.creaTabella.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.correggiJson = this.correggiJson.bind(this);
        this.correggiArrJson = this.correggiArrJson.bind(this);
        this.correggiJsonEdt = this.correggiJsonEdt.bind(this);
        this.editRow = this.editRow.bind(this);
        this.sendFile = this.sendFile.bind(this);
        this.getFile = this.getFile.bind(this);
        this.getSize = this.getSize.bind(this);
         
    }
}

$(document).ready(function () {
    new PagDocumenti();

});

/*document.addEventListener("submit", function(event){
 event.preventDefault();
 });*/
