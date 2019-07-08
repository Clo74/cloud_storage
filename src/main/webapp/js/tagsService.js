import AbstractService from "./AbstractService.js";

export default class TagsService extends AbstractService {
    constructor() {
        super();
        this.url = this.baseUrl + "/tags";
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
    
    async add(json) {
        await fetch(this.url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token")                
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
        //return this.res;
    }

}