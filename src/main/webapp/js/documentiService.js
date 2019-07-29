/**
 * Chiamate dei servizi rest sul server
 */


import AbstractService from "./AbstractService.js";

export default class DocumentiService extends AbstractService {
    constructor() {
        super();
        this.url = this.baseUrl + "/documenti";
        this.token = "";
        this.myJson = {};
        this.res;
        this.bindingAll();
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
                        return response.json();
                    } else {
                        return "non auth"
                    }
                })
                .catch((res) => console.log(res))
        return data;
    }

    async getFile(nomeDoc) {
        this.leggiLocSt();
        const data = await fetch(this.url + "/download?name=" + nomeDoc, {
            method: 'get',
            headers: {
                'Authorization': "Bearer " + this.token
            }
        })
                .then(resp => resp.blob())
                .then(blob => {
                    return blob
                })
                .catch((res) => console.log(res))
        return data;
    }    

    async getFileCond(nomeDoc, utente) {
        this.leggiLocSt();
        const data = await fetch(this.url + "/download?name=" + nomeDoc
                + "&usr=" + utente, {
                    method: 'get',
                    headers: {
                        'Authorization': "Bearer " + this.token
                    }
                })
                .then(resp => resp.blob())
                .then(blob => {
                    return blob
                })
                .catch((res) => console.log(res))
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

    async update(id, json) {
        this.leggiLocSt();
        const data = await fetch(this.url + "/" + id, {
            method: 'put',
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
        return data;
    }

    async sendFile(fd) {
        this.leggiLocSt();
        await fetch(this.url, {
            method: 'post',
            headers: {
                'Authorization': "Bearer " + this.token
            },
            body: fd
        })
                .then((response) => {
                    if (response.ok) {
                        console.log("File salvato")
                    } else {
                        console.log("File non salvato")
                    }
                    this.res = response.ok;
                })
                .catch(error => console.error(error))
        return this.res;
    }
    //condivisi
    async allCond() {
        this.leggiLocSt();
        const data = await fetch(this.url + "/condivisi", {
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

    async sendFileCond(usr, idDoc) {
        this.leggiLocSt();
        const data = await fetch(this.url + "/condivisi?usr=" + usr + "&idDoc=" + idDoc, {
            method: 'post',
            headers: {
                'Authorization': "Bearer " + this.token
            },
        })
                .then((response) => {
                    if (response.ok) {
                        console.log("File condiviso");
                        return response.json();
                    } else {
                        console.log("File non condiviso")
                        return "Non auth"
                    }
                })
                .catch(error => console.error(error))
        return data;
    }

    async size() {
        this.leggiLocSt();
        const data = await fetch(this.url + "/space", {
            method: 'get',
            headers: {
                'Authorization': "Bearer " + this.token
            }
        })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return "non auth"
                    }
                })
                .catch((res) => console.log(res))
        return data;
    }
    
    bindingAll() {
        this.sendFile = this.sendFile.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.all = this.all.bind(this);
        this.size = this.size.bind(this);
    }
}