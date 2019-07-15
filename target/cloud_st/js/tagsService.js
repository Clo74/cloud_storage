import AbstractService from "./AbstractService.js";

export default class TagsService extends AbstractService {
    constructor() {
        super();
        this.url = this.baseUrl + "/tags";
        this.token = "";
        this.myJson = {};
    }

    leggiLocSt() {
         if (!(localStorage.getItem(0)== null)) {
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

    async delete(id) {
        this.leggiLocSt();
        return await fetch(this.url + "/" + id, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Authorization': "Bearer " + this.token
            }
        })
                .then((response) => {return response.ok})
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

    async add(json) {
        this.leggiLocSt();
        const data = await fetch(this.url, {
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
                .catch(error => console.error(error))
        return data;
    }

}