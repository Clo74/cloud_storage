/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import AbstractService from "./AbstractService.js";

export default class UtentiService extends AbstractService {
    constructor() {
        super();
        this.url = this.baseUrl + "/utenti";
        this.token = "";
        this.myJson = {};
    }

    leggiLocSt() {
        if (!(localStorage.getItem(0) == null)) {
            this.myJson = JSON.parse(localStorage.getItem(0));
            this.token = this.myJson.token;
        }
    }

    async all() {
        this.leggiLocSt();
        const data = await fetch(this.url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': "Bearer " + this.token
            }
        })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        return "non auth"
                    }
                })
                .catch((res) => console.log(res))
        return data;
    }

    async readUtId(id) {
        this.leggiLocSt();
        const data = await fetch(this.url + "/" + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': "Bearer " + this.token
            }
        })
                .then((response) => response.json())
                .catch((res) => console.error(res))
        return data;
    }

    async readUt(usr, pwd) {
        this.leggiLocSt();
        const data = await fetch(this.url + "/log", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'usr': usr,
                'pwd': pwd,
                'Authorization': "Bearer " + this.token
            }
        })
                .then((response) => response.json())
                .catch((res) => console.error(res))
        return data;
    }

    async delete(id) {
        this.leggiLocSt();
        return await fetch(this.url + "/" + id, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Authorization': "Bearer " + this.token
            }
        })
                .catch((res) => console.error(res))
    }

    async add(json) {
        this.leggiLocSt();
        await fetch(this.url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.token
            },
            body: JSON.stringify(json)

        })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        return "non auth"
                    }
                })
                .catch((res) => console.log(res))
        //return this.res;
    }

    async update(id, json) {
        this.leggiLocSt();
        await fetch(this.url + "/" + id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.token
            },
            body: JSON.stringify(json)

        })
                .then((response) => {
                    this.res = response.ok
                })
                .catch((res) => console.log(res))
        return this.res;
    }

}