
import AbstractService from "./AbstractService.js";

export default class LoginService extends AbstractService {
    constructor() {
        super();
        this.url = this.baseUrl + "/auth";
    }

    /*async login(usr, pwd) {
     const data = await fetch(this.url, {
     method: 'post',
     headers: {
     'Accept': 'application/json',
     'usr': usr,
     'pwd': pwd
     }
     })
     .then(function(response) {
     if (response.ok)  { return response.json()} else { throw new Error('Connessione non riuscita');}
     })
     .then(function(data) {
     this.res = data
     })
     .catch(function(error) {
     console.log('There has been a problem with your fetch operation: ' + error.message)
     })
     return this.res;
     }*/

    async login(usr, pwd) {
        const data = await fetch(this.url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'usr': usr,
                'pwd': pwd
            }
        })
                .then(response => response.json())
                .then(data => {
                    this.res = data
                })
                .catch(error => console.error(error))
        return this.res;
    }
}