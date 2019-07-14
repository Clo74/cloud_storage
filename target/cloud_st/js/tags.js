/**
 * 
 */
import TagsService from "./tagsService.js";
import AbstractService from "./AbstractService.js";

class PagTags extends AbstractService {

    constructor() {
        super();
        this.bindingAll();
        this.service = new TagsService();

        this.ArrCol = [];
        this.data = [];
        this.myJson = {};
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
                            this.data = [];
                        } else {
                            this.data = ArrJson;
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

    creaTabella() {
        if (this.data.length > 0) {

            this.createColumn();
            this.myTable = $('#tags').DataTable({
                "sPaginationType": "full_numbers",
                data: this.data,
                columns: this.ArrCol,
                dom: 'Bfrtip', // Needs button container
                select: 'single',
                responsive: true,
                altEditor: true, // Enable altEditor
                onDeleteRow: this.deleteRow,
                onEditRow: this.editRow,
                onAddRow: this.addRow,
                buttons: [{
                        text: 'Add',
                        name: 'add'        // do not change name
                    },
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
                    } else {
                        error();
                    }
                });
    }

    //toglie id dal json restituito da data table
    
    addRow(datatable, rowdata, success, error) {
        this.myJson = {
            tag:rowdata.tag
        }
        this.service.add(this.myJson)
                .then((JsonRes) => {
                    success(JSON.stringify(JsonRes))
                });
    }

    editRow(datatable, rowdata, success, error) {
        this.service.update(rowdata.id, rowdata)
                .then((JsonRes) => {
                    success(JSON.stringify(JsonRes))
                });
    }


    bindingAll() {
        this.getAllData = this.getAllData.bind(this);
        this.creaTabella = this.creaTabella.bind(this);
        this.createColumn = this.createColumn.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.addRow = this.addRow.bind(this);
    }
}

$(document).ready(function () {
    new PagTags();
});

/*document.addEventListener("submit", function(event){
 event.preventDefault();
 });*/