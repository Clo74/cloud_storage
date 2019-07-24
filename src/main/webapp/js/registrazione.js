/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import UtentiService from "./utentiService.js";
import AbstractService from "./AbstractService.js";

class Registrazione extends AbstractService {

    constructor() {
        super();
        this.service = new UtentiService();
        this.utente = "";
        this.nome = "";
        this.cognome = "";
        this.password = "";
        this.password2 = "";
        this.mail = "";
        this.myJson = {};
        //leggo i campi a video
        this.getCampi();
        //faccio i controlli su quello digitato dall'utente
        this.sendDati();
        //
    }

    getCampi() {
        this.utente = document.getElementById("username").value;
        this.nome = document.getElementById("name").value;
        this.cognome = document.getElementById("surname").value;
        this.password = document.getElementById("password").value;
        this.password2 = document.getElementById("password_confirm").value;
        this.mail = document.getElementById("email").value;
    }

    controlla() {
        //se tutto corretto mando al server
        if (this.nome == "" || this.cognome == "" ||
                this.utente == "" || this.mail == "" ||
                this.passord == "" || this.password2 == "") {
            alert("Inserire tutti i campi");
            return false;
        }
        if (this.password !== this.password2) {
            alert("Le password non coincidono")
            return false;
        }
        return true;
    }

    buildJson() {
        this.myJson = {
            "cognome": this.cognome,
            "email": this.mail,
            "nome": this.nome,
            "pwd": this.password,
            "utente": this.utente
        };
    }

    sendDati() {
        //costruisco il json da inviare
        if (this.controlla()) {
            this.buildJson();
            //chiamo il servizio
            this.service.add(this.myJson).
                    then((resp) => {
                        if (resp) {
                            window.location = this.firstPage;
                        } else
                        {
                            alert("Registrazione non riuscita");
                        }
                    });
        }
    }

}

document.getElementById("btReg").onclick = function ()
{
    new Registrazione();
}

