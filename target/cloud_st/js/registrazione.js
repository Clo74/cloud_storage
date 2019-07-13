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
        this.mail = "";
        this.myJson = {};
        //leggo i campi a video
        this.getCampi();
        //faccio i controlli su quello digitato dall'utente
        this.controlla();
        //
    }

    getCampi() {
        this.utente = document.getElementById("username").value;
        this.nome = document.getElementById("name").value;
        this.cognome = document.getElementById("surname").value;
        this.password = document.getElementById("password").value;
        this.mail = document.getElementById("email").value;
    }

    controlla() {
        //se tutto corretto mando al server
        this.sendDati();
    }

    buildJson() {
        this.myJson = {
            "cognome": this.cognome,
            "email": this.mail,
            "nome": this.nome,
            "pwd": this.password,
            "user": this.utente
        };
    }

    sendDati() {
        //costruisco il json da inviare
        this.buildJson();
        //chiamo il servizio
        this.service.add(this.myJson).
                then((resp) => {
                    window.location = this.firstPage;
                });

    }

}

document.getElementById("btReg").onclick = function ()
{
    new Registrazione();
}

