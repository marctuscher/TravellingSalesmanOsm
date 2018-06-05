import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataService {

    constructor(private _http: HttpClient){



    }

    routeByNodeId(srcId, trgId, callback){
       this._http.post('/routebynodeid', {"srcNode": srcId, "trgNode": trgId}, {responseType: 'json'}).subscribe((data) =>{
           callback(data);
       })
   }

}
