import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl:string = 'https://v6.exchangerate-api.com/v6/d976911792898547eddd9f3d/'
  baseUrlForHistorical:string = 'https://api.exchangerate.host/'
  constructor(private http:HttpClient) { }
  
  getLatestRates(currency:string) {
    return this.http.get(this.baseUrl + 'latest/' + currency)
  }
  convert(data:any) {
     return this.http.get(this.baseUrl + 'pair/' + `${data.from}/${data.to}/${data.amount ? data.amount : 0}`)
  }
  getConvertionRate(from:string,to:string) {
    return this.http.get(this.baseUrl + 'pair/' + `${from}/${to}`)
  }
  getHistoricalValues(data:any) {
    return this.http.get(this.baseUrlForHistorical + `${data.time}&base=${data.crncy}`)
  }
}
