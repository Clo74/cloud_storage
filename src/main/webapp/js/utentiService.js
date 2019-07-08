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
    }

    async all() {
        const data = await fetch(this.url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': "Bearer " + this.token
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
                'Authorization': "Bearer " + this.token
            }
        })
                .catch((res) => console.error(res))
    }

    async add(json) {
        await fetch(this.url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.token
            },
            body: JSON.stringify(json)

        })
                .then((response) =>  {
                    if (response.ok) {return response.json()} else { return "non auth"}
            })
                .catch((res) => console.log(res))
        //return this.res;
    }

    async update(id, json) {
        await fetch(this.url + "/" + id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.token
            },
            body: JSON.stringify(json)

        })
                .then(response => response.json())
                .then(data => {
                    this.res = data
                })
                .catch(error => console.error(error))
        return this.res;
    }

}