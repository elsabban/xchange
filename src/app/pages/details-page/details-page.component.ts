import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import currencies from 'src/app/utilities/currencies';
import { HttpService } from 'src/app/utilities/services/http.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  constructor(private routes:ActivatedRoute,private http:HttpService) {}
  title!:string
  allCurrencies:any = currencies.allCurrencies;
  fromCurrency!:string;
  toCurrency!:string;
  lastDay!:number
  lastMonth!:number
  lastYear!:number
  ngOnInit(): void {
    
    this.routes.queryParams.subscribe(
      (param) => {
          this.fromCurrency = param['from'];
          this.toCurrency = param['to'];
          this.getLastDayValue()
          this.getLastMonthValue()
          this.getLastYearValue()
          this.getLatestRates()
      }
    )
    
  }
  getLastDate(last:string) {
    return {
      day :new Date().getDate() - (last == 'day' ? 1 : 0),
      year :new Date().getFullYear() - (last == 'year' ? 1 : 0),
      month :new Date().getMonth()
    }
    
  }
  getLastDayValue() {
    let date = this.getLastDate('day')
    this.http.getHistoricalValues({crncy:this.fromCurrency,time:`${date.year}-${date.month}-${date.day}`}).subscribe(
      (res:any) => {
        this.lastDay = res.rates[this.toCurrency]
      }
    )
  }
 
  getLastMonthValue() {
    let date = this.getLastDate('month')
    this.http.getHistoricalValues({crncy:this.fromCurrency,time:`${date.year}-${date.month}-${date.day}`}).subscribe(
      (res:any) => {
        this.lastMonth = res.rates[this.toCurrency]
      }
    )
  }
  getLastYearValue() {
    let date = this.getLastDate('year')
    this.http.getHistoricalValues({crncy:this.fromCurrency,time:`${date.year}-${date.month}-${date.day}`}).subscribe(
      (res:any) => {
        this.lastYear = res.rates[this.toCurrency]
      }
    )
  }
 
  crncyList:string[] = ["CAD","CHF","CNY","EGP","EUR","GBP"] 
  resultCrncyArr:any[] = [] 
  getLatestRates() {
    this.http.getLatestRates(this.fromCurrency).subscribe(
          (res:any) => {
            this.crncyList.forEach(
              (item:any) => {
                this.resultCrncyArr.push({currency:item,value:res.conversion_rates[item]}) 
              }
            )
            
            
          }
    )
  }
}
