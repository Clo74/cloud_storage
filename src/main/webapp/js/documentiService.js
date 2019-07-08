/**
 * Chiamate dei servizi rest sul server
 */


import AbstractService from "./AbstractService.js";

export default class DocumentiService extends AbstractService {
    constructor() {
        super();
        this.url = this.baseUrl + "/documenti";
        this.token = localStorage.getItem("token");
    }

    async all() {

        const data = await fetch(this.url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        })
                .then((response) =>  {
                    if (response.ok) {return response.json()} else { return "non auth"}
            })
                .catch((res) => console.log(res))
        return data;
    }

    async delete(id) {
        return await fetch(this.url + "/" + id, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        })
                .catch((res) => console.error(res))
    }


    async update(id, json) {
        await fetch(this.url + "/" + id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(json)

        })
                .then((response) =>  {
                    if (response.ok) {return response.json()} else { return "non auth"}
            })
                .catch((res) => console.log(res))
        return this.res;
    }

    async sendFile(fd) {
        await fetch(this.url, {
            method: 'post',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            },
            body: fd
        })
                .then((response) => {
                    if (response.ok) {
                        console.log("File salvato")
                    } else {
                        console.log("File non salvato")
                    }
                })
                .catch(error => console.error(error))
        return this.res;
    }
//                'Content-Type': 'multipart/form-data',
}