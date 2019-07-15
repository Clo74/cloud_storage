import UtenteService from "./utentiService.js";
import AbstractService from "./AbstractService.js";
class App extends AbstractService {

    constructor() {
        super();
        this.bindingAll();
        this.service = new UtenteService();
        this.idUt;
        this.myJson = {};
        this.btnConf = document.getElementById("btReg");
        this.btnCanc = document.getElementById("btDel");
        this.utMod = {};
        this.getEvent();
        this.getUtente();
    }

    getUtente() {
        //leggo l'anagrafica dell'utente corrente
        this.myJson = JSON.parse(localStorage.getItem(0));
        this.idUt = this.myJson.idUt;
        this.service.readUtId(this.idUt)
                .then((JsonRes) => {
                    document.getElementById("name").value = JsonRes.nome;
                    document.getElementById("surname").value = JsonRes.cognome;
                    document.getElementById("username").value = JsonRes.utente;
                    document.getElementById("email").value = JsonRes.email;
                    document.getElementById("password").value = JsonRes.pwd;
                    document.getElementById("password_confirm").value = JsonRes.pwd;
                });
    }

    getEvent() {
        this.btnConf.onclick = this.saveUt;
        this.btnCanc.onclick = this.delUt;
    }

    getCampi() {
        this.utMod = {
            nome: document.getElementById("name").value,
            cognome: document.getElementById("surname").value,
            utente: document.getElementById("username").value,
            email: document.getElementById("email").value,
            pwd: document.getElementById("password").value,
        }
    }

    saveUt() {
        this.getCampi();
        this.service.update(this.idUt, this.utMod)
                .then((response) => {
                        if (response) {
                            alert("Utente salvato con successo");
                        } else {
                            alert("Salvataggio utente non riuscito");
                        }                    
                });
    }

    delUt() {
        if (confirm('Sei sicuro di voler cancellare il tuo utente? Verranno eliminati anche i tuoi documenti')) {
            this.service.delete(this.idUt)
                    .then(response => {
                        if (response.ok) {
                            alert("Utente eliminato con successo");
                        } else {
                            alert("Eliminazione utente non riuscita");
                        }
                    });
        }
    }

    bindingAll() {
        this.getEvent = this.getEvent.bind(this);
        this.saveUt = this.saveUt.bind(this);
        this.delUt = this.delUt.bind(this);
    }
}

new App();