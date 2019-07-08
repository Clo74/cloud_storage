/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import LoginService from "./loginService.js";

class App {
    constructor() {
        this.service = new LoginService();
        this.usr = document.getElementById("utente").value;
        this.pwd = document.getElementById("password").value;
        this.token = "";
        this.visRisp = document.getElementById("resp");
                this.bindAll();
        this.getToken();

    }

    getToken() {
        this.service.login(this.usr, this.pwd)
                .then((response) => {
                    if (response) {
                        console.log("response ---> " + response);
                        this.scriviTok(response)
                        this.visRisp.innerHTML = "Login riuscita"
                        location.reload();
                    } else {
                        this.visRisp.innerHTML = "Login non riuscita, Registrati"
                    }
                    
                });
    }

    scriviTok(response) {
        
        localStorage.setItem("token", response.token);

    }
    bindAll(){
        this.getToken = this.getToken.bind(this);        
    }
}

document.getElementById("tryLogin").onclick = function () {
    new App();
}