/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//<c:import url="./login.jsp"/> 
//leggo se esiste un token su local store
//se non esiste lancio la login e disabilito il menu
import LoginService from "./loginService.js";

class App {

    constructor() {
        this.service = new LoginService();
        this.token = "";
        this.myJson = {};
        this.leggiToken();
    }

    leggiToken() {
        this.myJson = JSON.parse(localStorage.getItem(0));
        if (this.myJson == null) {
            document.getElementById("divLogin").style = "display: flex"
        } 

    }

}


//document.querySelector("").ready(function () {
new App();
//});
document.getElementById("btDisc").onclick = function () {
    localStorage.clear();
    //localStorage.removeItem("token");
    location.reload();
};